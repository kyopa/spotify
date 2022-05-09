import { useEffect, useState, useRef } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import fetchSong from "../../fetchSong";
import {
  contextMenuAtoms,
  displayContextMenuState,
  selectedItemState,
  tokenState,
  urgentSongsState,
} from "../../recoil/atoms";
import { fetchAlbumTracks } from "../../recoil/selectors";
import "./x.css";

function ContextMenu() {
  const setUrgentSongs = useSetRecoilState(urgentSongsState);
  const token = useRecoilValue(tokenState);
  const WIDTH = 186;
  const HEIGHT = 40;
  const x = useRecoilValue(contextMenuAtoms("x"));
  const y = useRecoilValue(contextMenuAtoms("y"));
  const [display, setDisplay] = useRecoilState(displayContextMenuState);
  const selectedItem = useRecoilValue(selectedItemState);

  const fetchLoad = async () => {
    console.log(selectedItem);
    switch (selectedItem.type) {
      case "album":
        const res = await fetchAlbumTracks(selectedItem.id, token);
        const data = await res.json();
        return data.items;
      case "song":
        const resX = await fetchSong(selectedItem.id, token);
        const dataX = await resX.json();
        return [dataX];
      default:
        console.log("lol");
    }
  };

  const handleQue = async (e) => {
    e.preventDefault();
    let load = await fetchLoad();
    setUrgentSongs((prev) => [...prev, ...load]);
    setDisplay(false);
  };
  return (
    <div>
      {display && (
        <div
          className="contextmenu"
          style={{
            width: `${WIDTH}px`,
            height: `${HEIGHT}px`,
            position: "fixed",
            left: `${x}px`,
            top: `${y}px`,
          }}
        >
          <div onClick={(e) => handleQue(e)} className="addtoque">
            <div>Add to queue</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContextMenu;
