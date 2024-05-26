import { For } from "solid-js";

import "./Projects.css";

function ProjectCard(props: Project) {
    return (
        <div class="project-card">
            <span>{props.display_name}</span>
            <br />
            <p>{props.desc}</p>
            <p>{props.timeline}{" "}{props.type}</p>
        </div>
    );
}

export function Projects(props: ProjectListProps) {
    return (
        <div class="projects-main">
            <For each={props.projs}>
                {(p) => <ProjectCard {...p} />}
            </For>
        </div>
    );
}

