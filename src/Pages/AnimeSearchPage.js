import AnimeSearchResults from "../Components/AnimeSearchResults";
import AnimeSearchBar from "../Components/AnimeSearchBar";

function AnimeSearchPage() {
	document.title = "Anime Search";
	return (
		<>
			<AnimeSearchBar />
			<AnimeSearchResults />
		</>
	)
}

export default AnimeSearchPage;