import { Suspense, useContext, useMemo } from "react";
import Section from "./Section";
import TopResult from "./TopResult";
import "../../styles.css";
import { useRecoilValue } from "recoil";
import { ArtistState, searchState, topResultState } from "../../recoil/atoms";
import { itemsState } from "../../recoil/selectors";
import useArtists from "./useArtists";
import Top from "../Top/Top";

function Main() {
  const search = useRecoilValue(searchState);
  console.log("RUNNING");

  return (
    <div className="main-spacing">
      <Top />
      <Suspense fallback={<h1>hello</h1>}>
        {search !== "" ? <SearchResults /> : <h1>Recent Searches</h1>}
      </Suspense>
    </div>
  );
}

function SearchResults() {
  const albums = useRecoilValue(itemsState("albums"));
  const artists = useArtists();
  console.log(artists);

  return (
    <div className="searchpage">
      <div className="search-results">
        <Suspense fallback={<h1>loading</h1>}>
          <TopResult />
          <Section array={artists} title="Artists" type="artists"/>
          <Section array={albums} title={"Albums"} type="albums" album  />
        </Suspense>
      </div>
    </div>
  );
}

export default Main;
