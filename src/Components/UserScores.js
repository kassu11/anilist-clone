import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {useEffect, useState} from "react";


const query = `
User(name:"NIMI") {
	id 
	name 
	statistics {
		anime {
			formats {
				format
				count
				meanScore
				minutesWatched
				chaptersRead
				mediaIds
			}
			statuses {
				status
				count
				meanScore
				minutesWatched
				chaptersRead
				mediaIds
			}
			scores {
				score
				count
				meanScore
				minutesWatched
				chaptersRead
				mediaIds
			}
			lengths {
				length
				count
				meanScore
				minutesWatched
				chaptersRead
				mediaIds
			}
			releaseYears {
				releaseYear
				count
				meanScore
				minutesWatched
				chaptersRead
				mediaIds
			}
			startYears {
				startYear
				count
				meanScore
				minutesWatched
				chaptersRead
				mediaIds
			}
			countries {
				country
				count
				meanScore
				minutesWatched
				chaptersRead
				mediaIds
			}
		}
	}
}`

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => 5),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => 100),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function UserScores({users}) {

	const [chartData, setChartData] = useState(null);

	// useEffect(() => {
	// 	if(users.length == 0 || userAnimes.length >= users.length) return;
	// 	axios.post("https://graphql.anilist.co", {
	// 		query: mediaQuery,
	// 		variables: {id: users.at(-1)?.id, type: "ANIME"}
	// 	}).then(({data: {data}}) => {
	// 		const listIndex = data.MediaListCollection.lists.findIndex(list => list.name == "Completed");
	// 		userAnimes.push(data.MediaListCollection.lists[listIndex])
	// 		setUserAnimes([...userAnimes]);
	// 		console.log(userAnimes);
	// 	})
	// }, [users])
	
	console.log(users)
	if(users.length == 0) return null;
	const text = "query{" + users.map(user => query.replace("NIMI", user.name)).join("") + "}";

	return <Bar options={options} data={data} />;
}

export default UserScores;