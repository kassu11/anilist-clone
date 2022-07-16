import Character from "./Character";

function Characters({characterPreview, loading}) {
	if(loading) {
		return (
			<div className="character-container">
				<h2>Characters</h2>
				<div className="characters">
					{[...Array(6)].map((_, i) => {
						return <div className="character loading" key={"characterLoading" + i}></div>
					})}
				</div>
			</div>
		)	
	}

	if(!characterPreview?.edges?.length) return null;
	return (
		<div className="character-container">
			<h2>Characters</h2>
			<div className="characters">
				{characterPreview.edges.map(edge => {
					const [role] = edge.voiceActorRoles;
					return <Character edge={edge} role={role} key={`${edge.id}${role?.roleNotes || ""}${role?.voiceActor?.name.userPreferred}`} />
				})}
			</div>
		</div>
	)
}


export default Characters;