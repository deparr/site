<script lang="ts">
    import { levelToColor, levelToText, levelToIcon, levels } from "$lib/messages";
    import type { ToastOptions } from "$lib/stores/toast";

    export let options: ToastOptions;

    let {
        message,
        severity,
        duration,
        anchor
    } = options;

    if (!severity) {
        severity = levels.Info;
    }
    // let autoclose = severity < levels.Error;
    let autoclose = false;
    let transition = `transition-duration: ${duration}ms`;
    let position: string;
    switch (anchor) {
        case "top-left":
            position = "top: 1rem; left: 1rem;";
            break;
        case "bottom-left":
            position = "bottom: 1rem; left: 1rem;";
            break;
        case "top-right":
            position = "top: 1rem; right: 1rem;";
            break;
        default:
            position = "bottom: 1rem; right: 1rem;";
            break;
    }

    let accent = levelToColor(severity);
    let title = levelToText(severity);
    let icon = levelToIcon(severity);
</script>

<div
    class="toast"
    class:opacity-0={autoclose}
    style="border-bottom-color: {accent}; {position} {transition}"
>
    <div
        class="toast-decorations"
        style="color: {accent}; fill: {accent}; stroke: {accent}"
    >
        <span><svelte:component this={icon} /> {title}:</span>
        <button on:click={() => autoclose = true}>X</button>
    </div>
    <span class="message">{message}</span>
</div>

<style>
    .toast {
        z-index: 999;
        background-color: var(--color-bg-1);
        font-size: 1rem;
        position: fixed;
        display: flex;
        flex-flow: column nowrap;
        justify-items: space-between;
        padding: 0.6rem;
        border-color: var(--color-bg-1);
        border-width: 0.1rem;
        border-style: solid;
        border-radius: 0.1rem;
        min-height: 4rem;
        opacity: 1;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .opacity-0 {
        opacity: 0;
    }

    .toast-decorations {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.3rem;
    }

    .message {
        width: 90%;
    }
</style>
