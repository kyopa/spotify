import { prev } from "cheerio/lib/api/traversing";
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
            console.log(artists)
            setSong({...res, artists: artists})
        })
    }, [])

    // next: set playbutton for song

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
        setStyle({
            box: {
                backgroundColor: "rgba(255,255,255,.1)",
                borderRadius: "4px"
            },
            img: {
               opacity: .5,
               backgroundImage: `url(${playIcon})`
            },
            artists: {
                color: "#fff"
            }
        })
    }

    const noHover = () => setStyle({});

    return (
        <li style={style.box} className="song" onMouseEnter={() => hover()} onMouseLeave={() => noHover()}>
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
    const {style, setStyle} = useContext(styleContext)

    const artistHover = (e) => {
        const artists = song.artists.map(artist => {
            return artist.id === e.target.id ? {...artist, hovering: true}
            : 
            {...artist, hovering: false}
        })
        setSong(prev => ({...prev, artists: artists})) 
    }

    const artistObj = {
        hoverStyle: {
            textDecoration: "underline",
            cursor: "pointer"
        },
        noHoverStyle: {
            textDecoration: "none",
            cursor: "default"
        }
    }

    return (
        <div style={style.artists} id="artists">{song.artists.map((artist, i) => {
            console.log(artist)
            return (
                <a onMouseEnter={e => artistHover(e)}
                style={artist.hovering ? artistObj.hoverStyle : artistObj.noHoverStyle}
                id={artist.id} >
                {i !== song.artists.length - 1 ? `${artist.name}, ` : artist.name}</a>
            )
        })}</div>
    )
}

function Img() {
    const {song} = useContext(songContext);
    const {style} = useContext(styleContext)

    return (
        <div className="img-container">
        <img style={style.img}  className="song-img" src={song.album.images[0].url}></img>
    </div>
    )
}

function SongTitle() {
    const {song} = useContext(songContext)

    return (
        <div>
            {song.name}
        </div>
    )
}




export default FourSongs;