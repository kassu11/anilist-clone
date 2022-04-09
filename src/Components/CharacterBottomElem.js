import {Link} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import axios from "axios";

function CharacterBottomElem({query, variables, data, setData}) {
	const myRef = useRef();
	
	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			if(entries[0].isIntersecting) {
				observer.disconnect();
				variables.page++;

				axios.post("https://graphql.anilist.co", {
					query: query,
					variables: variables
				}).then(({data: {data: nData}}) => {
					data.characters.edges.push(...nData.Media.characters.edges);
					data.characters.pageInfo = {...nData.Media.characters.pageInfo}
					setData({...data});
				});
			}
		});

		observer.observe(myRef.current);
	}, [data])

	return (
		<div className="character bottom" ref={myRef}></div>
	)
}

// function BottomAnimeResultElem({animeData, query, variables}) {
// 	const [data, setData] = useState(null);
// 	const myRef = useRef();

// 	useEffect(() => {
// 		const observer = new IntersectionObserver(entries => {
// 			if(entries[0].isIntersecting) {
// 				observer.disconnect();
// 				variables.page++;

// 				axios.post("https://graphql.anilist.co", {
// 					query: query,
// 					variables: variables
// 				}).then(({data: {data}}) => {
// 					setData(data.Page);
// 				});
// 			}
// 		});

// 		observer.observe(myRef.current);
// 	}, [])

// 	if(!data) return <div className="anime bottom" ref={myRef}></div>
// 	else {
// 		return (
// 			<>
// 				{data.media?.map((animeData, i) => <AnimeResultElement data={animeData} key={animeData.id} />)}
// 				{data?.pageInfo?.hasNextPage ? <BottomAnimeResultElem query={query} variables={variables} /> : null}
// 			</>
// 		)
// 	}
// }


export default CharacterBottomElem;