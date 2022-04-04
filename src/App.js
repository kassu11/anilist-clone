import Header from "./Components/Header";
import {Route, Routes, HashRouter} from "react-router-dom";
import {useEffect, useState} from "react";

import "./scss/tyyli.scss";
import AnimeInfo from "./Pages/AnimeInfo";
import AnimeSearchPage from "./Pages/AnimeSearchPage";

function App() {
  const [siteData, setSiteData] = useState([]);

  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={
            <AnimeSearchPage />
          } />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/anime/:id" element={
            <AnimeInfo siteData={siteData} setSiteData={setSiteData} />
          } />
          <Route path="/search/:search" element={
            <AnimeSearchPage />
          } />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;