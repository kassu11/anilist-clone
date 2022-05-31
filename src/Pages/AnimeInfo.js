import { useParams } from "react-router";
import axios from "axios";
import {useEffect, useState} from "react";

import YoutubeTrailer from "../Components/YoutubeTrailer";
import Description from "../Components/AnimeInfo/Description";
import Score from "../Components/AnimeInfo/Score";
import Genres from "../Components/AnimeInfo/Genres";
import Tags from "../Components/AnimeInfo/Tags";
import Relations from "../Components/AnimeInfo/Relations";
import Characters from "../Components/AnimeInfo/Characters";

import "../Styles/Pages/animeInfo.scss";

const animeInfoHistory = [];

const query = `
query media($id:Int, $type:MediaType) {
	Media (id: $id, type: $type) {
		id
		type
		format
		genres
		siteUrl
		tags {
			name
			description
			category
			rank
			isMediaSpoiler
		}
		trailer {
			id
		}
		studios(isMain: true) {
			nodes {
				name
				siteUrl
			}
		}
		staff(sort: [RELEVANCE, ROLE, FAVOURITES]) {
			edges{
				node {
					siteUrl
					name {
						native
						userPreferred
					}
				}
				role
			}
		}
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
		popularity
		meanScore
		rankings {
			rank
			type
			allTime
			year
			season
		}
		title {
			romaji
			english
			native
			userPreferred
		}
		characterPreview:characters(perPage:6, sort:[ROLE,RELEVANCE,ID]) {
			edges {
				id 
				role 
				name 
				voiceActorRoles(language:JAPANESE, sort:[RELEVANCE,ID]) {
					roleNotes 
					dubGroup 
					voiceActor {
						id 
						name {
							userPreferred
						}
						language:languageV2 
						image {
							large
						}
					}
				}
				node {
					id 
					name {
						userPreferred
					}
					image {
						large
					}
				}
			}
		}
		relations {
			edges {
				id 
				relationType(version:2)
				node {
					id 
					title {
						english
						userPreferred
					}
					source(version: 3)
					format 
					type 
					status(version:2)
					bannerImage 
					coverImage {
						large
						medium
					}
				}
			}
		}
		bannerImage
		coverImage {
			extraLarge
		}
		description
		season
		startDate {
			year
		}
		endDate {
			year
		}
	}
}`;

function AnimeInfo({fastData}) {
	const {id} = useParams();
	const [siteData, setSiteData] = useState(fastData);
	
	useEffect(() => {
		const index = animeInfoHistory.findIndex(data => data?.id === +id);
		if(index !== -1) {
			setSiteData(animeInfoHistory[index]);
			document.title = animeInfoHistory[index]?.title?.english || animeInfoHistory[index]?.title?.userPreferred;
			return;
		};
		axios
			.post("https://graphql.anilist.co", {
				query: query,
				variables: {id}
			})
			.then(({data: {data}}) => {
				animeInfoHistory.unshift(data.Media);
				animeInfoHistory.length = 50;
				setSiteData(data.Media);
				document.title = data.Media?.title?.english || data.Media?.title?.userPreferred;
			});
	}, [id]);

	if(!siteData) return null;
	return (
		<div className="animeInfoBody">
			<div className="banner">
				<img src={siteData.bannerImage} alt="Media banner." />
			</div>
			<div className="info">
				<div className="container">
					<div className="left-container">
						<a className="coverImage" href={siteData.siteUrl}>
							<img src={siteData?.coverImage?.extraLarge} alt="Media cover." />
						</a>
						{siteData?.genres?.length > 0 && (<Genres genres={siteData?.genres} />)}
						{siteData?.tags?.length > 0 && (<Tags tags={siteData?.tags} />)}
					</div>

					<div className="right-container">
						<Score siteData={siteData} />
						<Description title={siteData.title} description={siteData.description} key={siteData.id} />
						<Relations relations={siteData?.relations} />
						<Characters characterPreview={siteData?.characterPreview} />
						<YoutubeTrailer videoID={siteData?.trailer?.id} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default AnimeInfo;