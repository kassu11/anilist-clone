import { useParams } from "react-router";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import "../scss/userPage.scss";

function UsersPage() {
	const [users, setUsers] = useState([]);
	const [userAnimes, setUserAnimes] = useState([]);

	const [sameAnime, setSameAnime] = useState([]);

	const query = `
	query ($search: String) {
		User (search: $search) {
			id
			name
			bannerImage
			avatar {
				large
				medium
			}
			statistics {
				anime {
					count
					meanScore
					minutesWatched
					episodesWatched
				}
				manga {
					count
					meanScore
					chaptersRead
					volumesRead
				}
			}
		}
	}`

	const mediaQuery = `
	query ($id: Int, $type: MediaType) {
		MediaListCollection(userId: $id, type:$type) {
			lists {
				name
				isCustomList
				isSplitCompletedList
				status
				entries {
					id
					score
				}
			}
		}
	}`;

	useEffect(() => {
		if(users.length == 0) return;
		axios.post("https://graphql.anilist.co", {
			query: mediaQuery,
			variables: {id: users.at(-1)?.id, type: "ANIME"}
		}).then(({data: {data}}) => {
			const listIndex = data.MediaListCollection.lists.findIndex(list => list.name == "Completed");
			userAnimes.push(data.MediaListCollection.lists[listIndex])
			setUserAnimes([...userAnimes]);
			console.log(userAnimes)
		})
	}, [users])


	return (
		<div className="usersPage">
			<div className="container">
				<div className="userSearch">
					<p>Search for user</p>
					<input type="text" placeholder="User name" spellCheck="false" onKeyDown={e => {
						if(e.keyCode === 13) {
							const search = e.target.value;
							if(search.length > 0) {
								axios.post("https://graphql.anilist.co", {
									query: query,
									variables: {search}
								}).then(({data: {data}}) => {
									if(users.find(user => user.id === data.User.id)) return;
									users.push(data.User);
									setUsers([...users]);
									console.log(users);
								}).catch(e => {
									console.log("Invalid user")
								})
							}
						}
					}} />
				</div>
				<div className="userList">
					{users.map((user, i) => (
						<div key={user.id} className="user">
							<div className="left">
								<p>{user.name}</p>
								<img className="avatar" src={user.avatar.large} alt="User avatar" />
							</div>
							<div className="middle">
								<div className="anime">
									<p className="type">Anime</p>
									<p>Total Count: {user.statistics.anime.count}</p>
									<p>Mean Score: {user.statistics.anime.meanScore}</p>
									<p>Hours Watched: {Math.floor(user.statistics.anime.minutesWatched / 60)} h</p>
									<p>Episodes Watched: {user.statistics.anime.episodesWatched}</p>
								</div>
								<div className="manga">
									<p className="type">Manga</p>
									<p>Total Count: {user.statistics.manga.count}</p>
									<p>Mean Score: {user.statistics.manga.meanScore}</p>
									<p>Chapters Read: {user.statistics.manga.chaptersRead}</p>
									<p>Volumes Read: {user.statistics.manga.volumesRead}</p>
								</div>
							</div>
							<div className="right">
								<div className="remove" onClick={e => {
									e.stopPropagation();
									users.splice(i, 1);
									userAnimes.splice(i, 1);
									setUsers([...users]);
									setUserAnimes([...userAnimes]);
								}}>
									<p>Remove</p>
								</div>
							</div>
						</div>
					))}
				</div>
				
				{users.length > 0 ? (
					<div className="compare">
						<p>Compare stats</p>
					</div>
				): null}
				
				<div className="animes">
					{/* {userAnimes
						.reduce((acc, list) => Math.min(list.entries.length, acc), userAnimes.length - 1)
						} */}
				</div>
			</div>
		</div>
	)
}

export default UsersPage;