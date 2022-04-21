import { unhover } from "@testing-library/user-event/dist/hover";
import { prev } from "cheerio/lib/api/traversing";
import { prevElementSibling } from "domutils";
import { useContext, useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";
import { tokenContext, TracksContext, songContext, styleContext } from "../../Context";
import playIcon from "../../extra/playicon.png";


function FourSongs() {

    const {tracks, setTracks} = useContext(TracksContext)
    
    const four = useMemo(() => {
        return [tracks[0], tracks[1], tracks[2], tracks[3]]
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
    const [song, setSong] = useState()
    const [style, setStyle] = useState({})
    const {token, setToken} = useContext(tokenContext)

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

            setSong({...res, artists: artists})
        })
    }, [])


    return (
        <div>
            {song && (
                <ul className="songs">
                    <songContext.Provider value={{song, setSong}}>
                    <styleContext.Provider value={{style, setStyle}}>

                        <Box />

                        </styleContext.Provider>
                        </songContext.Provider>
                </ul>
            )}
    </div>
    )
}

function Box() {
    const {style, setStyle} = useContext(styleContext)
    const {song, setSong} = useContext(songContext)

    const hover = () => {
        setSong(prev => ({...prev, hovering: true}))
    }

    const hoverStyle = {
        box: {
            backgroundColor: "rgba(255,255,255,.1)",
            borderRadius: "4px",
        },
        img: {
           opacity: .5,
           zIndex: "-1"
        },
        artists: {
            color: "#fff"
        }
    }

    const noHover = () => {
        setSong(prev => ({...prev, hovering: false}))
    };

    return (
        <li 
        className="song" onMouseEnter={() => hover()} 
        onMouseLeave={() => noHover()}>
        
        <Img/>
        <div className="song-details">
        <SongTitle />
        <div className="grey-details">
            {song.explicit ? <div id="E">E</div> : null}
            <Artists />
        </div>
        </div>
        <div id="length">4:17</div>
        </li>
    )
}

function Artists() {
    const {song, setSong} = useContext(songContext)

    return (
        <div 
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

function Img() {
    const {song, setSong} = useContext(songContext);

    const playSong = () => {
        setSong(prev => ({...prev, playing: true}))
        alert("play song")
    }

    return (
        <div className="img-container" onClick={() => playSong()}>
        <img style={{opacity: song.hovering  ? "0.5" : "1"}}  className="song-img" src={song.album && song.album.images[0].url}></img>
        <div className="play-mini-song">
            <img style={{display: song.hovering  ? "block" : "none"}} src={playIcon}></img>
            </div>
    </div>
    )
}

function SongTitle() {
    const {song} = useContext(songContext)

    return (
        <div className="song-title">
            {song.name}
        </div>
    )
}




export default FourSongs;