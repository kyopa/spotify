import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilStoreID, useRecoilValue, useSetRecoilState } from "recoil";
import { recentSearchesState, searchState, topResultState } from "../../recoil/atoms";
import hamming from "../../hamming";
import { itemsState } from "../../recoil/selectors";
import FourSongs from "./FourSongs";
import { Link } from "react-router-dom";
import GreenPlayButton from "../greenPlayButton/x";
import blackIcon from "../../extra/blackImage.webp";

function TopResult() {
  const tracks = useRecoilValue(itemsState("tracks"));
  const albums = useRecoilValue(itemsState("albums"));
  const artists = useRecoilValue(itemsState("artists"));
  const search = useRecoilValue(searchState);
  const [topResult, setTopResult] = useRecoilState(topResultState);
  const [img, setImg] = useState();
  const setRecentSearches = useSetRecoilState(recentSearchesState)

  useEffect(() => {
    if (!artists || !tracks || !albums) return;

    setTopResult(hamming(artists[0], tracks[0], albums[0], search));
  }, [tracks, artists, albums]);

  useEffect(() => {
    console.log(topResult);
    if (!topResult) return setImg(blackIcon);
    if (topResult.type === "artist") {
      console.log(topResult);
      return topResult.images.length !== 0
        ? setImg(topResult.images[0].url)
        : setImg(blackIcon);
    }
    if (topResult.type === "album") {
      console.log(topResult.images);
      return topResult.images.length !== 0
        ? setImg(topResult.images[0].url)
        : setImg(blackIcon);
    }
    if (topResult.type === "track") {
      console.log(topResult.album.images);
      return topResult.album.images.length !== 0
        ? setImg(topResult.album.images[0].url)
        : setImg(blackIcon);
    }
  }, [topResult]);
  console.log(topResult);

  const addToRecent = () => {
    
  }

  return (
    <div>
      {topResult && topResult.name !== "" && (
        <div className="top-result-grid">
          <div className="top-result">
            <h2>Top Result</h2>
            <div className="top-result-box">
              {topResult && (
                <Link onClick={() => setRecentSearches(prev => [...prev, topResult])}
                  to={`/${topResult.type === "artist" ? "artist" : "album"}/${
                    topResult.id
                  }`}
                >
                  <div className="container">
                    <img id={topResult.type} src={img}></img>
                    <div id="name">
                      {topResult && <div>{topResult.name}</div>}
                    </div>

                    <div className="details">
                      {topResult.explicit ? (
                        <div className="explicit-symbol">E</div>
                      ) : null}
                      <a className="artist" href="">
                        {topResult.artists && topResult.artists.length > 1 ? (
                          topResult.artists
                            .map((artist) => artist.name)
                            .join(", ")
                        ) : (
                          <div>
                            {topResult.artists && topResult.artists[0].name}
                          </div>
                        )}
                      </a>
                      <div className="type">{topResult.type}</div>
                    </div>
                    <GreenPlayButton
                      artist={
                        topResult.type === "artist"
                          ? topResult
                          : topResult.artists[0]
                      }
                      type={topResult.type}
                      id={topResult.id}
                      animate
                      right="2px"
                      position="absolute"
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>

          <div className="top-result-songs">
            <FourSongs />
          </div>
        </div>
      )}
      {topResult && topResult.name === "" && (
        <div id="noresults">
          <h3>No results found for "{search}"</h3>
          <p>
            Please make sure your words are spelled correctly or use less or
            different keywords
          </p>
        </div>
      )}
    </div>
  );
}

export default TopResult;
