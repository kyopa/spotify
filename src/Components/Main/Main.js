import { Suspense, useContext, useMemo } from "react";
import FourSongs from "./FourSongs";
import Section from "./Section";
import TopResult from "./TopResult";
import hamming from "../../hamming";
import "../../styles.css";
import { artistItemsState } from "../../recoil/selectors";
import { useRecoilValue } from "recoil";
import { ArtistState, searchState, topResultState } from "../../recoil/atoms";
import { itemsState } from "../../recoil/selectors";
import useArtists from "./useArtists";

function Main() {
  const search = useRecoilValue(searchState);

  return (
    <div className="main-spacing">
      <Suspense fallback={<h1>hello</h1>}>
        {search !== "" ? <SearchResults /> : <h1>Recent Searches</h1>}
      </Suspense>
    </div>
  );
}

function SearchResults() {
  const albums = useRecoilValue(itemsState("albums"));
  const artists = useArtists();
  console.log(artists)


  return (
    <div className="searchpage">
      <div className="search-results">
        <Suspense fallback={<h1>loading</h1>}>
          <TopResult />
          {artists ? <Section array={artists} title="Artists" /> : null}
          {albums ? <Section array={albums} title={"Albums"} album /> : <h3>no results found</h3>}
        </Suspense>
      </div>
    </div>
  );
}

export default Main;
