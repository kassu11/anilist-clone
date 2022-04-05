import axios from "axios";
import {useEffect, useState} from "react";
import { useParams, useLocation } from "react-router";

import AnimeResultElement from "./AnimeResultElement";
import BottomAnimeResultElem from "./BottomAnimeResultElem";

function formatSearch(search) {
	return new URLSearchParams(search)
}

function AnimeSearchResults() {
	// const {search} = useParams();
	const {search} = useLocation();
	const [data, setData] = useState([]);

	const searchResults = formatSearch(search);

	console.log(searchResults);

	const query = `
	query ($page: Int, $search: String, $sort:[MediaSort], $isAdult: Boolean, $type: MediaType, $genre_in: [String], $genre_not_in: [String], $tag_in: [String], $season: MediaSeason, $seasonYear: Int, $format_in: [MediaFormat], $status: MediaStatus) {
		Page (page: $page) {
			pageInfo {
				total
				currentPage
				lastPage
				hasNextPage
				perPage
			}
			media (search: $search, sort: $sort, isAdult: $isAdult, type: $type, genre_in: $genre_in, genre_not_in: $genre_not_in, tag_in: $tag_in, season: $season, seasonYear: $seasonYear, format_in: $format_in, status: $status, onList: true) {
				id
				title {
					english
					userPreferred
				}
				coverImage {
					large
					color
				}
			}
		}
	}`
	
	const variables = {
		"page": 1,
		"sort": searchResults.get("search") ? "SEARCH_MATCH" : "POPULARITY_DESC",
		// "sort": ["TITLE_ENGLISH", "ID_DESC"],
		"type": undefined, // "ANIME", "MANGA"
		"genre_in": undefined,
		"genre_not_in": undefined,
		"tag_in:": undefined,
		"format_in": undefined,
		"seasonYear": undefined,
		"season": undefined,
		"search": searchResults.get("search") || undefined,
		"isAdult": false,
		"status": undefined,
	};

	useEffect(() => {
		axios
			.post("https://graphql.anilist.co", {
				query: query,
				variables: variables
			})
			.then(({data: {data}}) => {
				setData(data.Page);
			});
	}, [search]);

	return (
		<div className="animes" key={search}>
			{data.media?.map((animeData, i) => <AnimeResultElement data={animeData} key={animeData.id} />)}
			{data?.pageInfo?.hasNextPage ? <BottomAnimeResultElem query={query} variables={variables} /> : null}
		</div>
	);
}

export default AnimeSearchResults;