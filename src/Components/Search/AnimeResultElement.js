import {Link} from "react-router-dom";
import fastData from "../AnimeInfo/fastData";

function AnimeResultElement({data}) {
	return (
		<div className="anime">
			<Link to={`/media/${data.id}`} onClick={_ => fastData.data = data}>
				<img src={data.coverImage.large} style={{"backgroundColor": data.coverImage?.color}} key={data.coverImage.large} loading="lazy" />
				<p>{data.title.english || data.title.userPreferred}</p>
			</Link>
		</div>
	)
}

export default AnimeResultElement;