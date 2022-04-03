import {Link} from "react-router-dom";

function AnimeSearchResults({data}) {
	return (
		<div className="animes">
			{data.map(data => (
				<div className="anime" key={data.id}>
					<Link to={`/anime/${data.id}`}>
						<img src={data.coverImage.large}></img>
						<p>{data.title.userPreferred}</p>
					</Link>
				</div>
			))}
		</div>
	);
}

export default AnimeSearchResults;