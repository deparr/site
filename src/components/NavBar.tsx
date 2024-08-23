import s from "./NavBar.module.css";
import g from "~/global.module.css";

export default function NavBar() {
    const navLogoClass = `${s["navbar-logo"]}`;
    const navBtnClass = `${g.btn} ${g.w100} ${g.red}`;
    const navItemClass = `${g.ml2} ${g.mr2} ${g["p-centered"]} ${g.dbgbd}`;
	return (
		<>
		<div class={s.navbar}>
			<a class={navLogoClass} href="/">HOME</a>
			<div class={`${s["navbar-section"]} ${g["flex-end"]}`}>
				<div class={navItemClass}>
                    <a class={navBtnClass} href="https://github.com/deparr">github</a>
                </div>
				<div class={navItemClass}>
                    <a class={navBtnClass} href="/#proj">projects</a>
                </div>
			</div>
		</div>
		</>
	);
}
