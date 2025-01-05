<script lang="ts">
    import Github from "$lib/images/Github.svelte";
    import Email from "$lib/images/Email.svelte";
    import LinkedIn from "$lib/images/LinkedIn.svelte";

    export const id = "contact"
</script>

<section {id}>
    <h2>Contact</h2>
    <ul>
        <li><a href="https://github.com/deparr"><Github size={36}/>deparr</a></li>
        <li><a href="mailto:david@dparrott.dev"><Email size={36}/>david@dparrott.dev</a></li>
        <li><a href="https://linkedin.com/in/dparrott"><LinkedIn size={36}/>dparrott</a></li>
    </ul>
</section>

<style>
    ul {
        list-style: none;
    }

    a {
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        column-gap: 0.9rem;
        row-gap: 0.4rem;
        margin: 1rem 0;
    }
</style>
