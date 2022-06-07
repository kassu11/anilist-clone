import Character from "./Character";

function Characters({characterPreview}) {
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