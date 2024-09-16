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
    <p>Welcome! Here you can find a little bit about me and what I get up to.</p>
    <p>
        I'm a recent CS grad with special interests in programming languages, developer tools,
        terminals, and out of necessity: webdev 😢.
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
