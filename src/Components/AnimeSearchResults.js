import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from "react-router";

function AnimeSearchResults({data, setData}) {
	const {search} = useParams();

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
					userPreferred
				}
				coverImage {
					large
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
				setData(data.Page.media);
				console.log(data)
			});
	}, [search]);


	return (
		<div className="animes">
			{data?.map(data => (
				<div className="anime" key={data.id}>
					<Link to={`/anime/${data.id}`}>
						<img src={data.coverImage.large}></img>
						<p>{data.title.userPreferred}</p>
					</Link>
				</div>
			))}
		</div>
	);
}

export default AnimeSearchResults;