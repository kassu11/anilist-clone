import Header from "./Components/Header";
import {Route, Routes, HashRouter} from "react-router-dom";
import {useState} from "react";

import "./Styles/Pages/tyyli.scss";
import AnimeInfo from "./Pages/AnimeInfo";
import Search from "./Pages/Search";
// import Characters from "./Pages/Characters";
import UsersPage from "./Pages/UsersPage";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/media/:id" element={<AnimeInfo />} />          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;