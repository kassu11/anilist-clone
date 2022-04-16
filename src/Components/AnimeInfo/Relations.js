import { Link } from 'react-router-dom';


function Relations({relations}) {
	if(!relations?.edges.length) return null;
	return (
		<div className="relationsContainer">
			<h2>Relations</h2>
			<div className="relations">
				{relations.edges.map(edge => {
					const formatBase = edge.node.format.replaceAll("_", " ").toLowerCase();
					const format = formatBase == "novel" ? "light novel" : formatBase;
					const status = edge.node.status.replaceAll("_", " ").toLowerCase();

					return (
						<Link className="relation" key={edge.id} to={`/media/${edge.node.id}`}>
							{/* <Link to={`/media/${edge.node.id}`}> */}
								<img src={edge.node.coverImage.large}></img>
								<div className="relationInfo">
									<h4 className="firstLetter">{edge.relationType.replaceAll("_", " ").toLowerCase()}</h4>
									<p>{edge.node.title.english || edge.node.title.userPreferred}</p>
									<div className="bottom">
										<p className="firstLetter">{format} •</p>
										<p className="firstLetter">{status}</p>
									</div>
								</div>
							{/* </Link> */}
						</Link>
					)
				})}
			</div>
		</div>
	)
}


export default Relations;