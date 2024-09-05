<script>
    import Header from "./Header.svelte";
    import  "../app.css";
</script>

<div class="app">
    <Header />
    <main>
        <slot/>
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
        margin-top: 1rem;
        padding: 1rem;
        background-color: var(--color-bg-1);
        border-radius: 2rem;
        border-width: 2px;
        border-color: red;
        box-shadow: 5px 2px var(--color-bg-2);
    }

</style>
