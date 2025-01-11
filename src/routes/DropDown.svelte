<script lang="ts">
    import Github from "$lib/images/Github.svelte";
    import { onMount } from "svelte";
    export let isOpen = false;
    const closeMenu = () => (isOpen = false);

    function onClick(e: MouseEvent) {
        let menu = document.getElementById("drop-down");
        let menuIcon = document.getElementById("drop-down-btn");
        if (!menu || !menuIcon) {
            return;
        }
        if (
            !menu.contains(e.target as Node) &&
            !menuIcon.contains(e.target as Node)
        ) {
            isOpen = false;
        }
    }

    onMount(() => {
        document.addEventListener("mousedown", onClick);

        return () => {
            document.removeEventListener("mousedown", onClick);
        };
    });
</script>

<button id="drop-down-btn" on:click={() => (isOpen = !isOpen)}>
    <svg
        class="menu-icon {isOpen ? 'open' : ''}"
        viewBox="0 0 100 70"
        width={40}
        height={40}
    >
        <rect width={100} height={10} x={0} y={0} rx={7} />
        <rect width={100} height={10} y={30} rx={7} />
        <rect width={100} height={10} y={60} rx={7} />
    </svg>
</button>
<div id="drop-down" class="drop-down {isOpen ? 'open' : 'close'}">
    <a href="/#projects" on:click={closeMenu}>projects</a>
    <a href="/#contact" on:click={closeMenu}>contact</a>
    <a href="/resume.pdf" target="_blank" on:click={closeMenu}>resume</a>
    <a href="https://github.com/deparr/site">
        <Github />
    </a>
</div>

<style>
    .drop-down {
        position: absolute;
        color: var(--color-text);
        background-color: #00000000;
        display: none;
        width: 100%;
        height: 0px;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        transition: 0.25s;
        overflow: hidden;
        z-index: 2;
        backdrop-filter: blur(5px);
        border-bottom-width: 1px;
        border-bottom-color: var(--color-bg-0);
        border-bottom-style: solid;
        font-weight: bold;
        font-size: 1.5em;
        top: 75px;
        left: 0px;
        transition: 0.2s ease-in-out;
    }

    div.open {
        height: 200px;
        border-bottom-color: #c5c8c680;
    }

    .menu-icon {
        display: none;
        color: var(--color-bg-0);
        border: none;
        transition: 0.25s;
        transform: rotate(0deg);
        fill: var(--color-text);
    }

    svg.open {
        transform: rotate(90deg);
        fill: var(--color-low-accent);
    }

    button {
        padding: 0;
        border: none;
        background-color: var(--color-bg-0);
    }

    button:hover {
        cursor: pointer;
    }

    @media (max-width: 800px) {
        .drop-down {
            display: flex;
        }

        .menu-icon {
            display: block;
            padding: 10px;
        }
    }
</style>
