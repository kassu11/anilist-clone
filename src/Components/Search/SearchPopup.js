import CustomSelect from './CustomSelect';
import CustomMultiSelect from './CustomMultiSelect';

function SearchPopup() {
	return (
		<div className="searchPopUp">
			<p>Filters</p>
			<CustomSelect values={["Manga", "Anime", "Both"]} text={"Media type: "} selectedValue={"Both"}></CustomSelect>
			<p>Sorting</p>
			<CustomSelect values={["Adults", "Teens", "All ages"]} text={"Age range: "} selectedValue={"Teens"}></CustomSelect>
			<p>Genres</p>
			<CustomMultiSelect values={["Adults", "Teens"]} text={"Age range: "} selectedValue={"Teens"}></CustomMultiSelect>
			<p>Tags</p>
			<p>Media type</p>

			<div className="buttonContainer">
				<div className="reset button">Reset</div>
				<div className="clear button">Clear all</div>
				<div className="okay button">Search</div>
			</div>
		</div>
	)
}

export default SearchPopup;