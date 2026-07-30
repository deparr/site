import { Language, Parser, Query } from "npm:web-tree-sitter@0.26.11";
import { HighlightDef, treesitterDefinitions, langOverrides, TSCaptureGroup, OverrideSet } from "./syntax.ts";
import { installed_langs } from "../../download_ts_parsers.ts";
import { merge } from "lume/core/utils/object.ts";
import type Site from "lume/core/site.ts";

interface InstalledParser {
    language: Language,
    highlight: Query
}
async function loadInstalledParsers(): Promise<Record<string, InstalledParser>> {
    await Parser.init();

    const parsers: Record<string, InstalledParser> = {};
    for (const lang of installed_langs) {
        const parser_path = `plugins/ts_highlight/parsers/tree-sitter-${lang}.wasm`;
        const query_path = `plugins/ts_highlight/queries/highlights-${lang}.scm`;
        const [wasm, scm] = await Promise.all([Deno.readFile(parser_path), Deno.readTextFile(query_path)]);

        const language = await Language.load(wasm);
        const highlight = new Query(language, scm);

        parsers[lang] = { language, highlight };
    }
    return parsers;
}
const parsers = await loadInstalledParsers();

let usedHighlights = new Set<string>();

type Range = Array<string | number>;

function highlightCode(raw: string, lang: string | undefined): { rendered: string[], styles: Set<string> } {
    const rawLines = raw.split(/\r?\n/g);
    if (!lang || !parsers[lang]) {
        if (lang) console.log("highlight: skipping missing parser:", lang);
        return { rendered: rawLines, styles: new Set() };
    }

    const parser = new Parser();
    const language = parsers[lang]?.language;
    parser.setLanguage(language);
    const highlight_queries = parsers[lang].highlight;
    const tree = parser.parse(raw);
    if (!tree || !tree.rootNode) throw new Error(`unable to parse a ${lang} block`);

    // TODO for now just copy jolt parsing
    const rendered: string[] = [];
    const styles = new Set<string>();
    const overrides: OverrideSet = langOverrides[lang] ?? {};
    let linenr = 0;
    let cursor = 0;
    const hlSpanFmt = (group: string, content: string) => (`<span class="${group}">${content}</span>`);
    let line: string[] = [];
    const finishLine = (diff: number) => {
        linenr += diff;
        rendered.push(line.join(""))
        line = []
        cursor = 0
        for (let i = diff - 1; i > 0; i--) rendered.push("");
    };
    const rangeEqual = (a: Range, b: Range) => (a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3]);
    const rangeWithin = (a: Range, b: Range) => (a[0] == b[0] && a[1] >= b[1] && a[3] <= b[3]);
    let prevRange: Range = [-1, -1, -1, -1];
    for (const c of highlight_queries.captures(tree.rootNode)) {
        let name = c.name;
        if (name == "constructor")
            name = "@" + name;
        name =  overrides[name as TSCaptureGroup] ? `${name}.${lang}`: name;
        const node = c.node;
        const s = node.startPosition;
        const e = node.endPosition;
        const curRange: Range = [s.row, s.column, e.row, e.column, name];

        if (name === "spell" || name == "nospell" || name === "none" || name.startsWith("_"))
            continue;

        styles.add(name);

        if (s.row > linenr) {
            finishLine(s.row - linenr);
            prevRange = [-1, -1, -1, -1];
        }

        if (s.column > cursor) {
            const normal = rawLines[linenr].substring(cursor, s.column)
            line.push(htmlEscape(normal));
        }

        const _class = captureToClass(name);
        if (s.row !== e.row) {
            if (!rangeEqual(curRange, prevRange)) {
                let lineStr = rawLines[linenr]
                lineStr = htmlEscape(lineStr.substring(s.column));
                line.push(hlSpanFmt(_class, lineStr));
                finishLine(1);

                while (linenr < e.row) {
                    lineStr = htmlEscape(rawLines[linenr]);
                    line.push(hlSpanFmt(_class, lineStr));
                    finishLine(1);
                }

                if (e.column > 0) {
                    lineStr = htmlEscape(rawLines[linenr].substring(0, e.column));
                    line.push(hlSpanFmt(_class, lineStr));
                }

                cursor = e.column;
                prevRange = curRange;
            }
            continue;
        }

        let renderedNode = rawLines[linenr].substring(s.column, e.column);
        renderedNode = hlSpanFmt(_class, htmlEscape(renderedNode));

        if (rangeEqual(curRange, prevRange)) {
            line[line.length - 1] = renderedNode;
            styles.delete(typeof prevRange[4] == "string" ? prevRange[4] : "");
        } else if (rangeWithin(curRange, prevRange)) {
            // todo nested captures will be harder than
            // I though, just remove their hls for now
            styles.delete(typeof curRange[4] == "string" ? curRange[4] : "");
        } else {
            line.push(renderedNode);
            prevRange = curRange;
            cursor = e.column;
        }
    }

    finishLine(0);

    return { rendered, styles };
}

