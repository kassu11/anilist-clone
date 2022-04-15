
function Tags({tags}) {
	return (
		<div className="tags">
			<p className="title">Tags</p>
			{tags?.map(tag => (
				<div className="tag" key={tag.name}>
					<p className="name">{tag.name}</p>
					<p className="rank">{`${tag.rank}%`}</p>
					<p className="desc">{`${tag.description}`}</p>
				</div>
			))}
		</div>
	)
}

export default Tags;