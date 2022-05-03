import { Suspense, useContext, useMemo } from "react";
import FourSongs from "./FourSongs";
import Section from "./Section";
import ThirdRow from "./useAlbums";
import TopResult from "./TopResult";
import useAlbums from "./useAlbums";
import hamming from "../../hamming";
import "../../styles.css";
import { artistsArrState } from "../../recoil/selectors";
import { useRecoilValue } from "recoil";
import { searchState, topResultState } from "../../recoil/atoms";
import { itemsState } from "../../recoil/selectors";

function Main() {
  return (
    <div className="main-spacing">
      <Suspense fallback={<h1>hello</h1>}>
        <SearchPage />
      </Suspense>
    </div>
  );
}

function SearchPage() {
  const albums = useRecoilValue(itemsState("albums"));
  const artists = useRecoilValue(artistsArrState);
  console.log(artists)

  return (
    <div className="searchpage">
      <div className="search-results">
        <Suspense fallback={<h1>loading</h1>}>
          <TopResult />
        </Suspense>
        <Section array={artists} title={"Artists"} />
        <Section array={albums} title={"Albums"} album />
      </div>
    </div>
  );
}

export default Main;
