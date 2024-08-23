import { Projects } from "~/components/Projects";
import projectList from "../../shared/projects.json";
import g from "~/global.module.css";

export default function Index() {
    return (
        <main class={g.main}>
            <h1 class={`${g.h1}`}>Welcome!</h1>
            <Projects projs={projectList as Project[]} />
            <Projects projs={projectList as Project[]} filter="featured" />
        </main>
    );
}
