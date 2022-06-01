import {useEffect, useState, useRef} from "react";
import axios from "axios";

import AnimeResultElement from "./AnimeResultElement";

function BottomAnimeResultElem({animeData, query, variables, setMediaData}) {
	const [data, setData] = useState(null);
	const myRef = useRef();

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
				});
			}
		});

		observer.observe(myRef.current);
	}, [])

	if(!data) return <div className="anime bottom" ref={myRef}></div>
	else {
		return (
			<>
				{data.media?.map((animeData, i) => <AnimeResultElement data={animeData} key={animeData.id} setMediaData={setMediaData} />)}
				{data?.pageInfo?.hasNextPage ? <BottomAnimeResultElem query={query} variables={variables} setMediaData={setMediaData} /> : null}
			</>
		)
	}
}

export default BottomAnimeResultElem;