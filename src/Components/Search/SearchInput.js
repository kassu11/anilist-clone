import { useNavigate } from "react-router-dom";
import searchVariablesToUrl from "../../Libraries/searchVariablesToUrl";

function SearchInput({urlvariables, setUrlvariables, buttonText}) {
	const navigate = useNavigate();

	return (
		<div className="searchBar">
			<div className="search-input">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="search-icon"><path data-v-84c4e64c="" fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
				<input type="text" placeholder="Search" value={urlvariables.search || ""} className="search" spellCheck="false" onChange={e => {
					if(e.target.value.length > 0) {
						urlvariables.search = e.target.value.replaceAll("&", "%26");
						setUrlvariables({...urlvariables});
						const url = searchVariablesToUrl(urlvariables);
						navigate(`/search?${url}`);
					} else {
						urlvariables.search = undefined;
						setUrlvariables({...urlvariables});
						const url = searchVariablesToUrl(urlvariables);
						if(url.length > 0) navigate(`/search?${url}`);
						else navigate("/");
					}
				}}/>
			</div>
			<div className="advancedSearch" onClick={e => {
				document.querySelector("#popUpContainer").classList.toggle("hidden");
			}}>
				<p>{buttonText}</p>
			</div>
		</div>
	)
}


export default SearchInput;