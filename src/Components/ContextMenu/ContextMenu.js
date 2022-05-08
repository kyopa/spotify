import { useEffect, useState, useRef } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import fetchSong from "../../fetchSong";
import {
  contextMenuAtoms,
  displayContextMenuState,
  tokenState,
  urgentSongsState,
} from "../../recoil/atoms";
import { fetchAlbumTracks } from "../../recoil/selectors";
import "./x.css";

function ContextMenu({ selected, type }) {
  const setUrgentSongs = useSetRecoilState(urgentSongsState);
  const token = useRecoilValue(tokenState);
  const [load, setLoad] = useState();
  const WIDTH = 186;
  const HEIGHT = 40;
  const x = useRecoilValue(contextMenuAtoms("x"));
  const y = useRecoilValue(contextMenuAtoms("y"));
  const [display, setDisplay] = useRecoilState(displayContextMenuState);

  const fetchLoad = async () => {
    switch (type) {
      case "album":
        fetchAlbumTracks(selected, token);
        const res = await fetchAlbumTracks(selected, token);
        const data = await res.json();
        return data.items;
      case "song":
        const resX = await fetchSong(selected, token);
        const dataX = await res.json();
        return dataX;
    }
  };

  const handleQue = async (e) => {
    e.preventDefault();
    const arr = await fetchLoad();
    console.log(arr)
    setUrgentSongs((prev) => [...prev, load]);
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
