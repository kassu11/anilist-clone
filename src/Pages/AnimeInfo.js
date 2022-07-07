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

import fastData from "../Components/AnimeInfo/fastData";

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
					season
					description
					popularity
					meanScore
					source(version: 3)
					format 
					genres
					type 
					status(version:2)
					bannerImage 
					title {
						english
						userPreferred
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
					rankings {
						rank
						type
						allTime
						year
						season
					}
					startDate {
						year
					}
					coverImage {
						extraLarge
						large
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

function AnimeInfo() {
	const {id} = useParams();
	const [mediaQueryData, setSiteData] = useState(null);
	const historyIndex = animeInfoHistory.findIndex(data => data?.id === +id);
	
	let currentMedia = null;
	if(mediaQueryData?.id === id) currentMedia = mediaQueryData;
	else if(historyIndex !== -1) currentMedia = animeInfoHistory[historyIndex];
	else currentMedia = fastData.data;

	if(currentMedia?.title) document.title = currentMedia?.title?.english || currentMedia?.title?.userPreferred;
	
	useEffect(() => {
		document.querySelector(".App")?.scrollTo(0, 0);
		if(historyIndex !== -1) {
			setSiteData(animeInfoHistory[historyIndex]);
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
				fastData.data = data.Media;
				setSiteData(data.Media);
			});
	}, [id]);

	if(!currentMedia) return <div className="animeInfoBody"></div>;
	return (
		<div className="animeInfoBody">
			<div className="banner">
				<img src={currentMedia.bannerImage} alt="Media banner." />
			</div>
			<div className="info">
				<div className="container">
					<div className="left-container">
						<a className="coverImage" href={currentMedia.siteUrl}>
							<img src={currentMedia?.coverImage?.extraLarge} alt="Media cover." />
						</a>
						{currentMedia?.genres?.length > 0 && (<Genres genres={currentMedia?.genres} />)}
						{currentMedia?.tags?.length > 0 && (<Tags tags={currentMedia?.tags} />)}
					</div>

					<div className="right-container">
						<Score siteData={currentMedia} />
						<Description title={currentMedia.title} description={currentMedia.description} key={currentMedia.id} />
						<Relations relations={currentMedia?.relations} />
						<Characters characterPreview={currentMedia?.characterPreview} />
						<YoutubeTrailer videoID={currentMedia?.trailer?.id} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default AnimeInfo;
