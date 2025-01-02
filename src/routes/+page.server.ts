// export const prerender = true;
import type { PageServerLoad } from "./$types";

import * as client from "$lib/server/client"

export const load: PageServerLoad = async ({ params }) => {
    const pinned = await client.getGhPinned();
    const recent = await client.getGhRecent();
    return {
        projects: {
            pinned: pinned,
            recent: recent,
        }
    };
}
