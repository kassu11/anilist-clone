import {Link} from "react-router-dom";

function formatTitleToUrl(title) {
	return title.replaceAll(" ", "-").replaceAll("?", "");
}

function AnimeResultElement({data}) {
	return (
		<div className="anime" key={data.id}>
			<Link to={`/media/${data.id}`}>
				<img src={data.coverImage.large} style={{"backgroundColor": data.coverImage?.color}}></img>
				<p>{data.title.english || data.title.userPreferred}</p>
			</Link>
		</div>
	)
}

export default AnimeResultElement;