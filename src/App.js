import { useEffect, useState, useContext, useReducer } from "react";
import Search from "./Components/Search.js";
import Searchbar from "./Components/Top/Searchbar";
import Top from "./Components/Top/Top.js";
import Main from "./Components/Main/Main.js";
import Player from "./Components/Player.js/Player.js";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import { fourState, tokenState, tracksState } from "./atoms.js";

function App() {
  // I heard that you cant store keys safely without a backend
  // So ill just store them here
  const client_id = "de8735e4e92a4bbe8bb99948f6dfbb1d";
  const client_secret = "7a1e27603bd84785a7d5b3465a5cbfe1";

  const getToken = () => {
    return fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ` + window.btoa(`${client_id}:${client_secret}`),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  const initializeState = ({ set }) => {
    getToken()
      .then((data) => data.json())
      .then((res) => set(tokenState, res.access_token));
    set(fourState, []);
    set(tracksState, []);
  };

  return (
    <div className="app">
      <RecoilRoot initializeState={initializeState}>
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
          <Player />
        </div>
      </RecoilRoot>
    </div>
  );
}

export default App;
