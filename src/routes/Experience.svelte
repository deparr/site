<script lang="ts">
    import experience from "$lib/experience.json";
    export const id = "experience";
</script>

<section class="main-section" {id}>
    <h2 class="section-header">experience</h2>
    {#each experience as e}
        <div class="experience-card" id={e.company.toLowerCase().replaceAll(/ +/g, "-")}>
            <div class="experience-header">
                <span class="experience-title">{e.title}</span>
                <span class="experience-date">{e.start}—{e.end}</span>
            </div>
            <span class="experience-company">{e.company}</span>
            <p>{e.desc}</p>
        </div>
    {/each}
    <p class="resume-tag">for more detailed info, check my <a href="/resume.pdf">resume</a></p>
</section>

<style>
    .experience-card {
        display: flex;
        flex-direction: column;
        row-gap: 1em;
    }

    .experience-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .experience-title {
        font-weight: 300;
        font-size: 1.5em;
    }

    .experience-date {
        color: var(--color-low-accent);
        font-style: italic;
    }

    .experience-company {
        font-style: italic;
    }

    .resume-tag {
        margin-top: 2em;

    }
</style>
