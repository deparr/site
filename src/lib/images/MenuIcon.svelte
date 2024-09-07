<script lang="ts">
    $: open = false;
</script>

<div class="menu-icon">
    <svg class="menu-icon" viewBox="0 0 100 80" width={40} height={40}>
        <rect width={100} height={10} y={10} rx={7} />
        <rect width={100} height={10} y={40} rx={7} />
        <rect width={100} height={10} y={70} rx={7} />
    </svg>
</div>

<style>
    .menu-icon {
        display: none;
    }

    @media (max-width: 800px) {
        .menu-icon {
            display: block;
            padding: 10px;
        }
    }
</style>
