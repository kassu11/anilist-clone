import {Link} from "react-router-dom";

function Character({edge, role}) {
	return (
		<div className="character">
			<div className="left">
				<img src={edge.node.image.large} />
				<div>
					<p className="name">{edge.node.name.userPreferred}</p>
					<p className="role">{edge.role.toLowerCase()}</p>
				</div>
			</div>
			{role?.voiceActor ? (
				<div className="right">
					<div>
						<p className="actor">{role.voiceActor?.name.userPreferred}</p>
						{role.roleNotes ? <p className="notes">({role.roleNotes})</p> : null}
						<p>{role.voiceActor?.language}</p>
					</div>
					<img src={role.voiceActor?.image.large}/>
				</div>
			) : null}
		</div>
	)
}

export default Character;