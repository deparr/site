// vendored frrom
// https://github.com/lumeland/experimental-plugins/blob/main/djot/mod.ts
import {
  type HTMLRenderOptions,
  parse,
  type ParseOptions,
  renderHTML,
  type Filter,
  applyFilter,
} from "./deps.ts";
import loader from "lume/core/loaders/text.ts";
import { merge } from "lume/core/utils/object.ts";

import type Site from "lume/core/site.ts";
import type { Engine } from "lume/core/renderer.ts";

export interface Options {
  /** The list of extensions this plugin applies to */
  extensions?: string[];

  /** Options passed to djot library */
  parseOptions?: ParseOptions;

  /** Options passed to djot library */
  renderOptions?: HTMLRenderOptions;

  filters?: Filter,
}

// Default options
export const defaults: Options = {
  extensions: [".dj", ".djot"],
};

/** Template engine to render Markdown files */
export class DjotEngine implements Engine {
  parseOptions: ParseOptions;
  renderOptions: HTMLRenderOptions;
  filters?: Filter;

  constructor(options: Options) {
      this.parseOptions = options.parseOptions;
      this.renderOptions = options.renderOptions;
      this.filters = options.filters;
  }

  deleteCache() {}

  render(
    content: string,
    data?: Record<string, unknown>,
    filename?: string,
  ): string {
    return this.renderComponent(content, data, filename);
  }

  renderComponent(
    content: unknown,
    data?: Record<string, unknown>,
    filename?: string,
  ): string {
    if (typeof content !== "string") {
      content = String(content);
    }
    const doc = parse(content, this.parseOptions);
    if (this.filters) {
        applyFilter(doc, this.filters)
    }
    return renderHTML(doc, this.renderOptions);
  }

  addHelper() {}
}

/** Register the plugin to support Djot */
export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return function (site: Site) {
    // Load the pages
    site.loadPages(options.extensions, {
      loader,
      engine: new DjotEngine(options),
    });

    // Register the dj filter
    site.filter("dj", filter);

    function filter(string: string, inline = false): string {
      const content = string?.toString() || "";
      const doc = parse(content, userOptions?.parseOptions);
      if (userOptions?.filters) {
          applyFilter(doc, userOptions.filters);
      }
      return renderHTML(doc, userOptions?.renderOptions);
    }
  };
}

/** Extends Helpers interface */
declare global {
  namespace Lume {
    export interface Helpers {
      /** @see https://lume.land/plugins/markdown/ */
      dj: (string: string, inline?: boolean) => string;
    }
  }
}
