import { useContext, useMemo } from "react"
import { useEffect } from "react"
import { topResultContext, SearchContext, topAlbumContext, topArtistContext, topTrackContext} from "../../Context"
import hamming from "../../extra/hamming"
import FourSongs from "./FourSongs"

function TopResult() {


    const {search, setSearch} = useContext(SearchContext)
    const {topAlbum, setTopAlbum} = useContext(topAlbumContext)
    const {topArtist, setTopArtist} = useContext(topArtistContext)
    const {topTrack, setTopTrack} = useContext(topTrackContext)
    const {topResult, setTopResult} = useContext(topResultContext)
    
    
      useEffect(() => {
        if (!topArtist || !topTrack || !topAlbum) return
        setTopResult(hamming(search, topArtist, topTrack, topAlbum))

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
                            : <img src={topResult && topResult.images[0].url}></img>
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

export default TopResult;