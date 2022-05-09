import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Searchbar from "./Searchbar";

function Top({marginleft, hideSearchBar}) {
  return (
    <div className="topbar">
      <div className="topbar-container">
        <div style={{marginLeft: `${marginleft}px`}} className="takeup-space">
          <button>w</button>
          <button>w</button>
        </div>

        {!hideSearchBar ? <Searchbar /> : null}
      </div>
    </div>
  );
}

export default Top;
