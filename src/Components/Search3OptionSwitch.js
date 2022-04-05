import { useRef, useState } from "react";

function Search3OptionSwitch() {
	const myRef = useRef();
	const [myText, setMyText] = useState("😄"); 


	return (
		<div className="ageRating">
			<div className="text">
				<p>{"+13"}</p>
				<p>/</p>
				<p>+18</p>
			</div>
			<div className="custom-range">
				<p ref={myRef}>{myText}</p>
			</div>
			<input type="range" id="volume" name="volume" min="0" max="2" defaultValue="0" onChange={
				e => {
					if(e.target.value == 0) setMyText("😄");
					if(e.target.value == 1) setMyText("😎");
					if(e.target.value == 2) setMyText("🙄");
					console.log(e.target.value)
					console.log(myRef)
					myRef.current.style.left = `calc(${(+e.target.value) / 2 * 100}%)`;
				}
			}/>
			<p className="bottomText">Age rating</p>
		</div>
	)
}

export default Search3OptionSwitch;


//😽😼🙀😾😄🙄😎😏