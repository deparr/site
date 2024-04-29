import { Projects, Project } from "~/components/Projects";
import projectList from "../../shared/projects.json";

export default function Index() {
	return (
		<main>
			<h1>Welcome!</h1>
			<Projects data={projectList as Project[]}/>
		</main>
	);
}
