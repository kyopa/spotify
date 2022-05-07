import { useRecoilValue } from "recoil";
import { artistItemsState } from "../../recoil/selectors";
import { useState } from "react";
import Row from "../Main/Row";
import { removeDuplicates } from "../AlbumPage/Album";
import { remove } from "cheerio/lib/api/manipulation";

function Discography() {
  const artistAlbums = useRecoilValue(artistItemsState("albums")).items;
  const artistSingles = useRecoilValue(artistItemsState("singles")).items;
  const albums = artistAlbums.filter((album) => album.album_type === "album");

  //sorted by release date and remove spam items
  const arr = [...artistSingles, ...artistAlbums];
  const sorted = arr
    .slice()
    .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
    .reverse()
    .filter(
      (album) =>
        album.album_type !== "compilation" && album.album_group !== "appears_on"
    );

  const [onDisplay, setOnDisplay] = useState(removeDuplicates(sorted));
  const [active, setActive] = useState("latest");

  return (
    <div className="disco-container">
      <h2>Discography</h2>

      <div className="options">
        <button
          onClick={() => {
            setOnDisplay(removeDuplicates(sorted));
            setActive("latest");
          }}
          className={active === "latest" ? "active" : "idle"}
        >
          Latest
        </button>
        <button
          className={active === "albums" ? "active" : "idle"}
          onClick={() => {
            setOnDisplay(removeDuplicates(albums));
            setActive("albums");
          }}
        >
          Albums
        </button>
        <button
          className={active === "singles" ? "active" : "idle"}
          onClick={() => {
            setOnDisplay(removeDuplicates(artistSingles));
            setActive("singles");
          }}
        >
          Singles and EPs
        </button>
      </div>

      <div className="display">
        <Row array={onDisplay} album />
      </div>
    </div>
  );
}

export default Discography;
