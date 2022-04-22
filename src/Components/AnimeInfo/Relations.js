import { Link } from 'react-router-dom';

const sortOrder = ["SOURCE", "ADAPTATION", "ALTERNATIVE", "SIDE_STORY", "SUMMARY", "CHARACTER", "OTHER"]

function Relations({relations}) {
	if(!relations?.edges.length) return null;
	const relationsClass = relations.edges?.length > 6 ? "relations small" : "relations";

	return (
		<div className="relationsContainer">
			<h2>Relations</h2>
			<div className={relationsClass} >
				{relations.edges.sort((v1, v2) => {
					const e1 = sortOrder.findIndex(v => v === v1.relationType);
					const e2 = sortOrder.findIndex(v => v === v2.relationType);

					if(e1 === e2) return 0
					if(e1 === -1) return 1;
					if(e2 === -1) return -1;
					return e1 - e2;
				}).map(edge => {
					const formatBase = edge.node.format.replaceAll("_", " ").toLowerCase();
					const format = formatBase === "novel" ? "light novel" : formatBase;
					const status = edge.node.status.replaceAll("_", " ").toLowerCase();

					return (
						<Link className="relation" key={edge.id} to={`/media/${edge.node.id}`}>
							<img src={edge.node.coverImage.large} alt="Media cover" />
							<div className="relationInfo">
								<h4 className="firstLetter">{edge.relationType.replaceAll("_", " ").toLowerCase()}</h4>
								<p>{edge.node.title.english || edge.node.title.userPreferred}</p>
								<div className="bottom">
									<p className="firstLetter">{format} •</p>
									<p className="firstLetter">{status}</p>
								</div>
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	)
}


export default Relations;