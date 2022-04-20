import numberToText from "../../Libraries/numberToText";

function Score({siteData}) {
	const usersAmount = siteData?.stats?.scoreDistribution.reduce((acc, cur) => acc + cur.amount, 0) ?? 0;
	const ranking = siteData?.rankings?.find(({type, allTime}) => type === "RATED" && allTime)?.rank ?? 9999;
	const popularity = siteData?.rankings?.find(({type, allTime}) => type === "POPULAR" && allTime)?.rank ?? 9999;
	const season = siteData.season?.split("").map((v, i) => i == 0 ? v.toUpperCase() : v.toLowerCase()).join("") ?? "";

	const customAvarageScore = siteData?.stats?.scoreDistribution.reduce((acc, cur) => acc + cur.amount * cur.score, 0) / usersAmount;
	const avarageScore = (customAvarageScore + siteData?.meanScore) / 10 / 2 || siteData?.meanScore / 10;

	return (
		<div className="scores">
			<div className="meanScore">
				<div className="title">Mean Score</div>
				<div className="score">{(avarageScore).toFixed(2)}</div>
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
						<p>Members <span>{`${numberToText(siteData?.popularity)}`}</span></p>
					</div>
				</div>
				<div className="bottom">
					<div className="releaseYear">
						<p>{`${season} ${siteData.startDate?.year || ""}`}</p>
					</div>
					<div className="format">
						<p>{`${siteData.format}`}</p>
					</div>
					{siteData.studios?.nodes?.length ? (
						<div className="studio">
							{siteData.studios.nodes.slice(0, 3).map(({name}) => (<p key={name}>{`${name}`}</p>))}
						</div>
					) : (
						<div className="staff">
							{siteData.staff?.edges.slice(0, 2).map(({node, role}) => {
								const name = node.name.userPreferred || node.name.native;
								return <p key={name}>{`${name}`} <span>{role}</span></p>
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Score;