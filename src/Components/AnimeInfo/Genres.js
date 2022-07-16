
function Genres({genres, loading}) {
	if(loading) return <div className="genres loading"></div>;
	return (
		<div className="genres">
			<div className="title">
				<p>Genres</p>
			</div>
			{genres?.map(e => (
				<div className="genre" key={e}>
					<p>{e}</p>
				</div>
			))}
		</div>
	)
}

export default Genres;