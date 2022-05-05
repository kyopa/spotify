import getLength from "../../getLength";
import { currentSongState } from "../../recoil/atoms";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { currentTimeState, onPauseState, trackState } from "../../recoil/atoms";
import useSetCurrentInfo from "../../recoilCallback";

function Track({ track, num, hide }) {
  const setCurrentSongInfo = useSetCurrentInfo(track);

  return (
    <div className="track" style={{ display: hide ? "none" : "flex" }}>
      <div onClick={() => setCurrentSongInfo("artistpage")} id="num">
        {num}
      </div>
      <img id="img" src={track.album.images[0].url}></img>
      <div id="trackname">{track.name}</div>
      <div id="tracklength">{getLength(track)}</div>
    </div>
  );
}

export default Track;
