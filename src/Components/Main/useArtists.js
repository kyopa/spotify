import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { searchState, tokenState, topResultState } from "../../recoil/atoms";
import {
  fetchArtistsBySearch,
  fetchRelatedArtists,
} from "../../recoil/selectors";

const useArtists = () => {
  const [arr, setArr] = useState([]);
  const token = useRecoilValue(tokenState);
  const topResult = useRecoilValue(topResultState);
  const search = useRecoilValue(searchState);

  const artists = useMemo(async () => {
    if (!topResult) return;
    let artist;
    if (topResult.type === "artist") {
      artist = topResult;
    } else artist = topResult.artists[0];
    const res = await fetchRelatedArtists(artist, token);
    const data = await res.json();
    const relatedArtists = data.artists
      .sort((a, b) => a.popularity - b.popularity)
      .reverse();
    const resX = await fetchArtistsBySearch(search, token);
    const dataX = await resX.json();
    console.log(dataX);
    setArr([
      artist,
      ...relatedArtists.slice(0, 3),
      ...dataX.artists.items.slice(1),
    ]);
  }, [topResult]);
  return arr;
};

export default useArtists;
