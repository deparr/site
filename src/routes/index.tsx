import { Projects } from "~/components/Projects";
import Hero from "~/components/Hero";
import projectList from "../../shared/projects.json";
import g from "~/global.module.css";

export default function Index() {
    return (
        <main class={g.main}>
            <Hero main="David Parrott" upper={true} />
            <Projects projs={projectList as Project[]} />
        </main>
    );
}
