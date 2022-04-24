import { unhover } from "@testing-library/user-event/dist/hover";
import { prev } from "cheerio/lib/api/traversing";
import { prevElementSibling } from "domutils";
import { useContext, useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";
import { tokenContext, TracksContext, styleContext, currentSongContext } from "../../Context";
import playIcon from "../../extra/playicon.png";
import pause from "../../extra/pause.png";


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
                        <Song song={song} four={four}/>
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

                        <Box song={song} setSong={setSong}/>

                        </styleContext.Provider>
                </ul>
            )}
    </div>
    )
}

function Box({song, setSong}) {

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
        <li 
        className="song" onMouseEnter={() => hover()}
        onMouseLeave={() => noHover()}>
        
        <Img song={song} setSong={setSong}/>
        <div className="song-details">
        <SongTitle song={song}/>
        <div className="grey-details">
            {song.explicit ? <div id="E">E</div> : null}
            <Artists song={song} setSong={setSong}/>
        </div>
        </div>
        <div id="length">{_getLength()}</div>
        </li>
    )
}

function Artists({song, setSong}) {


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

function Img({song, setSong}) {

    const {currentSong, setCurrentSong} = useContext(currentSongContext)

    const _playSong = () => {
        setCurrentSong(song)
        setSong(prev => ({...prev, playing: !song.playing}))
    }

    
    return (
        <div id={song.id} className="img-container" onClick={() => _playSong()}>
        <img style={{opacity: song.hovering || song.playing ? "0.5" : "1"}}  className="song-img" 
         src={song.album && song.album.images[0].url}></img>
        <div className="play-mini-song">

            <img style={{display: song.hovering && !song.playing ? "block" : "none"}} src={playIcon}></img>
            <img style={{display: song.playing ? "block" : "none"}} src={pause}></img>
        </div>
       {song.shitter ? <h1>HYELLO</h1> : null}
    </div>

    )
}

function SongTitle({song}) {


    return (
        <div className="song-title">
            {song.name}
        </div>
    )
}






export default FourSongs;