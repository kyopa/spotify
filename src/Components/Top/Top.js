import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Searchbar from "./Searchbar";

function Top({marginleft}) {
  return (
    <div className="topbar">
      <div className="topbar-container">
        <div style={{marginLeft: `${marginleft}px`}} className="takeup-space">
          <button>w</button>
          <button>w</button>
        </div>

        <Searchbar />
      </div>
    </div>
  );
}

export default Top;
