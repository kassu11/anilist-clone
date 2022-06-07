import AnimeSearchResults from "../Components/AnimeSearchResults";
import AnimeSearchBar from "../Components/AnimeSearchBar";
import "../Styles/Pages/search.scss";

function AnimeSearchPage({setMediaData}) {
	document.title = "Anime Search"
	return (
		<>
			<AnimeSearchBar />
			<AnimeSearchResults setMediaData={setMediaData} />
		</>
	)
}

export default AnimeSearchPage;