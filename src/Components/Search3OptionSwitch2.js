import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import searchVariablesToUrl from "../Libraries/searchVariablesToUrl";

function Search3OptionSwitch({urlvariables, setUrlvariables}) {
	const emojis = ["🎥", "🙏", "📖"];
	const myRef = useRef();
	const dValue = urlvariables.type == "anime" ? 0 : urlvariables.type == "manga" ? 2 : 1;
	const [myText, setMyText] = useState(emojis[dValue]);
	
	const navigate = useNavigate();

	return (
		<div className="searchType">
			<div className="text">
				<p>🎥</p>
				<p>/</p>
				<p>📖</p>
			</div>
			<div className="custom-range">
				<p ref={myRef} style={{"left": `calc(${dValue / 2 * 100}%)`}}>{myText}</p>
			</div>
			<input type="range" min="0" max="2" defaultValue={dValue} onChange={rangeOptions} />
			<p className="bottomText">Media Type</p>
		</div>
	);

	function rangeOptions(e) {
		if(e.target.value == 0) urlvariables.type = "anime";
		 else if(e.target.value == 1) urlvariables.type = undefined;
		 else if(e.target.value == 2) urlvariables.type = "manga";
		
		setMyText(emojis[e.target.value]);
		setUrlvariables({...urlvariables});
		myRef.current.style.left = `calc(${(+e.target.value) / 2 * 100}%)`;
		const url = searchVariablesToUrl(urlvariables);
		navigate(`/search?${url}`);
	}
}

export default Search3OptionSwitch;