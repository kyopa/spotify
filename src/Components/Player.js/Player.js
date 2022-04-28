import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { currentSongState, pauseState } from "../../atoms"
import { currentSongContext } from "../../Context"


// NONE OF THIS IS SETUP PROPERLY YET

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
    const [currentSong, setCurrentSong] = useRecoilState(currentSongState)

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

    // I HAVENT SET THIS UP YET PROPERLY

    const [currentSong, setCurrentSong] = useRecoilState(currentSongState)
    const [pause, setPause] = useRecoilState(pauseState)

    const _handleClick = () => {
        setCurrentSong(prev => ({...prev, playing: !currentSong.playing}))

        if (!pause) {

        }
    }

    return (
        <div className="playbar-container">
            <div className="buttons">

                <button>shuffle</button>
                <button>prev</button>
                <button onClick={() => _handleClick()}>{currentSong.playing ? <div>Pause</div> : 
                <div>Play</div>}</button>
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