import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ArtistState, tokenState } from "../../recoil/atoms";
import {
  artistItemsState,
  fetchArtistAlbums,
  fetchArtistSingles,
} from "../../recoil/selectors";
import { removeDuplicates } from "../AlbumPage/Album";
import { Item } from "../Row";
import Top from "../Top/Top";
import { sortAlbumsSingles } from "./MiniDisco";
import OutsideClickHandler from "react-outside-click-handler";
import menuDownIcon from "../../extra/menu-down.svg";
import menuUpIcon from "../../extra/menu-up.svg";

function Discography() {
  const id = useParams().id;
  const token = useRecoilValue(tokenState);
  const [selected, setSelected] = useState("All");
  const [albums, setAlbums] = useState([]);
  const [singles, setSingles] = useState([]);
  const [artist, setArtist] = useState();
  const artistSingles = useRecoilValue(artistItemsState("singles"));
  const artistAlbums = useRecoilValue(artistItemsState("albums"));
  console.log(artistAlbums);
  const sorted = sortAlbumsSingles([
    ...artistSingles.items,
    ...artistAlbums.items,
  ]);
  const [onDisplay, setOnDisplay] = useState(removeDuplicates(sorted));

  useEffect(() => {
    if (!id) return;
    fetchArtist(id, token)
      .then((res) => res.json())
      .then((data) => setArtist(data));
    return () => setArtist([]);
  }, [id]);

  useEffect(() => {
    switch (selected) {
      case "All":
        if (!sorted) return;
        setOnDisplay(removeDuplicates(sorted));
        break;
      case "Albums":
        setOnDisplay(
          removeDuplicates(
            artistAlbums.items.filter((album) => album.album_type === "album")
          )
        );
        break;
      case "Singles and EPs":
        setOnDisplay(removeDuplicates(artistSingles.items));
        break;
      default:
        console.log("lol");
    }
  }, [selected]);

  return (
    <div className="main-spacing">
      <Top hideSearchBar />
      <div className="headerdisco">
        <h2>{artist?.name}</h2>
        <DropDown selected={selected} setSelected={setSelected} id={id} />
      </div>

      <div className="item-row items">
        {onDisplay &&
          onDisplay.map((item) => {
            return <Item item={item} album />;
          })}
      </div>
    </div>
  );
}

function DropDown({ selected, setSelected }) {
  const [display, setDisplay] = useState(false);

  const handleClick = (e) => {
    if (!e) return;
    setDisplay(!display);
    setSelected(e.target.innerText);
  };

  return (
    <div className="select-display-type">
      <OutsideClickHandler onOutsideClick={() => setDisplay(false)}>
        <div onClick={() => setDisplay(!display)} className="select">
          <span>{selected}</span>
          <img src={display ? menuUpIcon : menuDownIcon}></img>
        </div>
        {display && (
          <ul className="dropdown" onClick={(e) => handleClick(e)}>
            <li id="all">All</li>
            <li id="album">Albums</li>
            <li id="singles">Singles and EPs</li>
          </ul>
        )}
      </OutsideClickHandler>
    </div>
  );
}

export const fetchArtist = (id, token) => {
  return fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export default Discography;
