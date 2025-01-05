<script lang="ts">
    export let repo: App.Repository;
    export let options: string[];

    function timeFrom(pushed: string) {
        // todo human readable date diff (1d, 4h, 1w, etc)
        return "sometime";
    }
</script>

<a
    href={repo.url}
    class="shelf-item"
    style="
box-shadow: {repo.language[0]?.color} var(--rshad) var(--rshad),
var(--color-bg-3) calc(-1*var(--rshad)) calc(-1*var(--rshad));"
    target="_blank"
>
    <div>
        <span>
            <h4>{repo.name}</h4>
            <span>{repo.desc || " "}</span>
        </span>
        {#if options.includes("stars") && repo.stars > 0}
            <!-- todo star icon -->
            <span>* {repo.stars}</span>
        {/if}
        {#if options.includes("date")}
            <span>* {timeFrom(repo.pushed_at)}</span>
        {/if}
    </div>
    <span class="language-bar-wrap">
        <span class="language-bar">
            {#each repo.language as l}
                {#if l.percent > 2}
                    <span
                        class="language-bar-item"
                        style="flex-grow: {l.percent}; background-color: {l.color}"
                    ></span>
                {/if}
            {/each}
        </span>
    </span>
</a>

<style>
    .shelf-item {
        --rshad: 0rem;
        color: var(--color-text-bright);
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
        margin-top: 0px;
        margin-bottom: 0.4rem;
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
