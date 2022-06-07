import {useEffect, useState, useRef} from "react";
import axios from "axios";

import AnimeResultElement from "./AnimeResultElement";

function BottomAnimeResultElem({animeData, query, variables, setMediaData, searchHistory, historyIndex: index, search}) {
	const [data, setData] = useState(null);
	const myRef = useRef();

	const historyIndex = index === -1 ? searchHistory.findIndex(data => data?.search === search) : index;

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			if(entries[0].isIntersecting) {
				observer.disconnect();
				variables.page++;

				axios.post("https://graphql.anilist.co", {
					query: query,
					variables: variables
				}).then(({data: {data}}) => {
					setData(data.Page);
					searchHistory[historyIndex].media.push(...data.Page.media);
					searchHistory[historyIndex].pageInfo = data.Page.pageInfo;
				});
			}
		}, {rootMargin: "200px"});

		observer.observe(myRef.current);
	}, []);

	if(!data) return (
		<>
			<div className="anime bottom" ref={myRef}></div>
			{[...Array(10)].map((_, i) => <div className="anime bottom" key={`loading${i}`}></div>)}
		</>
	)
	else {
		return (
			<>
				{data.media?.map((animeData, i) => <AnimeResultElement data={animeData} key={animeData.id} setMediaData={setMediaData} />)}
				{data?.pageInfo?.hasNextPage ? (
					<BottomAnimeResultElem 
						query={query} 
						variables={variables} 
						setMediaData={setMediaData} 
						searchHistory={searchHistory} 
						historyIndex={historyIndex} 
						search={search}
					/>
				) : null}
			</>
		)
	}
}

export default BottomAnimeResultElem;