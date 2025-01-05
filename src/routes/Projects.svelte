<!-- todo remove -->
<script lang="ts">
    import RepoShelf from "$lib/components/RepoShelf.svelte";

    export const id = "projects";
    export let repos;
</script>

<section {id} class="main-section">
    <h2 class="section-header">projects</h2>
    <RepoShelf title="Github Pinned" repos={repos.pinned} />
    <RepoShelf title="Recently Updated" repos={repos.recent} />
</section>

<style>
    section {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

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
