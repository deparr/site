<script lang="ts">
    import RepoShelfItem from "./RepoShelfItem.svelte";
    export let title: string;
    export let repos: Array<App.Repository>;
    export let stars: boolean = true;
    export let date: boolean = false;

    let options = {
        stars,
        date,
    };
</script>

<div>
    <h2>{title}</h2>
    <div class="repo-shelf">
    {#each repos as repo}
        <RepoShelfItem {repo} {options} />
    {/each}
    </div>
</div>

<style>
    .repo-shelf {
        background-color: var(--color-bg-1);
        box-sizing: border-box;
        border-radius: 1rem;
        padding: 1rem;

        display: grid;
        grid-template-columns: var(--grid-dimensions);
        gap: 0.8rem 1rem;
    }
</style>
