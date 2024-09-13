<script>
    import Projects from "./Projects.svelte";
    import Contact from "./Contact.svelte";
    import Experience from "./Experience.svelte";
</script>

<svelte:head>
	<title>David Parrott</title>
</svelte:head>

<section>
    <h1>david parrott</h1>
    <p>
        Welcome! Here you can find... something, maybe I'll finish writing this
        sometime.
    </p>
    <Projects />
    <Experience />
    <Contact />
</section>

<style>
    p {
        font-size: 1.2rem;
        padding-left: 1.2rem;
    }
</style>
