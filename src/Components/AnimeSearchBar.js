import "../scss/SearchBar.scss";
import SearchInput from "./SearchInput";
import formatSearchUrlToObject from "../Lib/formatSearchUrlToObject";
import Search3OptionSwitch from "./Search3OptionSwitch";
import Search3OptionSwitch2 from "./Search3OptionSwitch2";
import {useState} from "react";
import { useLocation } from "react-router";

function AnimeSearchBar({setData}) {
	const {search} = useLocation();
	const searchResults = formatSearchUrlToObject(search);

	const [urlvariables, setUrlvariables] = useState({
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
		...searchResults
	});

	return (
		<div className="search-bar">
			<SearchInput urlvariables={urlvariables} setUrlvariables={setUrlvariables} />
			<br></br>
			<Search3OptionSwitch urlvariables={urlvariables} setUrlvariables={setUrlvariables} />
			<Search3OptionSwitch2 urlvariables={urlvariables} setUrlvariables={setUrlvariables} />
			<br></br>
			{/* <select>
				<option>Lol</option>
			</select> */}
		</div>
	);
}

export default AnimeSearchBar;