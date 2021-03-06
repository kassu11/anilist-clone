import "../../Styles/Components/searchBar.scss";
import SearchInput from "./SearchInput";
import formatSearchUrlToObject from "../../Libraries/formatSearchUrlToObject";
import AgeSlider from "../AgeSlider";
import MediaTypeSlider from "./MediaTypeSlider";
import {useEffect, useState} from "react";
import { useLocation } from "react-router";

function AnimeSearchBar({buttonText = "Advanced search"}) {
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
		<div className="search-container">
			<SearchInput urlvariables={urlvariables} setUrlvariables={setUrlvariables} buttonText={buttonText} />
			{/* <AgeSlider urlvariables={urlvariables} setUrlvariables={setUrlvariables} /> */}
			{/* <MediaTypeSlider urlvariables={urlvariables} setUrlvariables={setUrlvariables} /> */}
		</div>
	);
}

export default AnimeSearchBar;