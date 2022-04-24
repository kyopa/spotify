import { createContext } from "react"


const SearchContext = createContext();

const TracksContext = createContext();
const AlbumsContext = createContext();
const ArtistsContext = createContext();
const topTrackContext = createContext();
const topAlbumContext = createContext();
const topArtistContext = createContext(); 
const tokenContext = createContext();
const styleContext = createContext();
const topResultContext = createContext();
const relatedArtistsContext = createContext();
const currentSongContext = createContext();

export {
    SearchContext, 
    TracksContext,
    AlbumsContext,
    ArtistsContext,
    topTrackContext,
    topAlbumContext,
    topArtistContext,
    tokenContext,
    styleContext,
    topResultContext,
    relatedArtistsContext,
    currentSongContext
}