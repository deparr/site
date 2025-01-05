<script>
	import { page } from '$app/stores';
</script>

<h1>{$page.status}</h1>
<p>{$page.error?.message}</p>
<hr>
<p>If something doesn't seem right, consider sending me an
    <a href=https://github.com/deparr/site/issues>issue on Github</a>.
</p>
<p>Thanks!</p>

<style>
    h1 {
        color: var(--color-error-accent);
        font-size: 4rem;
    }

    hr {
        width: 100%;
        color: var(--color-bg-0);
        border-color: var(--color-bg-0);
    }
</style>

