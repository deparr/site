<script>
    import Header from "./Header.svelte";
    import "../app.css";
</script>

<div class="app">
    <Header />
    <main>
        <slot />
    </main>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        align-items: center;
        background-color: var(--color-bg-0);
    }

    /* .stars { */
    /*     position: fixed; */
    /*     top: 0; */
    /*     left: 0; */
    /*     width: 50%; */
    /*     height: 50%; */
    /*     border-radius: 40px; */
    /*     /* background-image: linear-gradient(to right, var(--color-accent), var(--color-error-accent)); */
    /*     /* animation: star-anim 2s linear infinite; */
    /* } */

    main {
        width: 60%;
        display: flex;
        flex: 1;
        flex-direction: column;
        box-sizing: border-box;
        margin: 0 auto;
        padding: 1rem;
        /* border-radius: 2rem; */
        /* border-width: 2px; */
        /* border-color: red; */
        /* box-shadow: 5px 2px var(--color-bg-2); */
    }

    @keyframes star-anim {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 800px) {
        main {
            width: 100%;
        }
    }
</style>
