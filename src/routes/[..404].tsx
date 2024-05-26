import { A } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { Title } from "@solidjs/meta";

import "./404.css";

export default function NotFound() {
	return (
		<>
		<Title>Not Found</Title>
		<HttpStatusCode code={404} />
		<main>
			<h1>Not found</h1>
			<p> TODO: make this something cool </p>
			<A class="home-link" href="/">Go Home</A>
		</main>
		</>
	)
}
