
function Tags({tags, loading}) {
	let hasSpilers = 0;
	
	if(loading) {
		return (
			<div className="tags loading">
				<p className="title">Tags</p>
			</div>
		)
	}

	return (
		<div className="tags">
			<p className="title">Tags</p>
			{tags?.map(tag => {
				const classTagName = "tag" + (tag.isMediaSpoiler ? " spoiler" : "");
				if(tag.isMediaSpoiler) hasSpilers++;
				return (
					<div className={classTagName} key={tag.name}>
						<p className="name">{tag.name}</p>
						<p className="rank">{`${tag.rank}%`}</p>
						<p className="desc">{`${tag.description}`}</p>
					</div>
				)}
			)}
			{hasSpilers > 0 && (
				<div className="button" onClick={e => {
					e.target.closest(".tags")?.classList.toggle("spoilers");
				}}>
					<p className="show">Show <span>{hasSpilers}</span> spoiler tag{hasSpilers.length > 1 ? "s" : ""}</p>
					<p className="hide">Hide <span>{hasSpilers}</span> spoiler tag{hasSpilers.length > 1 ? "s" : ""}</p>
				</div>
			)}
		</div>
	)
}

export default Tags;