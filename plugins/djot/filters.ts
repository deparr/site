import {
    type Attributes,
    type HTMLRenderer,
    type Image,
    type Link,
    type Para,
    type Section,
    type Visitor,
    type CodeBlock
} from "./deps.ts";

import { wrapAndHighlightCode } from "../ts_highlight/mod.ts";

function has_class(attrs: Attributes | undefined, _class: string): boolean {
    if (!attrs) return false;
    if (!attrs.class) return false;
    return attrs.class.split(" ").includes(_class);
}

export const filters = () => ({
    link: (el: Link) => {
        if (!el.destination) return;

        // internal and ends with /
        if (el.destination.match(/^[#/]/)) {
            if (el.destination.endsWith("/")) {
                el.destination = el.destination.substring(
                    0,
                    el.destination.length - 1,
                );
            }

            // any external link
        } else if (el.destination.match(/^https?/)) {
            el.attributes = el.attributes ?? {};
            el.attributes.target = "_blank";
        }
    },
    section: (el: Section) => {
        if (!el.autoAttributes?.id) return;
        el.autoAttributes.id = el.autoAttributes.id.toLowerCase();
    },
});

export const overrides: Visitor<HTMLRenderer, string> = {
    para: (node: Para, r: HTMLRenderer): string => {
        if (node.children.length == 1 && node.children[0].tag == "image") {
            return `<figure${r.renderAttributes(node)}>${r.renderChildren(node)}</figure>`;
        }
        return r.renderAstNodeDefault(node);
    },
    image: (node: Image, r: HTMLRenderer): string => {
        const destination = node.destination ?? "";
        if (has_class(node.attributes, "video")) {
            return `<video src="${destination}" controls muted=true></video>`;
        }
        if (!node.attributes) node.attributes = {}
        node.attributes.loading = "lazy";
        return r.renderAstNodeDefault(node);
    },
    code_block: (node: CodeBlock, r: HTMLRenderer) => {
        return wrapAndHighlightCode(node.text.trim(), node.lang);
    },
};
