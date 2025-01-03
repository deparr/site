<script lang="ts">
    import projects from "$lib/projects.json";
    import RepoShelf from "./RepoShelf.svelte";

    import Github from "$lib/images/Github.svelte";

    export const id = "projects";
    export let repos;
</script>

<section {id} class="main-section">
    <h2 class="section-header">projects</h2>
    {#each repos.pinned as r}
        <div>
            <h3>{r.name}</h3>
        </div>
    {/each}
    <hr>
    {#each repos.recent as r}
        <div>
            <h3>{r.name}</h3>
        </div>
    {/each}
</section>

<style>
    section {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    p {
        width: 100%;
        text-align: center;
    }

    img {
        color: var(--color-low-accent);
        font-style: italic;
        /* aspect-ratio: 1.777; */
        width: 95%;
        height: auto;
        min-height: 1.4rem;
        border: 2px var(--color-bg-2) solid;
        border-radius: 2px;
        text-align: center;
    }

    /* img[alt] { */
    /*     padding: 0.1rem 0rem; */
    /* } */

    h3 {
        margin: 0;
        height: auto;
    }

    /* svg { */
    /*     stroke: var(--color-text); */
    /*     height: 1.5rem; */
    /*     stroke-width: 1px; */
    /* } */

    .repo-link {
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: center;
    }

    .project-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 2rem 0;
        width: inherit;
        /* margin-bottom: 3.5rem; */
    }

    .card-header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0 1rem;
        height: auto;
        width: inherit;
    }

    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 1rem 0 0;
        line-height: 1.6rem;
    }
</style>
