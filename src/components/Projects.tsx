import { For, createSignal } from "solid-js";
import "./Projects.css";

function ProjectCard(props: Project) {
	return (
		<div>
			<span>{props.display_name}</span>
			<br/>
			<p>{props.desc}</p>
			<p>{props.timeline}{" "}{props.type}</p>
		</div>
	);
}

export function Projects(props: ProjectListProps) {
	const [filter, setFilter] = createSignal(props.filter);

	const filterProjects = (p: Project) => {
		const f = filter();
		if (!f) return true;
		if (!p.type) return false
		return p.type.indexOf(f) > -1;
	}

	return (
		<div class="projects-main">
			<div>displaying {filter()} projects</div>
			<For each={props.projs.filter(filterProjects)}>
				{(p) => <ProjectCard {...p} />}
			</For>
		</div>
	);
}

