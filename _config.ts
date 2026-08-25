import lume from "lume/mod.ts";
import esbuild from "lume/plugins/esbuild.ts";
import date from "lume/plugins/date.ts";
import extractDate from "lume/plugins/extract_date.ts";

import { formatInTimeZone } from "npm:date-fns-tz@3.2.0";

import feed from "./plugins/feed/mod.ts";
import djot from "./plugins/djot/mod.ts";
import ts_highlight from "./plugins/ts_highlight/mod.ts";
import { filters, overrides } from "./plugins/djot/filters.ts";

const site = lume({ src: "./src", location: new URL("https://dparrott.dev") })
    .use(djot({ filters, renderOptions: { overrides } }))
    .use(ts_highlight())
    .use(esbuild({ extensions: [".ts", ".tsx"]}))
    .use(date())
    .use(extractDate())
    .use(feed({
        output: ["/feed.xml"],
        query: "post",
        info: {
            title: "dparrott.dev",
            description: "=site.description",
            generator: false,
            lang: "en",
        },
        items: {
            title: "=title",
            description: "=description",
            authorName: "deparr",
        },
    }))
    .add("assets", ".")
    .add([".css", ".ts"])
    .filter("date", (value: Date, format: string) => {
        return formatInTimeZone(value, "UTC", format);
    });

export default site;
