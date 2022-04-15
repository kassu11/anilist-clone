import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import {useEffect, useRef} from "react";

function Description({title, description}) {
	const myRef = useRef();

	useEffect(() => {
		console.log(myRef);
	}, [])

	return (
		<div className="textContainer">
			<h1>{title?.english || title?.userPreferred}</h1>
			{description && (<MDEditor.Markdown source={description} ref={myRef} />)}
			
		</div>
	);
}

export default Description;