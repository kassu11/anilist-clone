import {useEffect, useState, useRef} from "react";
import axios from "axios";

import AnimeResultElement from "./AnimeResultElement";
import AnimeSearchLoading from "./AnimeSearchLoading";

function BottomAnimeResultElem({animeData, query, variables, searchHistory, historyIndex: index, search}) {
	const [data, setData] = useState(null);
	const myRef = useRef();

	const historyIndex = index === -1 ? searchHistory.findIndex(data => data?.search === search) : index;
	const newVaribles = {...variables, page: variables.page + 1};

	useEffect(() => {
		let cancel;
		const observer = new IntersectionObserver(entries => {
			if(entries[0].isIntersecting) {
				observer.disconnect();

				if(historyIndex !== -1 && newVaribles.page <= searchHistory[historyIndex].loadedPages) {
					const startIndex = (newVaribles.page - 1) * 50;
					setData({...searchHistory[historyIndex], media: searchHistory[historyIndex].media.slice(startIndex, startIndex + 50)});

					return;
				}
				
				axios({
					url: "https://graphql.anilist.co",
					method: "POST",
					params: {query, variables: newVaribles},
					cancelToken: new axios.CancelToken(c => cancel = c)
				}).then(({data: {data}}) => {
					searchHistory[historyIndex].media.push(...data.Page.media);
					searchHistory[historyIndex].loadedPages = data.Page.pageInfo.currentPage;
					setData(data.Page);
				}).catch(error => {
					if(axios.isCancel(error)) return;
					console.error(error);
				});
			}
		}, {rootMargin: "200px"});
		observer.observe(myRef.current);

		return () => cancel?.();
	}, []);

	if(!data) return (
		<>
			<div className="loader" ref={myRef}>
				<AnimeSearchLoading />
			</div>
			{[...Array(10)].map((_, i) => <AnimeSearchLoading key={`loading${i}`} />)}
		</>
	)
	else {
		return (
			<>
				{data.media?.map((animeData, i) => <AnimeResultElement data={animeData} key={animeData.id} />)}
				{data?.pageInfo?.hasNextPage ? (
					<BottomAnimeResultElem 
						query={query} 
						variables={newVaribles} 
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