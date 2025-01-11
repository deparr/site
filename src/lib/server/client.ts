import { API_URL } from "$env/static/private"

async function getGhPinned(): Promise<App.Repository[]> {
    let res = await fetch(`${API_URL}/gh/pinned`);
    let data = await res.json();

    return data.data;
}

async function getGhRecent(): Promise<App.Repository[]> {
    let res = await fetch(`${API_URL}/gh/recent`);
    let data = await res.json();

    return data.data;
}


export async function getProjects() {
    let pin = getGhPinned();
    let recent = getGhRecent();
    let all = await Promise.all([pin, recent]);
    return { pinned: all[0], recent: all[1] };
}
