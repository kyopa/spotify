import getLength from "../../getLength";
import {
  currentSongState,
  posState,
  songsState,
  songQueState,
  tokenState,
} from "../../recoil/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useSetCurrentInfo from "../../recoilCallback";
import { queArtistSongs } from "../../Queue/setQue";

function Track({ track, num, hide, artist }) {
  const setCurrentSongInfo = useSetCurrentInfo();
  const handleClick = async () => {
    setCurrentSongInfo(track, "artistpage", num - 1, artist);
  };

  return (
    <div className="track" style={{ display: hide ? "none" : "flex" }}>
      <div onClick={() => handleClick()} id="num">
        {num}
      </div>
      <img id="img" src={track.album.images[0].url}></img>
      <div id="trackname">{track.name}</div>
      <div id="tracklength">{getLength(track)}</div>
    </div>
  );
}

export default Track;
