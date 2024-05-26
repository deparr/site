import "./NavBar.css"

export default function NavBar() {
	return (
		<>
		<div id="navbar">
			<a id="navbar-home" href="/">HOME</a>
			<div id="navbar-rest">
				<a class="navbar-link" href="https://github.com/deparr">github</a>
				<a class="navbar-link" href="/#proj">projects</a>
			</div>
		</div>
		</>
	);
}
