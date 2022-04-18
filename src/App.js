import { useEffect, useState, useContext } from "react";
import Search from "./Components/Search.js"
import Searchbar from "./Components/Searchbar"
import Top from "./Components/Top.js";
import Main from "./Components/Main.js";
import {
  SearchContext,
  AlbumsContext,
  TracksContext,
  ArtistsContext,
  topAlbumContext,
  topTrackContext,
  topArtistContext
} from "./Context.js";

function App() {

  const [search, setSearch] = useState("drake")
  const [tracks, setTracks] = useState([])
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])
  const [topTrack, setTopTrack] = useState()
  const [topAlbum, setTopAlbum] = useState()
  const [topArtist, setTopArtist] = useState()
  
  
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
        
        <div className="topbar">
          <Top />
        </div>
        <div className="content-spacing">
        <Main />
        </div>
        </topTrackContext.Provider>
        </topArtistContext.Provider>
        </topAlbumContext.Provider>
        </ArtistsContext.Provider>
        </AlbumsContext.Provider>
        </TracksContext.Provider>
        </SearchContext.Provider>
      </div>
      
      <div className="music-player">
        music player
      </div>
    </div>
  )
}



export default App;
