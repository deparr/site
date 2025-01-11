import Github from "$lib/images/Github.svelte";

export type MessageLevel = number;

export const levels = {
    Debug: 0,
    Info: 1,
    Warn: 3,
    Error: 5,
    Silent: 99,
}


export const colors = {
    debug: "#696969",
    info: "#81a2be",
    warn: "#f0c674",
    error: "#cc6666",
    silent: "#282828",
}

export function levelToText(level: MessageLevel): string {
    switch (level) {
        case levels.Silent:
            return "Silent";
        case levels.Error:
            return "Error";
        case levels.Warn:
            return "Warn";
        case levels.Info:
            return "Info";
        case levels.Debug:
            return "Debug";
        default:
            return "Unknown";
    }
}


export function levelToColor(level: MessageLevel): string {
    switch (level) {
        case levels.Silent:
            return colors.silent;
        case levels.Error:
            return colors.error;
        case levels.Warn:
            return colors.warn;
        case levels.Info:
            return colors.info;
        case levels.Debug:
            return colors.debug;
        default:
            return colors.info;
    }
}

export function levelToIcon(level: MessageLevel) {
    return Github;
}
