import { useParams } from "react-router";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import "../scss/character.scss";
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
					if(role.voiceActor?.language.length && role.voiceActor?.language !== selectedLanguage) return null;
					return (
						<div className="character" key={edge.id + role.roleNotes}>
							<Link to={`/character/${edge.node.id}`} className="left">
								<img src={edge.node.image.large} />
								<div>
									<p className="name">{edge.node.name.userPreferred}</p>
									<p className="role">{edge.role.toLowerCase()}</p>
								</div>
							</Link>
							{role.voiceActor ? (
								<Link to={`/staff/${role.voiceActor.id}`} className="right">
									<div>
										<p className="actor">{role.voiceActor?.name.userPreferred}</p>
										{role.roleNotes ? <p className="notes">({role.roleNotes})</p> : null}
										<p>{role.voiceActor?.language}</p>
									</div>
									<img src={role.voiceActor?.image.large}/>
								</Link>
							) : null}
						</div>
					)
				})
			))}
			{data?.characters?.pageInfo.hasNextPage ? <CharacterBottomElem query={query} variables={variables} data={data} setData={setData} /> : null}
		</div>
	)
}

export default Characters;