import {Link} from "react-router-dom";
import { useLocation } from "react-router";
import logo from "../img/anilistLogo.svg";
import "../Styles/Components/Header.scss";
import formatSearchUrlToObject from "../Libraries/formatSearchUrlToObject";
import searchVariablesToUrl from "../Libraries/searchVariablesToUrl";

function Header() {
	const {pathname, search} = useLocation();
	const searchResults = formatSearchUrlToObject(search);

	const baseSearch = {
		"sort": undefined,
		"type": undefined,
		"genre_in": undefined,
		"genre_not_in": undefined,
		"tag_in:": undefined,
		"format_in": undefined,
		"seasonYear": undefined,
		"season": undefined,
		"isAdult": false,
		"status": undefined,
		"search": undefined,
	}

	Object.assign(baseSearch, searchResults);
	baseSearch.type = "/media/"
	const url = searchVariablesToUrl(baseSearch);
	
	return (
		<nav className={"header " + (pathname.startsWith("/media") ? "media" : "normal")} >
			<Link to="/">
				<img src={logo} alt="Home" />
			</Link>
			<Link to="/">Home</Link>
			<Link to={`/search?${url.replace("/media/", "anime")}`}>Animes</Link>
			<Link to={`/search?${url.replace("/media/", "manga")}`}>Mangas</Link>
			<Link to="/users">Users</Link>
		</nav>
	)
}





export default Header;