<script lang="ts">
    import Github from "$lib/images/Github.svelte";
    import Email from "$lib/images/Email.svelte";
    import LinkedIn from "$lib/images/LinkedIn.svelte";

    export const id = "contact"
</script>

<section {id}>
    <h2>contact</h2>
    <ul>
        <li><a href="https://github.com/deparr"><Github size={36}/></a>deparr</li>
        <li><a href="mailto:david@dparrott.dev"><Email size={36}/></a>david@dparrott.dev</li>
        <li><a href="https://linkedin.com/in/dparrott"><LinkedIn size={36}/></a>dparrott</li>
    </ul>
</section>

<style>
    ul {
        list-style: none;
    }

    li {
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
        margin: 1rem 0;
    }
</style>
