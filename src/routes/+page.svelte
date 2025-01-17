<script lang="ts">
    import Contact from "./Contact.svelte";
    import RepoShelf from "$lib/components/RepoShelf.svelte";
    // import { showToast } from "$lib/stores/toast";
    
    export let data;

    let pinned = data.projects?.pinned || [];
    let recent = data.projects?.recent || [];

    // function createToast() {
    //     showToast({
    //         message: "This is a test toast notification",
    //         duration: 2000,
    //     });
    // }
</script>

<svelte:head>
	<title>David Parrott</title>
</svelte:head>

<section>
    <h1>david parrott</h1>
    <p><strong>Welcome!<strong></p>
    <p>
        I'm a recent CS grad interested in programming languages, developer tools,
        terminals, and graphics. Here you'll find a litte bit about my current projects and, eventually, some blog posts.
    </p>

    <p class="hint">
        *psst* this site is also available as a tui, try <code class="hint">ssh tui.dparrott.dev</code> !
    </p>
    <div class="section-spacer"></div>
    <section id="projects">
        <RepoShelf title="Highlighted Repositories" repos={pinned}/>
        <RepoShelf title="Recently Updated" repos={recent} date={true}/>
    </section>
    <div class="section-spacer"></div>
    <Contact />
</section>

<style>
    p {
        font-size: 1.4rem;
        padding-left: 1.2rem;
    }

    code {
        font-size: 1.1rem;
    }

    .hint {
        font-size: 1.0rem;
        margin-top: 2rem;

    }
</style>
