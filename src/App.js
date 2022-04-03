import "./scss/tyyli.scss";
import Header from "./Components/Header";
import {Route, Routes, HashRouter} from "react-router-dom";
import AnimeSearchResults from "./Components/AnimeSearchResults";
import AnimeSearchBar from "./Components/AnimeSearchBar";
import AnimeInfo from "./Pages/AnimeInfo";
import {useEffect, useState} from "react";

function App() {
  const [data, setData] = useState([]);
  const [siteData, setSiteData] = useState([]);

  useEffect(() => {
		console.log(data);
	}, [data]);
  return (
    <div className="App">
      <HashRouter>
        <Header setData={setData}/>
        <Routes>
          <Route path="/" element={
            <>
              <h1>Home</h1>
              <AnimeSearchBar/>
              <AnimeSearchResults data={data} />
            </>
          } />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/anime/:id" element={<AnimeInfo siteData={siteData} setSiteData={setSiteData} />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;