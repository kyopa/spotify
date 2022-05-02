import { useState } from "react";
import { useRecoilState } from "recoil";
import volumeIcon from "../../../extra/16233177711645017107.svg";
import { volumeState } from "../../../recoil/atoms";
import "./volume.css";

function Volume() {
  const [width, setWidth] = useState(50);
  const [editing, setEditing] = useState(false);
  const [volume, setVolume] = useRecoilState(volumeState);
  return (
    <div className="volume-container">
      <img id="volume-icon" src={volumeIcon}></img>
      <div className="volumex">
        <div
          style={{ width: `${editing ? width : volume}%` }}
          className="volumebar"
        >
          &nbsp;
        </div>
      </div>
      <input
        style={{
          background: `
            linear-gradient(to right, 
            #1db954 ${editing ? width : volume}%,
            #5e5e5e ${editing ? width : volume}%`,
        }}
        type="range"
        min="1"
        max="100"
        value={editing ? width : volume}
        onChange={(e) => {
          setVolume(e.target.value == 1 ? 0 : e.target.value)
          setWidth(e.target.value == 1 ? 0 : e.target.value)
        }}
        onMouseDown={() => setEditing(true)}
        onMouseUp={(e) => setEditing(false)}
      ></input>
    </div>
  );
}

export default Volume;
