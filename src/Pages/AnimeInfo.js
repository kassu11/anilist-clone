import { useParams } from "react-router";
import axios from "axios";
import {useEffect, useState} from "react";

import "../scss/AnimeInfo.scss";

function AnimeInfo({siteData, setSiteData}) {
	const {id} = useParams();

	const query = `query media($id:Int,$type:MediaType,$isAdult:Boolean){Media(id:$id,type:$type,isAdult:$isAdult){id title{userPreferred romaji english native}coverImage{extraLarge large color}bannerImage startDate{year month day}endDate{year month day}description season seasonYear type format status(version:2)episodes duration chapters volumes genres synonyms source(version:3)isAdult isLocked meanScore averageScore popularity favourites isFavouriteBlocked hashtag countryOfOrigin isLicensed isFavourite isRecommendationBlocked isFavouriteBlocked nextAiringEpisode{airingAt timeUntilAiring episode}relations{edges{id relationType(version:2)node{id title{userPreferred}format type status(version:2)bannerImage coverImage{large}}}}characterPreview:characters(perPage:6,sort:[ROLE,RELEVANCE,ID]){edges{id role name voiceActors(language:JAPANESE,sort:[RELEVANCE,ID]){id name{userPreferred}language:languageV2 image{large}}node{id name{userPreferred}image{large}}}}staffPreview:staff(perPage:8,sort:[RELEVANCE,ID]){edges{id role node{id name{userPreferred}language:languageV2 image{large}}}}studios{edges{isMain node{id name}}}reviewPreview:reviews(perPage:2,sort:[RATING_DESC,ID]){pageInfo{total}nodes{id summary rating ratingAmount user{id name avatar{large}}}}recommendations(perPage:7,sort:[RATING_DESC,ID]){pageInfo{total}nodes{id rating userRating mediaRecommendation{id title{userPreferred}format type status(version:2)bannerImage coverImage{large}}user{id name avatar{large}}}}externalLinks{id site url type language color icon}streamingEpisodes{site title thumbnail url}trailer{id site}rankings{id rank type format year season allTime context}tags{id name description rank isMediaSpoiler isGeneralSpoiler userId}mediaListEntry{id status score}stats{statusDistribution{status amount}scoreDistribution{score amount}}}}`;

	const variables = {
		"id": id,
		"type": "ANIME"
	}

	useEffect(() => {
		axios
			.post("https://graphql.anilist.co", {
				query: query,
				variables: variables
			})
			.then(({data: {data}}) => {
				setSiteData(data.Media);
				console.log(data.Media)
			});
	}, []);

	return (
		<div className="animeInfoBody">
			<div className="banner">
				<img src={siteData.bannerImage}></img>
			</div>
			<h1>{siteData?.title?.english}</h1>
			<img src={siteData?.coverImage?.large}></img>
			<a href={`https://anilist.co/anime/${siteData?.id}`}>Link to anilist</a>
			<p>{siteData?.description}</p>
			<p>{siteData?.startDate?.year}</p>
			<p>{siteData?.endDate?.year}</p>
			<p>{siteData?.status}</p>
			<p>{siteData?.type}</p>
			<p>{siteData?.format}</p>
			<p>{siteData?.status}</p>
			<p>{siteData?.episodes}</p>
			<p>{siteData?.duration}</p>
			<p>{siteData?.chapters}</p>
			<p>{siteData?.volumes}</p>
			<p>{siteData?.genres}</p>
			<p>{siteData?.synonyms}</p>
			<p>{siteData?.source}</p>
			<p>{siteData?.isAdult}</p>
			<p>{siteData?.isLocked}</p>
			<p>{siteData?.meanScore}</p>
			<p>{siteData?.averageScore}</p>
			<p>{siteData?.popularity}</p>
			<p>{siteData?.favourites}</p>
			<p>{siteData?.isFavouriteBlocked}</p>
			<p>{siteData?.hashtag}</p>
			<p>{siteData?.countryOfOrigin}</p>
			<p>{siteData?.isLicensed}</p>
			<p>{siteData?.isFavourite}</p>
			<p>{siteData?.isRecommendationBlocked}</p>

		</div>
	)
}

export default AnimeInfo;