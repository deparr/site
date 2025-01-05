// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
        interface RepoLang {
            name: string;
            color: string;
            percent: number;
        }
        interface Repository {
            name: string;
            owner: string;
            desc: string;
            url: string;
            pushed_at: string;
            language: RepoLang[];
            stars: number;
        };
    }
}

export { };
