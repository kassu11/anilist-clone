import Header from "./Components/Header";
import {Route, Routes, HashRouter} from "react-router-dom";
import {useState} from "react";

import "./Styles/Pages/tyyli.scss";
import AnimeInfo from "./Pages/AnimeInfo";
import AnimeSearchPage from "./Pages/AnimeSearchPage";
// import Characters from "./Pages/Characters";
import UsersPage from "./Pages/UsersPage";
import NotFound from "./Pages/NotFound";

function App() {
  const [mediaData, setMediaData] = useState(null);

  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AnimeSearchPage setMediaData={setMediaData} />} />
          <Route path="/search" element={<AnimeSearchPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/media/:id" element={<AnimeInfo fastData={mediaData} />} />          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;