<script>
    // todo: convert logo svg to component
    import dpar from "$lib/images/dpar.svg";
    import Github from "$lib/images/Github.svelte";
    import MenuIcon from "$lib/images/MenuIcon.svelte";
    import DropDown from "./DropDown.svelte";
</script>

<header>
    <div class="logo">
        <a href="/">
            <img src={dpar} alt="home"/>
        </a>
    </div>

    <nav class="in-drop-down">
        <ul>
            <li>
                <a href="/#projects">projects</a>
            </li>
            <li >
                <a href="/#experience">experience</a>
            </li>
            <li>
                <a href="/#contact">contact</a>
            </li>
            <li>
                <a href="/resume.pdf">resume</a>
            </li>
        </ul>
    </nav>

    <div class="corner in-drop-down">
        <a href="https://github.com/deparr/portfolio">
            <Github />
        </a>
    </div>

    <MenuIcon />
    <DropDown />
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        /* background-color: var(--color-bg-2); */
        width: 100%;
        padding-bottom: 0.1rem;
        padding-left: 1rem;
        padding-right: 1rem;
        height: 4em;
    }

    .corner {
		width: 3em;
		height: 3em;
    }

    .logo {
		width: 3em;
		height: 3em;
    }

    .corner a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    nav {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    ul {
        position: relative;
        padding: 0;
        margin: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        background-size: contain;
    }

    li {
        position: relative;
        padding: 0 1rem;
        height: 100%;
        border-bottom: 2px var(--color-bg-2) solid;
        transition: border-bottom 0.10s linear;
    }


    li:hover {
        border-color: var(--color-text);
    }

    nav a {
        display: flex;
        height: 100%;
        align-items: center;
        text-transform: uppercase;
        text-decoration: none;
        color: var(--color-text);
        transition: all 0.10s linear;
        font-weight: bold;
    }

    a {
        transition: all 0.1s linear;
    }

    a:hover {
        color: var(--color-accent);
        fill: var(--color-accent);
    }

    @media(max-width: 800px) {
        .in-drop-down {
            display: none;
        }
    }
</style>
