import { useParams } from "react-router";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import "../Styles/Pages/character.scss";
import Character from "../Components/AnimeInfo/Character";
import CharacterBottomElem from "../Components/CharacterBottomElem";


function Characters() {
	const {id} = useParams();

	const [nData, setNdata] = useState([]);
	const [data, setData] = useState([]);

	const query = `
	query media($id:Int,$page:Int) {
		Media(id:$id) {
			id 
			characters(page:$page,sort:[ROLE,RELEVANCE,ID]) {
				pageInfo {
					total 
					perPage 
					currentPage 
					lastPage 
					hasNextPage
				}
				edges {
					id 
					role 
					name 
					voiceActorRoles(sort:[RELEVANCE,ID]) {
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
		}
	}`

	const variables = {
		id: id,
		page: data?.characters?.pageInfo.currentPage || 1
	}

	useEffect(() => {
		axios.post("https://graphql.anilist.co", {
			query: query,
			variables: variables
		}).then(({data: {data}}) => {
			setData(data.Media);
		});
	}, [id]);

	const selectedLanguage = "Japanese";
	// const selectedLanguage = "English";

	return (
		<div className="characters">
			{data?.characters?.edges.map(edge => (
				(edge.voiceActorRoles.length ? edge.voiceActorRoles : [1]).map(role => {
					if(role.voiceActor?.language.length && role.voiceActor?.language !== "Japanese") return null;
					return <Character edge={edge} role={role} key={edge.id + role.roleNotes + role.voiceActor?.name.userPreferred} />
				})
			))}
			{data?.characters?.pageInfo.hasNextPage ? <CharacterBottomElem query={query} variables={variables} data={data} setData={setData} /> : null}
		</div>
	)
}

export default Characters;