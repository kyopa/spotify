import { albumsState, searchState, tokenState } from "../../recoil/atoms";
import useArtists from "./useArtists";
import { useRecoilValue } from "recoil";
import { useContext } from "react";
import { itemsState } from "../../recoil/selectors";

function useAlbums() {
  const albumsData = useRecoilValue(itemsState("albums"));
  if (!albumsData) return;
  return albumsData.slice(0, 8)
}

export default useAlbums;
