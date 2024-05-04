import { ErrorBoundary, Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { MetaProvider, Link } from "@solidjs/meta";

import NavBar from "~/components/NavBar";
import "./app.css";

export default function App() {
	return (
		<MetaProvider>
			<Link rel="icon" href="/favicon.png" />
			<ErrorBoundary
				fallback={(err: any, reset: any) => <div onClick={reset}>Error: {err.toString()}</div>}
			>
				<NavBar />
				<Router root={(props: any) => <Suspense>{props.children}</Suspense>}>
					<FileRoutes />
				</Router>
			</ErrorBoundary>
		</MetaProvider>
	);
}
