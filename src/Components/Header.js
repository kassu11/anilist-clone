import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import logo from "../img/anilistLogo.svg";

function Header({setData}) {
	return (
		<nav className="header">
			<Link to="/">
				<img src={logo}></img>
			</Link>
			<Link to="/">Home</Link>
			<Link to="/search?type=anime">Animes</Link>
			<Link to="/search?type=manga">Mangas</Link>
		</nav>
	)
}





export default Header;