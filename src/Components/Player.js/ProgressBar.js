import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  songRestartState,
  currentTimeState,
  rangeValueState,
} from "../../recoil/atoms";
import "./progressbar.css"

const ProgressBar = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useRecoilState(rangeValueState);
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);
  const setSongRestart = useSetRecoilState(songRestartState);

  return (
    <div>
      <div>length</div>
      <div>
        <div className="progressbar-container">
          <div className="progressbar">
            <div
              style={{
                width: `${editing ? value : (currentTime / 30) * 100}%`,
              }}
            >
              &nbsp;
            </div>
          </div>
          <input
            style={{
              background: `
              linear-gradient(to right, 
              #1db954 ${editing ? value : (currentTime / 30) * 100}%,
              #5e5e5e ${editing ? value : (currentTime / 30) * 100}%`,
            }}
            type="range"
            min="1"
            max="100"
            value={editing ? value : (currentTime / 30) * 100}
            className="range"
            onChange={(e) => setValue(e.target.value)}
            onMouseUp={() => {
              setEditing(false);
              setCurrentTime(Number((value / 100) * 30));
              setSongRestart(true);
            }}
            onMouseDown={() => setEditing(true)}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