function captureToClass(capture: string): string {
    return `hl-${capture.replace("@", "").replaceAll(/\./g, "-")}`;
}

function htmlEscape(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export function wrapAndHighlightCode(raw: string, lang: string | undefined): string {
    const { rendered: rendered_lines, styles } = highlightCode(raw, lang);
    usedHighlights = usedHighlights.union(styles);
    const rendered = rendered_lines.join("\n").trim();
    return rendered;
}

function getHlOverride(name: string, theme: "light"|"dark"): HighlightDef {
    const last_dot_idx = name.lastIndexOf('.');
    const lang = name.slice(last_dot_idx + 1);
    const group = name.slice(0, last_dot_idx) as TSCaptureGroup;
    const overrides = langOverrides[lang];
    const override = overrides![group];
    return override![theme];
}

export function generateHighlightCss(highlights: Set<string>): string {
    const hlCmp = (a: any, b: any) => (a.name == b.name ? 0 : a.name < b.name ? -1 : 1);
    const hlDefinitions = {
        light: Array.from(highlights.entries(), (v: string[]) => ({ name: v[0], def: treesitterDefinitions.light[v[0] as TSCaptureGroup] ?? getHlOverride(v[0], "light") })),
        dark: Array.from(highlights.entries(), (v: string[]) => ({ name: v[0], def: treesitterDefinitions.dark[v[0] as TSCaptureGroup] ?? getHlOverride(v[0], "dark") })),
    };
    hlDefinitions.light.sort(hlCmp);
    hlDefinitions.dark.sort(hlCmp);
    const lines: string[] = [];
    const transformLine = (entry: { name: string, def: HighlightDef }) => {
        const { name, def } = entry;
        const line = [`.${captureToClass(name).trim()} {`];
        if (def.fg) line.push(`color: ${def.fg};`);
        if (def.bg) line.push(`background-color: ${def.fg};`);
        if (def.bold) line.push("font-weight: bold;");
        if (def.italic) line.push("font-style: italic;");
        if (def.underline) line.push("text-decoration: underline;");
        if (def.strikethrough) line.push("text-decoration: line-through;");
        if (def.sp) line.push(`text-decoration-color: ${def.sp};`);
        line.push("}");
        lines.push(line.join(" "));
    };
    lines.push(`pre > code { color: ${treesitterDefinitions.light.variable.fg}; }`)
    hlDefinitions.light.forEach(transformLine);
    lines.push('\n[data-theme="dark"] {')
    lines.push(`pre > code { color: ${treesitterDefinitions.dark.variable.fg}; }`)
    hlDefinitions.dark.forEach(transformLine);
    lines.push("}");

    return lines.join("\n");
}

export interface Options {
    cssFile?: string,
}

const defaults = { cssFile: "css/highlight.css" };
let lastWrittenHighlights = new Set<string>();

export default function ts_highlight(userOptions?: Options) {
    const options = merge(defaults, userOptions);

    return function (site: Site) {
        site.addEventListener("beforeBuild", () => { usedHighlights.clear(); });
        site.addEventListener("beforeUpdate", () => { usedHighlights.clear(); });
        site.addEventListener("afterBuild", () => {
            if (usedHighlights.symmetricDifference(lastWrittenHighlights).size > 0) {
                const hl_css_file = generateHighlightCss(usedHighlights);
                const out_path = site.dest(options.cssFile);
                Deno.writeTextFileSync(out_path, hl_css_file, { create: true });
                lastWrittenHighlights = new Set(usedHighlights);
            }
        });
        site.addEventListener("afterUpdate", () => {
            if (usedHighlights.symmetricDifference(lastWrittenHighlights).size > 0) {
                const hl_css_file = generateHighlightCss(usedHighlights);
                const out_path = site.dest(options.cssFile);
                Deno.writeTextFileSync(out_path, hl_css_file, { create: true });
                lastWrittenHighlights = new Set(usedHighlights);
            }
        });
    }
}
