import "../scss/searchBar.scss";
import SearchInput from "./SearchInput";
import formatSearchUrlToObject from "../Lib/formatSearchUrlToObject";
import Search3OptionSwitch from "./Search3OptionSwitch";
import Search3OptionSwitch2 from "./Search3OptionSwitch2";
import {useEffect, useState} from "react";
import { useLocation } from "react-router";

function AnimeSearchBar() {
	const {search} = useLocation();
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

	const [urlvariables, setUrlvariables] = useState({...baseSearch, ...searchResults});

	useEffect(() => {
		setUrlvariables({...baseSearch, ...searchResults});
	}, [search]);

	return (
		<div className="search-bar">
			<SearchInput urlvariables={urlvariables} setUrlvariables={setUrlvariables} />
			<Search3OptionSwitch urlvariables={urlvariables} setUrlvariables={setUrlvariables} />
			<Search3OptionSwitch2 urlvariables={urlvariables} setUrlvariables={setUrlvariables} />
		</div>
	);
}

export default AnimeSearchBar;