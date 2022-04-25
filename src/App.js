import { useEffect, useState, useContext, useReducer } from "react";
import Search from "./Components/Search.js"
import Searchbar from "./Components/Top/Searchbar"
import Top from "./Components/Top/Top.js";
import Main from "./Components/Main/Main.js";
import {
  SearchContext,
  AlbumsContext,
  TracksContext,
  ArtistsContext,
  topAlbumContext,
  topTrackContext,
  topArtistContext,
  tokenContext,
  topResultContext,
  relatedArtistsContext,
  currentSongContext,
  songContext
} from "./Context.js";
import Player from "./Components/Player.js/Player.js";


function App() {


  const client_id = "de8735e4e92a4bbe8bb99948f6dfbb1d"
  const client_secret = "7a1e27603bd84785a7d5b3465a5cbfe1"


  const [search, setSearch] = useState("drake")
  const [tracks, setTracks] = useState([])
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])
  const [topTrack, setTopTrack] = useState()
  const [topAlbum, setTopAlbum] = useState()
  const [topArtist, setTopArtist] = useState()
  const [token, setToken] = useState();
  const [topResult, setTopResult] = useState();
  const [relatedArtists, setRelatedArtists] = useState();

  



  const getToken = () => {
    return fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
          "Authorization": `Basic ` + window.btoa(`${client_id}:${client_secret}`),
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
  }
  useEffect(() => {
    getToken()
    .then(data => data.json())
    .then(res => {
      setToken(res.access_token)
    })
  },[])
  
  
  return (
    <div className="app">

       
      <div className="sidebar">
        sidebar

      </div>

      <div className="main">
        <SearchContext.Provider value={{search, setSearch}}>
        <TracksContext.Provider value={{tracks, setTracks}}>
        <AlbumsContext.Provider value={{albums, setAlbums}}>
        <ArtistsContext.Provider value={{artists, setArtists}}>
        <topAlbumContext.Provider value={{topAlbum, setTopAlbum}}>
        <topArtistContext.Provider value={{topArtist, setTopArtist}}>
        <topTrackContext.Provider value={{topTrack, setTopTrack}}>
        <tokenContext.Provider value={{token, setToken}}>
        <topResultContext.Provider value={{topResult, setTopResult}}>
        <relatedArtistsContext.Provider value={{relatedArtists, setRelatedArtists}}>

        <div className="topbar">
          <Top />
        </div>
        <div className="content-spacing">
          <Main />
        </div>
        
        </relatedArtistsContext.Provider>
        </topResultContext.Provider>
        </tokenContext.Provider>
        </topTrackContext.Provider>
        </topArtistContext.Provider>
        </topAlbumContext.Provider>
        </ArtistsContext.Provider>
        </AlbumsContext.Provider>
        </TracksContext.Provider>
        </SearchContext.Provider>
      </div>
      
      <div className="music-player player">
        <Player />
      </div>

      
    </div>

    
  )
}



export default App;
