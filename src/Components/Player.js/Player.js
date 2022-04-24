import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { currentSongContext } from "../../Context"


function Player() {

    return (
        <div className="player">
            <div className="player-song-details">
                <SongDetails />
            </div>
            <div className="playbar">
                <PlayBar />
            </div>
            <div className="otherstuff">
                <OtherStuff />
            </div>
        </div>
    )
}

function SongDetails() {


    const {currentSong, setCurrentSong} = useContext(currentSongContext)
    const [img, setImg] = useState()


    useEffect(() => {

        if (!currentSong) return
        if (!currentSong.artists) return

        document.title = `${currentSong.name} • ${currentSong.artists.map(artist => {
            return ` ${artist.name}`
        })}`
    })

    return (
        <div>
            
            
            <img src={currentSong && currentSong.album && currentSong.album.images[0].url} className="player-img" ></img>

            <div className="name-artists">
            <div className="player-song-title">{currentSong.name}</div>
            <div className="player-artists">   
                {currentSong.artists && (
                
                    currentSong.artists.map((artist, idx) => {
                        return idx === 0 ? 
                        <span key={crypto.randomUUID()}><a>{artist.name}</a></span> : 
                        <span key={crypto.randomUUID()}>, <a>{artist.name}</a></span>
                    })
                )}

            </div>
            </div>
        </div>
    )
}

function PlayBar() {

    const {currentSong, dispatch} = useContext(currentSongContext)

    return (
        <div className="playbar-container">
            <div className="buttons">

                <button>shuffle</button>
                <button>prev</button>
                <button>pause/play</button>
                <button>next</button>
                <button>repeat</button>
            </div>


            <div className="progressbar">playbar</div>
        </div>
    )
}

function OtherStuff() {
    return  (
        <div>
            Volume
        </div>
    )
}



export default Player;