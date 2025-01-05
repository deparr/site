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

    main {
        width: 60%;
        display: flex;
        flex: 1;
        flex-direction: column;
        box-sizing: border-box;
        margin: 0 auto;
        padding: 1rem;
    }

    @media (max-width: 1200px) {
        main {
            width: 85%;
        }
    }

    @media (max-width: 800px) {
        main {
            width: 100%;
        }
    }
</style>
