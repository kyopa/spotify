import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Searchbar from "./Searchbar";

function Top() {
  return (
    
    <div className="topbar-container">
      <Arrows />
      <Routes>
        <Route path="/search" element={<Searchbar />}/>
      </Routes>
      <div className="profile">Profile picture</div>
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
