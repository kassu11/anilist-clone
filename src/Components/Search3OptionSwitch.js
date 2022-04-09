import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import searchVariablesToUrl from "../Lib/searchVariablesToUrl";

function Search3OptionSwitch({urlvariables, setUrlvariables}) {
	const emojis = ["😄", "😎", "🙄"];
	const myRef = useRef();
	const dValue = urlvariables.isAdult == "only" ? 2 : urlvariables.isAdult == "both" ? 1 : 0;
	const [myText, setMyText] = useState(emojis[dValue]); 
	
	const navigate = useNavigate();

	return (
		<div className="ageRating">
			<div className="text">
				<p>{"+13"}</p>
				<p>/</p>
				<p>+18</p>
			</div>
			<div className="custom-range">
				<p ref={myRef} style={{"left": `calc(${dValue / 2 * 100}%)`}}>{myText}</p>
			</div>
			<input type="range" min="0" max="2" defaultValue={dValue} onChange={rangeOptions} />
			<p className="bottomText">Age rating</p>
		</div>
	);

	function rangeOptions(e) {
		if(e.target.value == 0) urlvariables.isAdult = undefined;
		 else if(e.target.value == 1) urlvariables.isAdult = "both";
		 else if(e.target.value == 2) urlvariables.isAdult = "only";
		
		setMyText(emojis[e.target.value]);
		setUrlvariables({...urlvariables});
		myRef.current.style.left = `calc(${(+e.target.value) / 2 * 100}%)`;
		const url = searchVariablesToUrl(urlvariables);
		navigate(`/search?${url}`);
	}
}

export default Search3OptionSwitch;