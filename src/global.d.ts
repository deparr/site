/// <reference types="@solidjs/start/env" />
type Project = {
    display_name?: string;
    name?: string;
    desc?: string;
    tech?: string[];
    timeline?: string;
    images?: string[];
    type?: string;
    repo?: string;
}

type ProjectListProps = {
    projs: Project[];
    filter?: string;
    linkToAll?: boolean;
}

type HeroProps = {
    main: string;
    sub?: string;
    upper?: boolean;
}

