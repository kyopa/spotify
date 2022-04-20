import { useContext, useMemo } from "react"
import {SearchContext, topAlbumContext, topArtistContext, topTrackContext} from "../../Context"
import hamming from "../../extra/hamming"
import FourSongs from "./FourSongs"


function Main() {
    return (
        <div>
            <SearchPage />
        </div>
    )
}

function SearchPage() {
    return (
        <div className="searchpage">
            <div className="search-results">
                <TopResult />
                <Featuring />
            </div>
        </div>
    )
}

function TopResult() {

    const {search, setSearch} = useContext(SearchContext)
    const {topAlbum, setTopAlbum} = useContext(topAlbumContext)
    const {topArtist, setTopArtist} = useContext(topArtistContext)
    const {topTrack, setTopTrack} = useContext(topTrackContext)
    
    const topResult = useMemo(() => {
        if (!topArtist || !topTrack || !topAlbum) return
        return hamming(search, topArtist, topTrack, topAlbum)
      }, [topAlbum, topTrack, topArtist])


      // TODO: On click disable the current song that is playing
      const handleClick = () => {
          const song = new Audio(topResult.preview_url)
          song.play();
      }
    
    return (
        <div className="top-result-grid">
            <div className="top-result">
                <h2>Top Result</h2>
                <div className="top-result-box">
                    {topResult && (
                        <div className="container">
                            { 
                            topResult && !topResult.images ? <img src={topResult.album.images[0].url}></img>
                            : <img src={topResult.images[0].url}></img>
                            }
                        <div id="name">{topResult && <div>{topResult.name}</div>}</div>
                        
                        <div className="details">
                            {topResult.explicit ? <div className="explicit-symbol">E</div> : null}
                            <a className="artist" href="">
                                {topResult.artists &&
                                topResult.artists.length > 1 ? 
                                topResult.artists.map(artist => artist.name).join(", ") : 
                                <div>{topResult.artists && topResult.artists[0].name}</div>
                                }
                            </a>
                            <div className="type">
                                {topResult.type}
                            </div>
                        </div>

                        <div className="playbutton-box">
                            <button id="Play" onClick={() => handleClick()}>B</button>

                        </div>
                    
                        </div>
                    )}
                    


                </div>
            </div>

            <div className="top-result-songs">
                <FourSongs/>


            </div>


        </div>
    )
}

function Featuring() {
    return (
        <div>
            <h2>Featuring</h2>


        </div>
    )
}

export default Main;