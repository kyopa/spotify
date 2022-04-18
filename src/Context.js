import { createContext } from "react"


const SearchContext = createContext();

const TracksContext = createContext();
const AlbumsContext = createContext();
const ArtistsContext = createContext();
const topTrackContext = createContext();
const topAlbumContext = createContext();
const topArtistContext = createContext(); 

export {
    SearchContext, 
    TracksContext,
    AlbumsContext,
    ArtistsContext,
    topTrackContext,
    topAlbumContext,
    topArtistContext
}