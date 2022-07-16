import MDEditor from '@uiw/react-md-editor';
import {useEffect, useRef} from "react";

function Description({title, description, loading}) {
	const myRef = useRef();

	useEffect(() => {
		const height = myRef?.current?.getBoundingClientRect().height;
		if(height > 270) {
			myRef.current.classList.remove("show");
			myRef.current.style.maxHeight = "250px";
		}
	}, []);

	if(loading) return <div className="textContainer loading"></div>;

	return (
		<div className="textContainer show" ref={myRef}>
			<h1>{title?.english || title?.userPreferred}</h1>
			{description && (<MDEditor.Markdown source={description} />)}
			<div className="moreInfo" onClick={v => {
				const elem = v.target.closest(".textContainer");
				elem.classList.add("show");
				elem.style.maxHeight = null;
			}}>
				<p>Read More</p>
			</div>
		</div>
	);
}

export default Description;