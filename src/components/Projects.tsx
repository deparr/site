import { For } from "solid-js";

import s from "./Projects.module.css";

function ProjectCard(props: Project) {
    return (
        <div class={s["project-card"]}>
            <span>{props.display_name}</span>
            <br />
            <p>{props.desc}</p>
            <p>{props.timeline}{" "}{props.type}</p>
        </div>
    );
}

export function Projects(props: ProjectListProps) {
    return (
        <div class={s["projects-main"]}>
            <For each={props.projs}>
                {(p) => <ProjectCard {...p} />}
            </For>
        </div>
    );
}

