// export const prerender = true;
import type { PageServerLoad } from "./$types";

import * as client from "$lib/server/client"

export const load: PageServerLoad = async ({ params }) => {
    let projects;
    let error = null;
    try {
        projects = await client.getProjects();
    } catch (err: any) {
        error = {
            name: err.name,
        }
    }

    return {
        projects,
        error,
    };
}
