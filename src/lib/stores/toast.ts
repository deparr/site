import { levels } from "$lib/messages";
import { writable } from "svelte/store";

export type ToastOptions = {
    message: string;
    duration?: number;
    severity?: App.MessageLevel,
    anchor?: "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
};


const toastStore = writable<ToastOptions | null>(null);

export function showToast(options: ToastOptions) {
    if (!options.severity) {
        options.severity = levels.Info;
    }
    if (!options.anchor) {
        options.anchor = "bottom-right";
    }
    toastStore.set(options);

    const duration = options.duration ?? 800;
    // todo this isnt' really workable
    // I want it to slowly fade out
    // plus I want to allow for more than one
    setTimeout(() => toastStore.set(null), duration);
}

export default toastStore;
