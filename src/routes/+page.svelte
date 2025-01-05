<script>
    import Contact from "./Contact.svelte";
    import RepoShelf from "$lib/components/RepoShelf.svelte";
    
    export let data;
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
        <RepoShelf title="Highlighted Repositories" repos={data.projects.pinned}/>
        <!-- todo is there a better way to have both default and given options -->
        <RepoShelf title="Recently Updated" repos={data.projects.recent} options={["stars","date"]}/>
    </section>
    <div class="section-spacer"></div>
    <Contact />
</section>

<style>
    p {
        font-size: 1.2rem;
        padding-left: 1.2rem;
    }

    code {
        font-size: 1.05rem;
    }

    .hint {
        font-size: 1.0rem;
        margin-top: 2rem;

    }
</style>
