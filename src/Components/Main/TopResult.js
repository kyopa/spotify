import { useContext, useMemo } from "react"
import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { searchState, topAlbumState, topArtistState, topTrackState } from "../../atoms"
import { topResultContext, SearchContext, topAlbumContext, topArtistContext, topTrackContext} from "../../Context"
import hamming from "../../extra/hamming"
import FourSongs from "./FourSongs"

function TopResult() {


    const search = useRecoilValue(searchState)
    const topAlbum = useRecoilValue(topAlbumState)
    const topArtist = useRecoilValue(topArtistState)
    const topTrack = useRecoilValue(topTrackState)
    const [topResult, setTopResult] = useRecoilState(topResult)
    

    useEffect(() => {

        if (!topArtist || !topTrack || !topAlbum) return
        setTopResult(hamming(search, topArtist, topTrack, topAlbum))

    }, [topAlbum, topTrack, topArtist])

    
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