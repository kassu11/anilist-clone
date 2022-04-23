import {Link} from "react-router-dom";

function AnimeResultElement({data, setMediaData}) {
	return (
		<div className="anime">
			<Link to={`/media/${data.id}`} onClick={_ => setMediaData?.(data)}>
				<img src={data.coverImage.large} style={{"backgroundColor": data.coverImage?.color}} alt="" />
				<p>{data.title.english || data.title.userPreferred}</p>
			</Link>
		</div>
	)
}

export default AnimeResultElement;