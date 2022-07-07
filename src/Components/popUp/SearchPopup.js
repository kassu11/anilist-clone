import CustomSelect from './CustomSelect';
import CustomMultiSelect from './CustomMultiSelect';
import AnimeSearchBar from "../Search/AnimeSearchBar";
import formatSearchUrlToObject from "../../Libraries/formatSearchUrlToObject";
import searchVariablesToUrl from "../../Libraries/searchVariablesToUrl";
import "../../Styles/Components/popUp.scss";

import {useEffect, useState} from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

function SearchPopup() {
	const {search} = useLocation();
	const navigate = useNavigate();
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

	// const typeValue = urlvariables.type === "anime" ? "Anime" : urlvariables.type === "manga" ? "Manga" : "Both";
	let typeValue = "Both";
	if(urlvariables.type === "anime") typeValue = "Anime";
	else if(urlvariables.type === "manga") typeValue = "Manga";
	
	// const ageValue = urlvariables.Both === "only" ? "Adults" : urlvariables.Both === "both" ? "Both" : "Teens";
	let ageValue = "Teens";
	if(urlvariables.isAdult === "only") ageValue = "Adults";
	else if(urlvariables.isAdult === "both") ageValue = "Both";

	return (
		<div className="searchPopUp">
			<AnimeSearchBar buttonText={"Close search"} />
			<p>Type</p>
			<CustomSelect values={["Manga", "Anime", "Both"]} text={"Media type: "} selectedValue={typeValue} customChange={value => {
				if(value === "Anime") urlvariables.type = "anime";
				else if(value === "Both") urlvariables.type = undefined;
				else if(value === "Manga") urlvariables.type = "manga";
				setUrlvariables({...urlvariables});
				const url = searchVariablesToUrl(urlvariables);
				navigate(`/search?${url}`);
			}}/>
			<p>Age</p>
			<CustomSelect values={["Teens", "Adults", "Both"]} text={"Age rating: "} selectedValue={"Teens"} customChange={value => {
				if(value === "Teens") urlvariables.isAdult = undefined;
				else if(value === "Both") urlvariables.isAdult = "both";
				else if(value === "Adults") urlvariables.isAdult = "only";
				setUrlvariables({...urlvariables});
				const url = searchVariablesToUrl(urlvariables);
				navigate(`/search?${url}`);
			}}/>
			{/* <CustomMultiSelect values={["Teens", "Adults"]} text={"Age rating: "} selectedValue={"Teens"}></CustomMultiSelect> */}
			{/* <p>Filters</p>
			<p>Sorting</p>
			<p>Genres</p>
			<p>Tags</p>
			<p>Media type</p> */}

			<div className="buttonContainer">
				{/* <div className="reset button">Reset</div>
				<div className="clear button">Clear all</div> */}
				{/* <div className="okay button">Search</div> */}
			</div>
		</div>
	)
}

export default SearchPopup;