import { Suspense } from "react";
import Top from "./Components/Top/Top.js";
import Main from "./Components/Main/Main.js";
import Player from "./Components/Player.js/Player.js";
import AudioControl from "./Components/AudioControl.js";

function App() {

  return (
    <div className="app">
      <AudioControl />
      <div className="sidebar">sidebar</div>
      <div className="main">
        <div className="topbar">
          <Top />
        </div>
        <div className="content-spacing">
          <Main />
        </div>
      </div>
      <div className="music-player player">
        <Suspense fallback={<h1>loading</h1>}>
          <Player />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
