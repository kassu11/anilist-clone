import AnimeSearchResults from "../Components/AnimeSearchResults";
import AnimeSearchBar from "../Components/AnimeSearchBar";
import { Helmet } from "react-helmet";

function AnimeSearchPage({setMediaData}) {
	return (
		<>
			<Helmet>
				<title>Anime Search</title>
			</Helmet>
			<AnimeSearchBar />
			<AnimeSearchResults setMediaData={setMediaData} />
		</>
	)
}

export default AnimeSearchPage;