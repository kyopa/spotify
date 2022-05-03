import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Searchbar from "./Searchbar";

function Top() {
  return (
    <div className="topbar">
    <div className="topbar-container">
      <div className="takeup-space">
        <button>w</button>
        <button>w</button>
      </div>

      <Searchbar />
    </div>
    </div>
  );
}

function Arrows() {
  return (
    <div className="arrows">
      <button>&#60;</button>
      <button>&#62;</button>
    </div>
  );
}

export default Top;
