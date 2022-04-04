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

  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <h1>Home</h1>
              <AnimeSearchBar/>
              <AnimeSearchResults data={data} setData={setData}/>
            </>
          } />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/anime/:id" element={<AnimeInfo siteData={siteData} setSiteData={setSiteData} />} />
          <Route path="/search/:search" element={
            <>
              <h1>Search</h1>
              <AnimeSearchBar/>
              <AnimeSearchResults data={data} setData={setData}/>
            </>
          } />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;