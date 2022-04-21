import { useState, useEffect, useMemo } from "react"
import { useContext } from "react"
import {tokenContext, AlbumsContext, ArtistsContext, SearchContext, topAlbumContext, topArtistContext, topTrackContext, TracksContext} from "../Context"
import hamming from "../extra/hamming"

function Search() {
  
    const {tracks, setTracks} = useContext(TracksContext)
    const {artists, setArtists} = useContext(ArtistsContext)
    const {albums, setAlbums} = useContext(AlbumsContext)
    const {token, setToken} = useContext(tokenContext)
    const {search, setSearch} = useContext(SearchContext)

    const {topTrack, setTopTrack} = useContext(topTrackContext)
    const {topAlbum, setTopAlbum} = useContext(topAlbumContext)
    const {topArtist, setTopArtist} = useContext(topArtistContext)

    // how many items to search for
    let limit = "20";


    useEffect(() => {
        if (!token) return
        searchApi()
        .then(data => data.json())
        .then(res => {
          console.log(res)

          setTopTrack(res.tracks.items[0])
          
          setTopArtist(res.artists.items[0] || res.tracks.items[0].artists[0])
          
          if (res.artists.items.length > 1) {
            if (res.artists.items[0].popularity < res.artists.items[1].popularity) {
              setTopArtist(res.artists.items[1])
            }
          }
          fetchAlbum(res.albums.items[0])
          .then(data => data.json())
          .then(res => setTopAlbum(res))
          
          setAlbums([])
          res.albums.items.map(album => {
            fetchAlbum(album)
            .then(data => data.json())
            .then(res => {
              setAlbums(prev => [...prev, res])
            })
          })
          setTracks([])
          const sorted = res.tracks.items.sort((a, b) => a.popularity - b.popularity)
          setTracks(sorted.reverse())
          res.artists.items.map(artist => {

            setArtists(prev => [...prev, artist])
          })
        })
    }, [search])

    const searchApi = () => {
      return fetch(`https://api.spotify.com/v1/search?q=${search}&type=track%2Cartist%2Calbum%2Cplaylist%2Cshow%2Cepisode&market=US&limit=${limit}`, {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
    }

    const fetchAlbum = (album) => {
      
      return fetch(`https://api.spotify.com/v1/albums/${album.id}`, {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
    }

    return (
      <div>
        <input onChange={e => setSearch(e.target.value)} className="searchbar-input" placeholder="Artists, songs or podcasts"></input>
      </div>
    )
}


export default Search;