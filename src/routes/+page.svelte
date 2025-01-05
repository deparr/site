<script>
    import Contact from "./Contact.svelte";
    import Experience from "./Experience.svelte";
    import RepoShelf from "$lib/components/RepoShelf.svelte";
    
    export let data;
</script>

<svelte:head>
	<title>David Parrott</title>
</svelte:head>

<section>
    <h1>david parrott</h1>
    <p>Welcome! Here you can find a little bit about me and what I get up to.</p>
    <p>
        I'm a recent CS grad interested in programming languages, developer tools,
        terminals, graphics, and out of necessity: webdev 😢.
    </p>

    <p></p>
    <p></p>
    <p></p>
    <p class="comment">
        *psst* this site is also available as an ssh tui, try <code>ssh tui.dparrott.dev</code>
    </p>
    <RepoShelf title="Highlighted Repositories" repos={data.projects.pinned}/>
    <!-- todo is there a better way to have both default and given options -->
    <RepoShelf title="Recently Updated" repos={data.projects.recent} options={["stars","date"]}/>
    <Experience />
    <Contact />
</section>

<style>
    p {
        font-size: 1.2rem;
        padding-left: 1.2rem;
    }
</style>
