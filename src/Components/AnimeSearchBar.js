import "../scss/SearchBar.scss";
import SearchInput from "./SearchInput";
import Search3OptionSwitch from "./Search3OptionSwitch";

function AnimeSearchBar({setData}) {
	return (
		<div className="search-bar">
			<SearchInput />
			<br></br>
			<Search3OptionSwitch />
			<br></br>
			<select>
				<option>Lol</option>
			</select>
		</div>
	);
}

export default AnimeSearchBar;