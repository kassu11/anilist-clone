import AnimeSearchResults from "../Components/AnimeSearchResults";
import AnimeSearchBar from "../Components/AnimeSearchBar";

function AnimeSearchPage({setMediaData}) {
	document.title = "Anime Search";
	return (
		<>
			<AnimeSearchBar />
			<AnimeSearchResults setMediaData={setMediaData} />
		</>
	)
}

export default AnimeSearchPage;