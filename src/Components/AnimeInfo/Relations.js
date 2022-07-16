import { Link } from "react-router-dom";
import capitalize from "../../Libraries/capitalize";

import fastData from "./fastData";

const sortOrder = ["SOURCE", "ADAPTATION", "ALTERNATIVE", "SIDE_STORY", "SUMMARY", "CHARACTER", "OTHER"]

function Relations({relations, loading}) {
	if(loading) {
		return (
			<div className="relationsContainer">
				<h2>Relations</h2>
				<div className="relations">
					{[...Array(3)].map((_, i) => <a className="relation loading" key={"loading" + i}></a>)}
				</div>
			</div>
		)
	}

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
					const formatBase = edge.node?.format?.replaceAll("_", " ").toLowerCase();
					const format = formatBase === "novel" ? "light novel" : formatBase;
					const status = edge.node?.status?.replaceAll("_", " ").toLowerCase();

					return (
						<Link className="relation" key={edge.id} to={`/media/${edge.node.id}`} onClick={e => {
							fastData.data = edge.node;
							window.scrollTo(0, 0);
						}}>
							<img src={edge.node.coverImage.large} alt="Media cover" />
							<div className="relationInfo">
								<h4>{capitalize(edge.relationType.replaceAll("_", " "))}</h4>
								<p>{edge.node.title.english || edge.node.title.userPreferred}</p>
								<div className="bottom">
									<p>{capitalize(format) || "unknown"} •</p>
									<p>{capitalize(status)}</p>
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