import { useParams } from "react-router";
import axios from "axios";
import {useEffect, useState} from "react";

import YoutubeTrailer from "../Components/YoutubeTrailer";
import CoverImage from "../Components/AnimeInfo/CoverImage";
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
	const [mediaQueryData, setSiteData] = useState({loading: true});
	const historyIndex = animeInfoHistory.findIndex(data => data?.id === +id);

	const loading = mediaQueryData?.id != id;
	
	let currentMedia = null;
	if(mediaQueryData?.id == id) currentMedia = mediaQueryData;
	else if(historyIndex !== -1) currentMedia = animeInfoHistory[historyIndex];
	else currentMedia = fastData.data;

	useEffect(() => {
		window.scrollTo(0, 0);
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

				const largeImage = data.Media.id == fastData.data?.id ? fastData.data?.coverImage?.large : null;
				fastData.data = data.Media;
				fastData.data.coverImage.large = largeImage;
				setSiteData(data.Media);
			});
	}, [id]);

	// if(!currentMedia) return <div className="animeInfoBody"></div>;
	
	if(!currentMedia?.coverImage && fastData?.data?.coverImage) alert("Cover image is missing");

	return (
		<div className="animeInfoBody">
			<div className="banner">
				{(loading && !currentMedia?.bannerImage) && <div className="bannerImage"></div>}
				<img src={currentMedia?.bannerImage} alt="Media banner." />
				{/* <div className="bannerImage"></div> */}
				{/* <img src={currentMedia?.bannerImage} alt="Media banner." /> */}
			</div>
			<div className="info">
				<div className="container">
					<div className="left-container">
						<a className="coverImage" href={currentMedia?.siteUrl}>
							<CoverImage images={currentMedia?.coverImage ?? fastData?.data?.coverImage} loading={loading} />
						</a>
						{currentMedia?.genres?.length > 0 && (<Genres genres={currentMedia?.genres} />)}
						{currentMedia?.tags?.length > 0 && (<Tags tags={currentMedia?.tags} />)}
					</div>

					<div className="right-container">
						<Score siteData={currentMedia} loading={loading && !currentMedia} />
						<Description title={currentMedia?.title} description={currentMedia?.description} key={currentMedia?.id} />
						<Relations relations={currentMedia?.relations} loading={loading && !currentMedia?.relations} />
						<Characters characterPreview={currentMedia?.characterPreview} />
						<YoutubeTrailer videoID={currentMedia?.trailer?.id} key={"youtube-" + id} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default AnimeInfo;

{/* <Helmet>
<title>{currentMedia.title?.english || currentMedia.title?.userPreferred}</title>
<meta property="og:title" content={currentMedia.title.english || currentMedia.title.userPreferred} />

<meta property="og:site_name" content="AniList Clone" />
<meta name="theme-color" content="#2b2d42" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="apple-mobile-web-app-title" content="AniList Clone" />

<meta property="og:image" content={fastData.data.coverImage.extraLarge} data-vue-meta="true" />
<meta property="og:url" content={`https://kassu11.github.io/anilist-clone/media/${id}`} data-vue-meta="true"></meta>

<meta property="og:description" content={currentMedia.description} data-vue-meta="true" />
<meta name="description" content={currentMedia.description} data-vue-meta="true" />

</Helmet> */}