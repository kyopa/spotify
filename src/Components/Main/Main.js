import { Suspense, useContext, useMemo } from "react";
import Section from "../Section";
import TopResult from "./TopResult";
import "../../styles.css";
import { useRecoilValue } from "recoil";
import { ArtistState, searchState, topResultState } from "../../recoil/atoms";
import { itemsState } from "../../recoil/selectors";
import useArtists from "./useArtists";
import Top from "../Top/Top";
import RecentSearches from "./RecentSearches";

function Main() {
  const search = useRecoilValue(searchState);
  console.log("RUNNING");

  return (
    <div className="main-spacing">
      <Top />
      <Suspense fallback={<h1>hello</h1>}>
        {search !== "" ? <SearchResults /> : <RecentSearches />}
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
          <Section fromSearchpage array={artists} title="Artists" type="artists" />
          <Section fromSearchpage array={albums} title={"Albums"} type="albums" album />
        </Suspense>
      </div>
    </div>
  );
}

export default Main;
