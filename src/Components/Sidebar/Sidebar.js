import "./Sidebar.css";
import homeIcon from "../../extra/home-variant.svg";
import guitar from "../../extra/guitar-electric.svg";
import homeOutline from "../../extra/home-variant-outline.svg"
import searchIcon from "../../extra/icons8-search.svg"
import libraryIcon from "../../extra/bookshelf.svg"
import { Link } from "react-router-dom";


function Sidebar() {



  return (
    <div className="sidebar-content">
      <div className="best">
          <img id="guitar" src={guitar}></img>
        <h2 id="superstar">Superstar</h2>
      </div>

      <div className="nav">
        <div id="home">
          <img id="homeicon" src={homeIcon}></img>
          <Link to="/">Home</Link>
        </div>
        <div id="search">
            <img src={searchIcon}></img>
          <Link to="/search">Search</Link>
        </div>
        <div id="library">
            <img src={libraryIcon}></img>
          <Link to="/Library">Library</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
