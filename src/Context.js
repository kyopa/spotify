import { createContext } from "react"


const SearchContext = createContext();

const TracksContext = createContext();
const AlbumsContext = createContext();
const ArtistsContext = createContext();
const topTrackContext = createContext();
const topAlbumContext = createContext();
const topArtistContext = createContext(); 
const tokenContext = createContext();
const songContext = createContext();
const styleContext = createContext();

export {
    SearchContext, 
    TracksContext,
    AlbumsContext,
    ArtistsContext,
    topTrackContext,
    topAlbumContext,
    topArtistContext,
    tokenContext,
    songContext,
    styleContext
}