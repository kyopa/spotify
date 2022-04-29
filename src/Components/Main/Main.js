import { Suspense, useContext, useMemo } from "react";
import FourSongs from "./FourSongs";
import useArtists from "./useArtists";
import SecondRow from "./useArtists";
import Section from "./Section";
import ThirdRow from "./useAlbums";
import TopResult from "./TopResult";
import useAlbums from "./useAlbums";
import hamming from "../../hamming";

function Main() {
  return (
    <div>
      <Suspense fallback={<h1>hello</h1>}>
      <SearchPage />
      </Suspense>
    </div>
  );
}

function SearchPage() {

  const artists = useArtists();
  const albums = useAlbums();
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
