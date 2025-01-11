<script lang="ts">
    import Star from "$lib/images/Star.svelte";

    import { timeSince } from "$lib";

    export let repo: App.Repository;
    export let options: {stars: boolean, date: boolean};

    // if a repo has lang info, it will always have at least one language
    const defaultColor = "#ff8000";
    const majorityLangColor = repo.language?.at(0)?.color || defaultColor;
</script>

<a
    href={repo.url}
    class="shelf-item"
    style="
box-shadow: {majorityLangColor} var(--rshad) var(--rshad),
var(--color-bg-3) calc(-1*var(--rshad)) calc(-1*var(--rshad));"
    target="_blank"
>
    <div class="repo-main">
        <span>
            <h4>{repo.name}</h4>
        </span>
        <div class="repo-meta">
            {#if options.date}
                <span class="repo-meta-item">{timeSince(repo.pushed_at)}</span>
            {/if}
            {#if options.stars && repo.stars > 0}
                <span class="repo-meta-item">
                    <Star /> <span>{repo.stars}</span>
                </span>
            {/if}
        </div>
    </div>
    <span class="repo-description">{repo.desc || " "}</span>
    <span class="language-bar-wrap">
        <span class="language-bar">
            {#if !repo.language}
                <span
                    class="language-bar-item"
                    style="flex-grow: 0; background-color: {defaultColor}"
                ></span>
            {:else}
                {#each repo.language as l}
                    <span
                        class="language-bar-item"
                        style="flex-grow: {l.percent || 0}; background-color: {l.color}"
                    ></span>
                {/each}
            {/if}
        </span>
    </span>
</a>

<style>
    .shelf-item {
        --rshad: 0rem;
        color: var(--color-text-bright);
        fill: var(--color-text);
        text-decoration: none;
        background-color: var(--color-bg-0);
        border-radius: 0.5rem;

        padding: 0.8rem;
        display: flex;

        flex-flow: column nowrap;
        justify-content: space-between;

        transition: all 0.3s ease;
    }

    .shelf-item:hover {
        --rshad: 0.2rem;
        filter: brightness(85%);
    }

    h4 {
        font-size: 1.2rem;
        margin-bottom: 0px;
        margin-top: 0px;
    }

    .repo-main {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.8rem;
    }

    .repo-meta {
        color: var(--color-text);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        column-gap: 0.8rem;
        filter: brightness(80%);
    }

    .repo-meta-item {
        display: flex;
        column-gap: 0.2rem;
        align-items: center;
        line-height: 1.25rem;
    }

    .repo-description {
        max-width: 90%;
    }

    .language-bar-wrap {
        margin-top: 2rem;
    }

    .language-bar {
        display: flex;
        border-radius: 3px;
        box-sizing: border-box;
        align-self: flex-end;
        margin-top: 0.3rem;
    }

    .language-bar-item {
        height: 0.15rem;
    }

    .language-bar-item:only-child {
        border-radius: 0.5rem;
    }

    .language-bar-item:first-child {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
    }

    .language-bar-item:last-child {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
</style>
