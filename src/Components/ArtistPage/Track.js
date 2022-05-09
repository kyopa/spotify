import getLength from "../../getLength";
import {
  selectedItemState,
} from "../../recoil/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useSetCurrentInfo from "../../recoilCallback";
import { queArtistSongs } from "../../Queue/setQue";

function Track({ track, num, hide, artist }) {
  const setCurrentSongInfo = useSetCurrentInfo();
  const handleClick = async () => {
    setCurrentSongInfo(track, "artistpage", num - 1, artist);
  };
  const setSelected = useSetRecoilState(selectedItemState)

  return (
    <div id={track.id} onContextMenu={(e) => setSelected({id: e.currentTarget.id, type: "song"})} className="track" style={{ display: hide ? "none" : "flex" }}>
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
