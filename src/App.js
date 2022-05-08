import { Suspense } from "react";
import Top from "./Components/Top/Top.js";
import Main from "./Components/Main/Main.js";
import Player from "./Components/Player/Player/Player.js";
import AudioControl from "./Components/AudioControl.js";
import { BrowserRouter, Routes, Route, useMatch } from "react-router-dom";
import "./styles.css";
import Items from "./Components/Search>Items/Items.js";
import Artist from "./Components/ArtistPage/Artist.js";
import Sidebar from "./Components/Sidebar/Sidebar.js";
import Album from "./Components/AlbumPage/Album.js";

function App() {
  return (
    <BrowserRouter>
      <div className="app" onContextMenu={(e) => e.preventDefault()}>
        <Suspense>
          <AudioControl />
        </Suspense>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main">
          <Arrows />
          <Suspense>
            <Routes>
              <Route path="/search" element={<Main />} />
              <Route path="/search/:id" element={<Items />}/>
              
              <Route path="/artist/:id" element={<Artist />} />
              <Route path="/album/:id" element={<Album />} />
            </Routes>
          </Suspense>
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

const Tracks = () => <h1>oalwdo0awld0oawld0oawd</h1>;

const Arrows = () => {
  return (
    <div className="arrows">
      <button>O</button>
      <button>O</button>
    </div>
  );
};

export default App;
