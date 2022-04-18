import { useContext, useMemo } from "react"
import {SearchContext, topAlbumContext, topArtistContext, topTrackContext} from "../Context"



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
        if (topTrack === undefined || topArtist === undefined || topAlbum === undefined) return;
        if (!topArtist.popularity) topArtist.popularity = topTrack.popularity - 1;
        
        const array = [topTrack, topArtist, topAlbum]
  
        // If a track is featuring the artist and is more popular
        // show the artist rather than the track
        const featuring = topTrack.artists.slice(1)
        if (featuring.some(artist => artist.name === topArtist.name)) {
          return topArtist
        } else {
          return array.sort((a, b) => a.popularity - b.popularity)[array.length - 1]
        }
      }, [topTrack, topArtist, topAlbum])

      if (topResult) console.log(topResult)

      
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
                            !topResult.images ? <img src={topResult.album.images[0].url}></img>
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
                <h2>Songs</h2>
                <ul>
                    <li>Song 1</li>
                    <li>Song 2</li>
                    <li>Song 3</li>
                    <li>Song 4</li>
                </ul>
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