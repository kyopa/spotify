import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { relatedArtistsState, searchState, tokenState, topResultState } from "../../atoms";

// THIS WILL RETURN AN ARRAY WITH
// THE ARTIST
// 3 RELATED ARTIST
// 4 ARTISTS THAT HAVE A SIMILAR NAME AS THE ARTIST

function useArtists() {


    const [artist, setArtist] = useState();
    const topResult = useRecoilValue(topResultState)
    const token = useRecoilValue(tokenState)
    const search = useRecoilValue(searchState)
    const [relatedArtists, setRelatedArtists] = useRecoilState(relatedArtistsState)


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

    return [relatedArtists]
}





export default useArtists;