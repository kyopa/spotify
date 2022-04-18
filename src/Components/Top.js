import { useContext } from "react";
import SearchContext from "../Context";
import Searchbar from "./Searchbar";



function Top() {


    

    return (
        <div className="topbar-container">

            <Arrows />
            <Searchbar />

            <div className="profile">
                Profile picture
            </div>
        </div>
    )
}

function Arrows() {
    return (
        <div className="arrows">
            <button>&#60;</button>
            <button>&#62;</button>
        </div>
    )
}

export default Top;