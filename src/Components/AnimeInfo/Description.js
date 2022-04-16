import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import {useEffect, useRef} from "react";

function Description({title, description}) {
	const myRef = useRef();

	useEffect(() => {
		const height = myRef?.current?.getBoundingClientRect().height;
		if(height < 270) myRef.current.classList.add("show");
		else myRef.current.style.maxHeight = "250px"
	}, []);

	return (
		<div className="textContainer" ref={myRef}>
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