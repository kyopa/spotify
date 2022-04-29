import { useCallback, useContext, useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilStoreID, useRecoilValue } from "recoil";
import {
  searchState,
  topAlbumState,
  topArtistState,
  topResultState,
  topTrackState,
} from "../../recoil/atoms";
import hamming from "../../hamming";
import { itemsState, topState } from "../../recoil/selectors";
import FourSongs from "./FourSongs";

function TopResult() {
  const tracks = useRecoilValue(itemsState("tracks"));
  const albums = useRecoilValue(itemsState("albums"));
  const artists = useRecoilValue(itemsState("artists"));
  const search = useRecoilValue(searchState);
  const [topResult, setTopResult] = useRecoilState(topResultState)

  useEffect(() => {
    if (!artists || !tracks || !albums) return
    console.log(artists)
    console.log(tracks)
    console.log(albums)

    setTopResult(
      hamming(
        artists[0],
        tracks[0],
        albums[0],
        search
      )
    );
  }, [tracks, artists, albums]);

  return (
    <div className="top-result-grid">
      <div className="top-result">
        <h2>Top Result</h2>
        <div className="top-result-box">
          {topResult && (
            <div className="container">
              {topResult && !topResult.images ? (
                <img src={topResult.album.images[0].url}></img>
              ) : (
                <img src={topResult && topResult.images[0].url}></img>
              )}
              <div id="name">{topResult && <div>{topResult.name}</div>}</div>

              <div className="details">
                {topResult.explicit ? (
                  <div className="explicit-symbol">E</div>
                ) : null}
                <a className="artist" href="">
                  {topResult.artists && topResult.artists.length > 1 ? (
                    topResult.artists.map((artist) => artist.name).join(", ")
                  ) : (
                    <div>{topResult.artists && topResult.artists[0].name}</div>
                  )}
                </a>
                <div className="type">{topResult.type}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="top-result-songs">
        <FourSongs />
      </div>
    </div>
  );
}

export default TopResult;
