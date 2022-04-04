import axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from "react-router";

import AnimeResultElement from "./AnimeResultElement";
import BottomAnimeResultElem from "./BottomAnimeResultElem";

function AnimeSearchResults() {
	const {search} = useParams();
	const [data, setData] = useState([]);

	const query = `
	query ($page: Int, $search: String, $sort:[MediaSort], $isAdult: Boolean) {
		Page (page: $page) {
			pageInfo {
				total
				currentPage
				lastPage
				hasNextPage
				perPage
			}
			media (search: $search, sort: $sort, isAdult: $isAdult) {
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
		"sort": search ? "SEARCH_MATCH" : "POPULARITY_DESC",
		search: search || undefined,
		"isAdult": undefined
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