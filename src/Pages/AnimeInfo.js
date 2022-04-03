import { useParams } from "react-router";
import axios from "axios";
import {useEffect, useState} from "react";
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";

import "../scss/AnimeInfo.scss";

function AnimeInfo({siteData, setSiteData}) {
	const {id} = useParams();

	const query = `
	query media($id:Int, $type:MediaType) {
		Media (id: $id, type: $type) {
			id
			title {
				romaji
				english
				native
			}
			bannerImage
			coverImage {
				extraLarge
			}
			description
			startDate {
				year
			}
			endDate {
				year
			}
		}
	}`;

	const variables = {
		"id": id
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
			<a href={`https://anilist.co/anime/${siteData?.id}`}>
				<img src={siteData?.coverImage?.extraLarge}></img>
			</a>
			<MDEditor.Markdown source={siteData?.description} />
		</div>
	)
}

export default AnimeInfo;