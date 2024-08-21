import { Projects } from "~/components/Projects";
import projectList from "../../shared/projects.json";

export default function Index() {
    return (
        <main id="main">
            <h1>Welcome!</h1>
            <Projects projs={projectList as Project[]} />
            <Projects projs={projectList as Project[]} filter="featured" />
        </main>
    );
}
