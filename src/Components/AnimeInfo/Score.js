import numberToText from "../../Lib/numberToText";

function Score({siteData}) {
	const usersAmount = siteData?.stats?.scoreDistribution.reduce((acc, cur) => acc + cur.amount, 0) ?? 0;
	const ranking = siteData?.rankings?.find(({type, allTime}) => type === "RATED" && allTime)?.rank ?? 9999;
	const popularity = siteData?.rankings?.find(({type, allTime}) => type === "POPULAR" && allTime)?.rank ?? 9999;
	const season = siteData.season?.split("").map((v, i) => i == 0 ? v.toUpperCase() : v.toLowerCase()).join("") ?? "";

	return (
		<div className="scores">
			<div className="meanScore">
				<div className="title">Mean Score</div>
				<div className="score">{siteData?.meanScore / 10}</div>
				<div className="users">{`${numberToText(usersAmount)} users`}</div>
			</div>
			<div className="stats">
				<div className="top">
					<div className="rank">
						<p>Ranked <span>{`#${ranking}`}</span></p>
					</div>
					<div className="popularity">
						<p>Popularity <span>{`#${popularity}`}</span></p>
					</div>
					<div className="members">
						<p>Members <span>{`${siteData?.popularity}`}</span></p>
					</div>
				</div>
				<div className="bottom">
					<div className="releaseYear">
						<p>{`${season} ${siteData.startDate.year}`}</p>
					</div>
					<div className="format">
						<p>{`${siteData.format}`}</p>
					</div>
					<div className="studio">
						{siteData.studios.nodes.map(({name}) => (<p>{`${name}`}</p>))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Score;