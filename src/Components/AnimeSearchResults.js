import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from "react-router";

function AnimeSearchResults({data, setData}) {
	const {search} = useParams();

	const query = `
	query ($id: Int, $page: Int, $perPage: Int${search ? "" : ", $search: String"}) {
		Page (page: $page, perPage: $perPage) {
			pageInfo {
				total
				currentPage
				lastPage
				hasNextPage
				perPage
			}
			media (id: $id, search: ${search ? `"${search}"` : "$search"}) {
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

	console.log(query, search)
	

	const variables = {
		"page": 1,
		"type": "ANIME",
		"sort": "SEARCH_MATCH"
	};

	useEffect(() => {
		axios
			.post("https://graphql.anilist.co", {
				query: query,
				variables: variables
			})
			.then(({data: {data}}) => {
				setData(data.Page.media);
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