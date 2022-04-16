import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import { useLocation } from "react-router";
import logo from "../img/anilistLogo.svg";
import "../Styles/Components/Header.scss";

function Header() {
	const {pathname} = useLocation();
	
	return (
		<nav className={"header " + (pathname.startsWith("/media") ? "media" : "normal")} >
			<Link to="/">
				<img src={logo}></img>
			</Link>
			<Link to="/">Home</Link>
			<Link to="/search?type=anime">Animes</Link>
			<Link to="/search?type=manga">Mangas</Link>
			<Link to="/users">Users</Link>
		</nav>
	)
}





export default Header;