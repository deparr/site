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

export function Projects(props: { data: Project[]}) {
	const [filterIdx, setFilterIdx] = createSignal(0);
	const filters = ["all","personal","school"];
	const filter = () => filters[filterIdx()]

	const filterProjects = (p: Project) => {
		const f = filter();
		if (f === "all") return true;
		else return p.type === f;
	}

	return (
		<div>
			<button onClick={() => setFilterIdx(((filterIdx() + 1) % filters.length))}>
				cycle filter
			</button>
			<div>displaying {filter()} projects</div>
			<For each={props.data.filter(filterProjects)}>
				{(p) => <ProjectCard {...p} />}
			</For>
		</div>
	);
}

