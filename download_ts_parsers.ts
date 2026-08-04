interface ParserInfo {
    wasm: string;
    highlights: string;
};
export const parser_sources: Record<string, ParserInfo> = {
    go: {
        wasm: "https://github.com/tree-sitter/tree-sitter-go/releases/download/v0.25.0/tree-sitter-go.wasm",
        highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/go/highlights.scm"
    },
    c: {
        wasm: "https://github.com/tree-sitter/tree-sitter-c/releases/download/v0.24.2/tree-sitter-c.wasm",
        highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/c/highlights.scm"
    },
    bash: {
        wasm: "https://github.com/tree-sitter/tree-sitter-bash/releases/download/v0.25.1/tree-sitter-bash.wasm",
        highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/bash/highlights.scm"
    },

    rust: {
        wasm: "https://github.com/tree-sitter/tree-sitter-rust/releases/download/v0.24.2/tree-sitter-rust.wasm",
        highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/rust/highlights.scm"
    },
    // TODO: set up a github action or similar to build gdscript and shader remotely and make
    // them fetchable
    gdscript: {
        // this url is invalid
        wasm: "https://github.com/PrestonKnopp/tree-sitter-gdscript/releases/download/v0.25.0/tree-sitter-gdscript.wasm",
        highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/gdscript/highlights.scm"
    },
    gdshader: {
        wasm: "https://github.com/airblast-dev/tree-sitter-gdshader",
        highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/gdshader/highlights.scm"
    },
    // TODO neovim merges highlights from common js and typescript
    // typescript: {
    //     wasm: "https://github.com/tree-sitter/tree-sitter-typescript/releases/download/v0.23.2/tree-sitter-typescript.wasm",
    //     // todo nvim ts inherits from ecma
    //     highlights: [ "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/typescript/highlights.scm" ]
    // },
    lua: {
        wasm: "https://github.com/tree-sitter-grammars/tree-sitter-lua/releases/download/v0.5.0/tree-sitter-lua.wasm",
        highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/lua/highlights.scm"
    },
    zig: {
        wasm: "https://github.com/tree-sitter-grammars/tree-sitter-zig/releases/download/v1.1.2/tree-sitter-zig.wasm",
        highlights: "https://raw.githubusercontent.com/nvim-treesitter/nvim-treesitter/refs/heads/main/runtime/queries/zig/highlights.scm"
    },
};

export const installed_langs = Object.keys(parser_sources);

function file_exists(path: string): boolean {
    try {
        const stat = Deno.statSync(path);
        if (!stat.isFile || stat.size == 0) return false;
    } catch { return false; }

    return true;
}

async function download_file(url: string, fd_dest: string) {
    const res = await fetch(url);
    const file = Deno.openSync(fd_dest, { create: true, truncate: true, write: true });
    await res.body!.pipeTo(file.writable);
    // file.close(); // this is erroring ??
}


const parser_dir = "plugins/ts_highlight/parsers";
const query_dir = "plugins/ts_highlight/queries";

async function main() {
    const force_update = Deno.args.reduce((acc, s) => (acc || s === "-f" || s === "--force-update"), false);

    if (force_update) console.log("forcing parser updates");

    let downloaded_queries = false;
    for (const lang in parser_sources) {
        const parser_out_path = `${parser_dir}/tree-sitter-${lang}.wasm`;
        if (force_update || !file_exists(parser_out_path)) {
            console.log(` downloading tree-sitter-${lang}.wasm...`);
            await download_file(parser_sources[lang].wasm, parser_out_path);
        }

        const query_out_path = `${query_dir}/highlights-${lang}.scm`;
        if (force_update || !file_exists(query_out_path)) {
            console.log(`  downloading highlights-${lang}`);
            downloaded_queries = true;
            await download_file(parser_sources[lang].highlights, query_out_path);
        }

        if (downloaded_queries) {
            console.log("\n remember to clean the newly downloaded query files!");
            console.log("lua-match -> match");
            console.log("!!!\nalso find a better query source or process them automatically");
        }
    }
}


if (import.meta.main) await main();

