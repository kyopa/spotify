import { useContext } from "react";
import { albumsState } from "../../atoms";
import { AlbumsContext } from "../../Context";
import useArtists from "./useArtists";


function useAlbums() {
    const albums = useRecoilValue(albumsState)
    const eightAlbums = albums.slice(0, 8).sort((a, b) => a.popularity - b.popularity)

    return [eightAlbums.reverse()]
}

export default useAlbums;