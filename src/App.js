import { Suspense } from "react";
import Top from "./Components/Top/Top.js";
import Main from "./Components/Main/Main.js";
import Player from "./Components/Player/Player/Player.js";
import AudioControl from "./Components/AudioControl.js";
import { BrowserRouter, Routes, Route, useMatch } from "react-router-dom";
import "./styles.css";
import Artist from "./Components/ArtistPage/Artist.js";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AudioControl />
        <div className="sidebar">sidebar</div>
        <div className="main">
          <div className="topbar">
            <Top />
          </div>
          <div className="content-spacing">
            <Suspense>
            <Routes>
              <Route path="/search" element={<Main />} />
              <Route path="/artist/:id" element={<Artist />}/>
            </Routes>
            </Suspense> 
          </div>
        </div>
        <div className="music-player player">
          <Suspense fallback={<h1>loading</h1>}>
            <Player />
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}





export default App;
