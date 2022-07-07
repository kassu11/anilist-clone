import Header from "./Components/Header";
import {Route, Routes, HashRouter} from "react-router-dom";
import {useState} from "react";

import "./Styles/Pages/tyyli.scss";
import AnimeInfo from "./Pages/AnimeInfo";
import Search from "./Pages/Search";
// import Characters from "./Pages/Characters";
import UsersPage from "./Pages/UsersPage";
import NotFound from "./Pages/NotFound";

import SearchPopup from "./Components/popUp/SearchPopup";

function App() {
  return (
    <>
      <HashRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/search" element={<Search />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/media/:id" element={<AnimeInfo />} />          
            <Route path="*" element={<NotFound />} />
          </Routes>
          <footer></footer>
        </div>
        <div id="popUpContainer" className="hidden">
          <SearchPopup />
        </div>
      </HashRouter>
    </>
  )
}

export default App;