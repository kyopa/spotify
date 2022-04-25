import { unhover } from "@testing-library/user-event/dist/hover";
import { prev } from "cheerio/lib/api/traversing";
import { prevElementSibling } from "domutils";
import { useContext, useEffect, useRef } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";
import { tokenContext, TracksContext, styleContext, currentSongContext } from "../../Context";
import playIcon from "../../extra/playicon.png";
import pauseIcon from "../../extra/pause.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentSongState, fourState, pauseState } from "../../atoms";
import { setDoc, doc, getDoc } from "firebase/firestore";
import db from "../../firebase.config";



function FourSongs() {

    const {tracks, setTracks} = useContext(TracksContext)
    
    const [four, setFour] = useRecoilState(fourState)

    useEffect(() => {
        setFour([tracks[0], tracks[1], tracks[2], tracks[3]])
    }, [tracks])

    return (
        <div>
            <div className="songs-see-all">
                <h2>Songs</h2>
                <a href="hundred bitches" id="see-all">See all</a>
            </div>
            
            {four && four.map(song => {
                return (
                    <div key={crypto.randomUUID()}>
                        <Song song={song}/>
                        </div>
                )
            })}
        </div>
    )
}

function Song(props) {
    const [song, setSong] = useState();
    const [style, setStyle] = useState({})
    const {token, setToken} = useContext(tokenContext)

    const currentSong = useRecoilValue(currentSongState)

    const fetchSong = (song) => {
        return fetch(`https://api.spotify.com/v1/tracks/${song.id}?market=ES`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
    }

    useEffect(() => {
        if (!props.song) return
        fetchSong(props.song)
        .then(data => data.json())
        .then(res => {
            const artists = props.song.artists.map(artist => {
                return {...artist, hovering: false}
            })

            setSong({...res, artists: artists, playing: false})
        })
        .catch(err => console.log(err))
    }, [])



    return (
        <div>
            {song && (
                <ul className="songs">
                    
                    <styleContext.Provider value={{style, setStyle}}>

                        <Box song={song} setSong={setSong} 
                        currentSong={currentSong.id === song.id ? true : false}
                        />

                        </styleContext.Provider>
                </ul>
            )}
    </div>
    )
}

function Box({song, setSong, currentSong}) {

    const currentSongItem = useRecoilValue(currentSongState)

    const hover = () => {
        setSong(prev => ({...prev, hovering: true}))
    }

    const noHover = () => {
        setSong(prev => ({...prev, hovering: false}))
    };

    const _getLength = () => {
        const mins = Math.floor(song.duration_ms / 60000)
        const secs = ((song.duration_ms % 60000) / 1000).toFixed(0)
        return `${mins}:${secs < 10 ? `0${secs}` : `${secs}`}`
    }


    return (
        <li style={{backgroundColor: currentSong &&
             currentSongItem.playing ? "rgba(255,255,255,.3)": ""}}
        className="song" onMouseEnter={() => hover()}
        onMouseLeave={() => noHover()}>
        
        <Img song={song} setSong={setSong} isCurrentSong={currentSong}/>
        <div className="song-details">
        <SongTitle song={song} isCurrentSong={currentSong}/>
        <div className="grey-details">
            {song.explicit ? <div id="E">E</div> : null}
            <Artists song={song} setSong={setSong} isCurrentSong={currentSong}/>
        </div>
        </div>
        <div id="length">{_getLength()}</div>
        </li>
    )
}

function Artists({song, setSong, isCurrentSong}) {


    const currentSong = useRecoilValue(currentSongState)

    return (
        <div className={isCurrentSong && currentSong.playing ? 
        "playing" : ""}
        id="artists">{song.artists.map((artist, i) => {
            return (
                <span key={crypto.randomUUID()}>
                {i !== song.artists.length - 1 ? <span>
                    <a 
                id={artist.id} key={crypto.randomUUID()}>
                    {artist.name} 
                </a>, </span> : <span>
                    <a 
                id={artist.id} key={crypto.randomUUID()}>{artist.name}</a></span>}</span>
            )
        })}
        
        </div>
    )
}

function Img({song, setSong, isCurrentSong}) {

    const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
    const [pause, setPause] = useRecoilState(pauseState)
    const [audio, setAudio] = useState(new Audio(song.preview_url))
    const audioRef = useRef();

    
    const _handleClick = () => { 
        console.log(audioRef)
        setCurrentSong({...song, playing: !currentSong.playing})

        if (!pause) {
            audioRef.current.play();
        } else audioRef.current.pause();
        setPause(!pause)
    }

    console.log("W")
    console.log(audioRef)


    return (
        <div id={song.id} className="img-container" onClick={() => _handleClick()}>
        <img style={{opacity: song.hovering || (isCurrentSong &&currentSong.playing) ? "0.5" : "1"}}  className="song-img" 
         src={song.album && song.album.images[0].url}></img>
        <div className="play-mini-song">

            <img style={{
                display:
                 (isCurrentSong ? (song.hovering &&
                !currentSong.playing) : song.hovering)
                ? "block" : "none",
                


            }}
             
            src={playIcon}></img>
            
            <img style={{display: isCurrentSong && currentSong.playing ? "block" : "none"}} src={pauseIcon}></img>
            <audio ref={audioRef}  src={song.preview_url}></audio>
        </div>
        

    </div>

    )
}

function SongTitle({song, isCurrentSong}) {

    return (
        <div style={{color: isCurrentSong ? "#1db954" : ""}} className="song-title" >
            {song.name}
        </div>
    )
}






export default FourSongs;