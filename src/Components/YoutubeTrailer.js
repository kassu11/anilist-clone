

function youtubeTrailer({videoID}) {
	if(!videoID) return null;
	return (
		<div className="trailerContainer">
			<p>Trailer</p>
			<iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoID}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
		</div>
	)
}


export default youtubeTrailer;