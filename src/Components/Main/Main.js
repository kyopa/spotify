import { useContext, useMemo } from "react"
import {SearchContext, topAlbumContext, topArtistContext, topTrackContext} from "../../Context"
import hamming from "../../extra/hamming"
import FourSongs from "./FourSongs"
import useArtists from "./useArtists"
import SecondRow from "./useArtists"
import Section from "./Section"
import ThirdRow from "./useAlbums"
import TopResult from "./TopResult"
import useAlbums from "./useAlbums"


function Main() {
    return (
        <div>
            <SearchPage />
        </div>
    )
}

function SearchPage() {

    const [artists, setArtists] = useArtists();
    const [albums, setAlbums] = useAlbums();



    return (
        <div className="searchpage">
            <div className="search-results">
                <TopResult />
                <Section array={artists} title={"Artists"}/>
                <Section array={albums} title={"Albums"} album/>
                
                
            </div>
        </div>
    )
}




export default Main;