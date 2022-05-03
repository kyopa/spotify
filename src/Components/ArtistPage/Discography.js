import { useRecoilValue } from "recoil";
import { artistItemsState } from "../../recoil/selectors";
import { useState } from "react";
import Row from "../Main/Row";

function Discography() {
  const artistAlbums = useRecoilValue(artistItemsState("albums")).items;
  const artistSingles = useRecoilValue(artistItemsState("singles")).items;
  let albums = artistAlbums.filter(
    (album) => album.album_type === "album"
  );
  const sorted = artistAlbums
    .slice()
    .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
    .reverse();
  const [onDisplay, setOnDisplay] = useState();
    

  

  return (
    <div className="disco-container">
      <h2>Discography</h2>

      <div className="options">
        <button  onClick={() => setOnDisplay(sorted)}>Latest</button>
        <button onClick={() => setOnDisplay(albums)}>Albums</button>
        <button onClick={() => setOnDisplay(artistSingles)}>
          Singles and EPs
        </button>
      </div>

      <div className="display">
        <Row array={onDisplay} />
      </div>
    </div>
  );
}

export default Discography;
