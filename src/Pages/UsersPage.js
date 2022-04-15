import { useParams } from "react-router";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import MDEditor from '@uiw/react-md-editor';

import "../scss/userPage.scss";

import UserScores from "../Components/UserScores";

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
				progress
				media {
					id
					title {
						romaji
						english
						native
						userPreferred
					}
					coverImage {
						large
					}
					season
					seasonYear
					description
					startDate {
						year
						month
						day
					}
					endDate {
						year
						month
						day
					}
				} 
			}
		}
	}
}`;

function UsersPage() {
	const [users, setUsers] = useState([]);
	const [userAnimes, setUserAnimes] = useState([]);
	const [sameAnime, setSameAnime] = useState([]);

	useEffect(() => {
		if(users.length == 0 || userAnimes.length >= users.length) return;
		axios.post("https://graphql.anilist.co", {
			query: mediaQuery,
			variables: {id: users.at(-1)?.id, type: "ANIME"}
		}).then(({data: {data}}) => {
			const listIndex = data.MediaListCollection.lists.findIndex(list => list.name == "Completed");
			userAnimes.push(data.MediaListCollection.lists[listIndex])
			setUserAnimes([...userAnimes]);
			console.log(userAnimes);
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
							e.target.value = "";
							if(search.length > 0) {
								axios.post("https://graphql.anilist.co", {
									query: query,
									variables: {search}
								}).then(({data: {data}}) => {
									if(users.find(user => user.id === data.User.id)) return;
									users.push(data.User);
									setUsers([...users]);
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
					<>
						<div className="compare" onClick={e => {
							if(userAnimes.length == 0) return;
							if(userAnimes.length == 1) {
								userAnimes[0].entries.sort((a, b) => b.score - a.score);
								setSameAnime(userAnimes[0].entries.map(e => ({users: [e]})))
							} else {
								const minIndex = userAnimes.reduce((acc, {entries}, i) => {
									if(acc.length < entries.length) return acc;
									return {length: entries.length, index: i};
								}, {length: Infinity, index: 0});
								const animeList = {};

								userAnimes[minIndex.index].entries.forEach(value => animeList[value.media.id] = []);
		
								const allAnimesArray = [];
		
								for(let i = 0; i < userAnimes.length; i++) {
									const length = userAnimes.length - 1
									const isLast = i == length;
									if(isLast) {
										for(const entry of userAnimes[i].entries) {
											if(animeList[entry.media.id]?.length == length) {
												animeList[entry.media.id].push(entry);
												allAnimesArray.push({users: animeList[entry.media.id]})
											}
										}
									} else {
										for(const entry of userAnimes[i].entries) {
											animeList[entry.media.id]?.push(entry);
										}
									}
								}

								allAnimesArray.forEach(row => row.avarageScore = row.users.reduce((acc, {score}) => acc + score, 0) / row.users.length);
								console.log(allAnimesArray)
								setSameAnime(allAnimesArray.sort((e1, e2) => e2.avarageScore - e1.avarageScore));
							}

						}}>
							<p>Compare stats</p>
						</div>
						{sameAnime.length ? <p className="totalAnimes">{`Total animes in common: ${sameAnime.length}`}</p> : null}
					</>
				): null}

				<div className="userAnimes" style={{display: sameAnime.length ? null : "none"}}>
					{sameAnime.map(({users: allUsersData, avarageScore}, i) => (
						<div key={allUsersData[0].id} className="anime">
							<div className="imgContainer">
								<img src={allUsersData[0].media.coverImage.large}></img>
								<p className="meanScore">{avarageScore?.toFixed(2) ?? allUsersData[0].score}</p>
							</div>
							<div className="info">
								<p className="title">{allUsersData[0].media.title.english || allUsersData[0].media.title.userPreferred}</p>
								{allUsersData.length > 1 ? (
									<div className="userScores">
										{allUsersData.map((user, i) => (
											<div key={user.id} className="userScore">
												<img className="avatar" src={users[i]?.avatar.medium}></img>
												<p>{users[i]?.name}</p>
												<p className="score">{user.score}</p>
											</div>
										))}
									</div>
								) : <MDEditor.Markdown source={allUsersData[0].media?.description} />}
							</div>
						</div>
					))}
				</div>

				<UserScores users={users} />
			</div>
		</div>
	)
}

export default UsersPage;