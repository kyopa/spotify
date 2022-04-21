import { useContext } from "react";
import { AlbumsContext } from "../../Context";
import useArtists from "./useArtists";




function useAlbums() {


    const {albums} = useContext(AlbumsContext)


    const eightAlbums = albums.slice(0, 8).sort((a, b) => a.popularity - b.popularity)
    console.log(eightAlbums)

    return [eightAlbums.reverse()]
}

export default useAlbums;