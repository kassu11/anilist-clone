import AnimeSearchResults from "../Components/AnimeSearchResults";
import AnimeSearchBar from "../Components/AnimeSearchBar";

function AnimeSearchPage() {
	return (
		<>
			<h1>Search</h1>
			<AnimeSearchBar/>
			<AnimeSearchResults />
		</>
	)
}

export default AnimeSearchPage;