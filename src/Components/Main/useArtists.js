import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { relatedArtistsContext, SearchContext, tokenContext, topResultContext } from "../../Context";


// useArtists
function useArtists() {

    const {topResult} = useContext(topResultContext)
    const {token} = useContext(tokenContext)
    const [artist, setArtist] = useState();
    const {search} = useContext(SearchContext)
    
    const {relatedArtists, setRelatedArtists} = useContext(relatedArtistsContext)
        
    function fetchRelatedArtists(artist) {
        return fetch(`https://api.spotify.com/v1/artists/${artist.id}/related-artists`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        )
    }
    
    function fetchArtistsBySearch(artist) {
        return fetch(`https://api.spotify.com/v1/search?q=${search}&type=artist&limit=40`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        )
    }

    function fetchArtist(artist) {
        
        return fetch(`https://api.spotify.com/v1/artists/${artist.id}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
    }

    useEffect(() => {
        if (!topResult) return
        

        if (topResult.type === "artist") {
            setArtist(topResult)
        } else setArtist(topResult.artists[0])

        if (!artist) return
        fetchRelatedArtists(artist)
        .then(data => data.json())
        .then(res => {
            const arr = res.artists.sort((a, b) => a.popularity - b.popularity)
            const threeArtists = arr.slice(arr.length - 3)
            fetchArtistsBySearch(artist)
            .then(data => data.json())
            .then(res => {
                setArtist(res.artists.items[0])
                const fourArtists = res.artists.items.slice(1, 5)
                setRelatedArtists([])
                setRelatedArtists([artist, ...threeArtists, ...fourArtists])
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

    }, [topResult])


    // Return related artists array

    return [relatedArtists]
}


/*
function Artists() {

    const {relatedArtists} = useContext(relatedArtistsContext)


    return (
        <div className="artists-container">
            <div className="artists-see-all">
                <h2>Artists</h2>
                <a href="yo" id="see-all">See all</a>
                </div>
            <div className="artists-row">
               
                {relatedArtists && (
                    relatedArtists.length > 1 ? relatedArtists.map(artist => {
                        return (
                            <Artist artist={artist}/>
                        )
                    }) :  <Artist artist={relatedArtists}/>
                )}
            </div>
        </div>
    )
}


/*
function Artist(props) {

    const artist = props.artist

    const [img, setImg] = useState();
    const {relatedArtists} = useContext(relatedArtistsContext)
    

    useEffect(() => {
        if (!artist) return

        if(artist.images === undefined || artist.images.length === 0) {
            setImg(blackImg)
        } else setImg(artist.images[0].url)

    })

    return (
        <div >
            <img src={img} className="artist-img"></img>
            <div className="artist-name">{artist.name}</div>
            <div className="type">Artist</div>
        </div>
    )
}
*/





export default useArtists;