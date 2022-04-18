import { useState, useEffect, useMemo } from "react"
import { useContext } from "react"
import {AlbumsContext, ArtistsContext, SearchContext, topAlbumContext, topArtistContext, topTrackContext, TracksContext} from "../Context"


function Search() {


  
  
  
  
    const client_id = "de8735e4e92a4bbe8bb99948f6dfbb1d"
    const client_secret = "7a1e27603bd84785a7d5b3465a5cbfe1"
  
    const {tracks, setTracks} = useContext(TracksContext)
    const {artists, setArtists} = useContext(ArtistsContext)
    const {albums, setAlbums} = useContext(AlbumsContext)
    const [token, setToken] = useState()
    const {search, setSearch} = useContext(SearchContext)

    const {topTrack, setTopTrack} = useContext(topTrackContext)
    const {topAlbum, setTopAlbum} = useContext(topAlbumContext)
    const {topArtist, setTopArtist} = useContext(topArtistContext)

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

    // how many items to search for
    let limit = "20";

    useEffect(() => {
        if (!token) return
        searchApi()
        .then(data => data.json())
        .then(res => {
          

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
          console.log(setTopAlbum)
          res.albums.items.map(album => {
            fetchAlbum(album)
            .then(data => data.json())
            .then(res => {
              setAlbums(prev => [...prev, res])
            })
          })
          res.tracks.items.map(track => {
            setTracks(prev => [...prev, track])
          })
          res.artists.items.map(artist => {

            setArtists(prev => [...prev, artist])
          })
        })
    }, [search])

    const searchApi = () => {
      return fetch(`https://api.spotify.com/v1/search?q=${search}&type=track%2Cartist%2Calbum%2Cplaylist%2Cshow%2Cepisode&limit=${limit}`, {
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
    
    const topResult = useMemo(() => {
      if (topTrack === undefined || topArtist === undefined || topAlbum === undefined) return;
      if (!topArtist.popularity) topArtist.popularity = topTrack.popularity - 1;
      
      const array = [topTrack, topArtist, topAlbum]

      // If a track is featuring the artist and is more popular
      // show the artist rather than the track
      const featuring = topTrack.artists.slice(1)
      if (featuring.some(artist => artist.name === topArtist.name)) {
        return topArtist
      } else {
        return array.sort((a, b) => a.popularity - b.popularity)[array.length - 1]
      }
    }, [albums, tracks, artists])
    
    

    return (
      <div>
        <input onChange={e => setSearch(e.target.value)} className="searchbar-input" placeholder="Artists, songs or podcasts"></input>

        <div>
          {topResult && <div>
            {topResult.name}
            </div>}
        </div>
      </div>
    )
}


export default Search;