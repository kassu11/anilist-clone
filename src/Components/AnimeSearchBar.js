import { useNavigate } from "react-router-dom";

function AnimeSearchBar({setData}) {
	const navigate = useNavigate();

	return (
		<div className="search-bar">
			<input type="text" placeholder="Search" onKeyDown={e => {
				if(e.keyCode === 13) {
					if(e.target.value.length > 0) {
						navigate(`/search/${e.target.value}`);
					} else {
						navigate("/");
					}
				}
			}}/>
		</div>
	);
}

export default AnimeSearchBar;