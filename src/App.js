import { Suspense, useState } from "react";
import Main from "./Components/Main/Main.js";
import Player from "./Components/Player/Player/Player.js";
import AudioControl from "./Components/AudioControl.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import Items from "./Components/Search>Items/Items.js";
import Artist from "./Components/ArtistPage/Artist.js";
import Sidebar from "./Components/Sidebar/Sidebar.js";
import Album from "./Components/AlbumPage/Album.js";
import Discography, {
  DiscoItem,
} from "./Components/ArtistPage/DiscographyPage.js";
import backArrowIcon from "./extra/chevron-left.svg";
import forwardArrowIcon from "./extra/chevron-right.svg";

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
              <Route path="/search/:id" element={<Items />} />

              <Route path="/artist/:id" element={<Artist />} />
              <Route path="/artist/:id/discography" element={<Discography />} />
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

const Arrows = () => {
  const forceUpdate = useForceUpdate();
  const update = (direction) => {
    direction === "back" ? window.history.back() : window.history.forward();
    forceUpdate();
  };
  console.log(window.history.length - window.history.state.idx);
  console.log(window.history);

  return (
    <div className="arrows">
      <div>
        <img
          className={window.history.state.idx === 0 ? "history-end" : "default"}
          src={backArrowIcon}
          onClick={() => {
            update("back");
          }}
        ></img>
      </div>
      <div>
        <img
          className={
            window.history.length - window.history.state.idx === 1
              ? "history-end"
              : "default"
          }
          src={forwardArrowIcon}
          onClick={() => update("forward")}
        ></img>
      </div>
    </div>
  );
};

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

export default App;
