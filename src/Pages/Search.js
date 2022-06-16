import AnimeSearchResults from "../Components/Search/AnimeSearchResults";
import AnimeSearchBar from "../Components/Search/AnimeSearchBar";
import "../Styles/Pages/search.scss";

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