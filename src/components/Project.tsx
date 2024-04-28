import { For } from "solid-js";

export type Project = {
	display_name?: string;
	name?: string;
	desc?: string;
	tech?: string[];
	timeline?: string;
	images?: string[];
	type?: string;
}

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

export function Projects(props: { data: Project[]}) {
	return (
		<For each={props.data} >
			{(p) => <ProjectCard {...p} />}
		</For>
	);
}

