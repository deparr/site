<script lang="ts">
    import "../app.css";
    import Header from "./Header.svelte";
    // import Toast from "$lib/components/Toast.svelte";

    // import type { ToastOptions } from "$lib/stores/toast";
    // import toastStore from "$lib/stores/toast";

    // let toast: ToastOptions | null;
    // toastStore.subscribe((value) => {
    //     toast = value;
    // });
</script>

<div class="app">
    <Header />
    <main>
        <slot />
    </main>
</div>

<!-- {#if toast} -->
<!--     <Toast options={toast} /> -->
<!-- {/if} -->

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
