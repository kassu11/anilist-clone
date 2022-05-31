import axios from "axios";
import {useEffect, useState} from "react";
import { useLocation } from "react-router";

import AnimeResultElement from "./AnimeResultElement";
import BottomAnimeResultElem from "./BottomAnimeResultElem";
import formatSearchUrlToObject from "../Libraries/formatSearchUrlToObject";

const searchHistory = [];
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
			type
			bannerImage
			genres
			format
			title {
				english
				userPreferred
			}
			coverImage {
				extraLarge
				large
				color
			}
			description
			stats {
				scoreDistribution {
					score
					amount
				}
				statusDistribution {
					status
					amount
				}
			}
			season
			startDate {
				year
			}
			popularity
			meanScore
			rankings {
				rank
				type
				allTime
				year
				season
			}
		}
	}
}`

function AnimeSearchResults({setMediaData}) {
	const {search} = useLocation();
	const [data, setData] = useState([]);

	const searchResults = formatSearchUrlToObject(search);

	const variables = {
		"page": 1,
		"sort": searchResults["search"] ? "SEARCH_MATCH" : "TRENDING_DESC",
		// "sort": ["TITLE_ENGLISH", "ID_DESC"],
		"type": searchResults["type"]?.toUpperCase(), // "ANIME", "MANGA"
		"genre_in": undefined,
		"genre_not_in": undefined,
		"tag_in:": undefined,
		"format_in": undefined,
		"seasonYear": undefined,
		"season": undefined,
		"isAdult": searchResults["isAdult"] === "only" ? true : searchResults["isAdult"] === "both" ? undefined : false,
		"status": undefined,
		"search": searchResults["search"] || undefined,
	};
	
	useEffect(() => {
		const index = searchHistory.findIndex(data => data?.search === search);
		window.scrollTo(0, 0);
		if(index !== -1) {
			setData(searchHistory[index]);
			return;
		};

		axios
			.post("https://graphql.anilist.co", {
				query: query,
				variables: variables
			})
			.then(({data: {data}}) => {
				const newData = {...data.Page, search};
				setData(newData);
				searchHistory.unshift(newData);
				searchHistory.length = 50;
			});
	}, [search]);

	return (
		<div className="animes">
			{data.media?.map((animeData, i) => <AnimeResultElement data={animeData} key={animeData.id} setMediaData={setMediaData} />)}
			{data?.pageInfo?.hasNextPage ? <BottomAnimeResultElem query={query} variables={variables} /> : null}
		</div>
	);
}

export default AnimeSearchResults;


const stats = `query ($id: Int = 131681, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      id 
      rankings {
        id 
        rank 
        type 
        format 
        year 
        season 
        allTime
        context
      }
      trends(sort:ID_DESC) {
        nodes {
          averageScore 
          date 
          trending 
          popularity
        }
      }
      airingTrends:trends(releasing:true,sort:EPISODE_DESC) {
        nodes {
          averageScore 
          inProgress 
          episode
        }
      }
      distribution:stats {
        status:statusDistribution {
          status 
          amount
        }
        score:scoreDistribution {
          score 
          amount
        }
      }
    }
  }
}
`