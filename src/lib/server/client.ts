import { API_URL } from "$env/static/private"

export async function getGhPinned() {
    let res = await fetch(`${API_URL}/gh/pinned`);
    let data = await res.json();

    return data.data;
}

export async function getGhRecent() {
    let res = await fetch(`${API_URL}/gh/recent`);
    let data = await res.json();

    return data.data;
}
