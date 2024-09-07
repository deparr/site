<script lang="ts">
    import projects from "$lib/projects.json";

    import Github from "$lib/images/Github.svelte";

    export let id = "projects";
</script>

<section {id}>
    <h2>projects</h2>
    {#each projects as p }
        <div class="project-card" id={p.name}>
            <div class="card-header">
                <h3>{p.display_name}</h3>
                <svg viewBox="0 0 5 10">
                    <line x1="2.5" y1="0" x2="2.5" y2="10">
                </svg>
                <a href={p.repo}>
                    <Github />
                </a>
            </div>
            <div class="card-body">
                <div>
                    <p>{p.desc}</p>
                    <p>{p.timeline}</p>
                </div>
                <img class="comment" src={p.img} alt={`[img:${p.name}]`}>
            </div>
        </div>
    {/each}
</section>

<style>
    section {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    img {
        align-self: flex-end;
        height: 20rem;
        width: 20rem;
    }

    h3 {
        margin: 0;
        height: auto;
    }

    svg {
        stroke: var(--color-text);
        height: 1.5rem;
        stroke-width: 1px;
    }

    .project-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: inherit;
    }

    .card-header {
        display: flex;
        justify-content: flex-start;
        gap: 0 1rem;
        height: auto;
        width: inherit;
    }

    .card-body {
        display: flex;
        justify-content: space-between;   
        align-items: center;
        padding: 1rem 1rem 0;
    }
</style>
