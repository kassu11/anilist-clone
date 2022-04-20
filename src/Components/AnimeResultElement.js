import {Link} from "react-router-dom";

function formatTitleToUrl(title) {
	return title.replaceAll(" ", "-").replaceAll("?", "");
}

function AnimeResultElement({data, setMediaData}) {
	return (
		<div className="anime" key={data.id}>
			<Link to={`/media/${data.id}`} onClick={e => {
				setMediaData?.(data);
			}}>
				<img src={data.coverImage.large} style={{"backgroundColor": data.coverImage?.color}}></img>
				<p>{data.title.english || data.title.userPreferred}</p>
			</Link>
		</div>
	)
}

export default AnimeResultElement;