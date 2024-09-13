<script lang="ts">
    import projects from "$lib/projects.json";

    import Github from "$lib/images/Github.svelte";

    export const id = "projects";

    const htmlPrefix = "@html";
</script>

<section {id} class="main-section">
    <h2 class="section-header">projects</h2>
    {#each projects as p}
        {#if p.display }
        <div class="project-card" id={p.name}>
            <div class="card-header">
                <h3>{p.display_name.toLowerCase()}</h3>
                <!-- <svg viewBox="0 0 5 10"> -->
                <!--     <line x1="2.5" y1="0.5" x2="2.5" y2="9.5"> </line></svg -->
                <!-- > -->
                <a href={p.repo} target="_blank" class="repo-link">
                    <Github size={30} />
                </a>
            </div>
            <div class="card-body">
                <img src={p.img} alt={`[img:${p.name}]`} />
                <!-- todo: this is ok for now but not so great -->
                {#if p.desc.startsWith(htmlPrefix)}
                    {@html p.desc.substring(htmlPrefix.length)}
                {:else}
                    <p>{p.desc}</p>
                {/if}
            </div>
        </div>
        {/if}
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
        border: 2px var(--color-bg-2) solid;
        border-radius: 2px;
    }

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
    }
</style>
