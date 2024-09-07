<script lang="ts">
    import Github from "$lib/images/Github.svelte";
    $: open = false;
</script>

<div class="drop-down">
    <a href="/#projects">projects</a>
    <a href="/#experience">experience</a>
    <a href="/#contact">contact</a>
    <a href="/resume.pdf">resume</a>
    <a href="https://github.com/deparr/portfolio">
        <Github />
    </a>
</div>

<style>
    .drop-down {
        position: fixed;
        background-color: rbga(80,80,80,.9);
        color: var(--color-text);
        display: none;
        width: 100%;
        height: 200px;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        transition: 0.25s;
        overflow: hidden;
        z-index: 2;
        backdrop-filter: blur(5px);
        border-bottom: 1px #c5c8c680 solid;
        font-weight: bold;
        font-size: 1.5em;
        top: 75px;
        left: 0px;
    }

    @media(max-width: 800px) {
        .drop-down {
            display: flex;
        }
    }
</style>
