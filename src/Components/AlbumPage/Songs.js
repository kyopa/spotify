import { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { posState, songsState, tokenState } from "../../recoil/atoms";

import useSetCurrentInfo from "../../recoilCallback";
import ContextMenu from "../ContextMenu/ContextMenu";
import useContextMenu from "../ContextMenu/useContextMenu";

function Songs({ album }) {
  const { handleMenu } = useContextMenu();
  const [selected, setSelected] = useState();

  return (
    <div
      className="album-tracks"
      onContextMenu={(e) => {
        setSelected(e.target.id);
      }}
    >
      <ContextMenu selected={selected} type="song" />

      <div className="tracks-header">
        <div id="hashtag">#</div>
        <div>TITLE</div>
      </div>

      <div className="tracks" onContextMenu={(e) => handleMenu(e)}>
        {album.tracks &&
          album.tracks.items.map((song, i) => {
            return (
              <Song idx={i} album={album} key={i} song={song} num={i + 1} />
            );
          })}
      </div>
    </div>
  );
}

function Song({ song, num, album, idx }) {
  const setCurrentSongInfo = useSetCurrentInfo();

  const handleClick = async () => {
    setCurrentSongInfo(song, "albumpage", idx, album);
  };

  return (
    <div id={song.id} className="song-container">
      <div onClick={() => handleClick()} className="num" id={song.id}>
        {num}
      </div>
      <div className="song-details">
        <div id={song.id} class="trackname">
          {song.name}
        </div>
        <div id={song.id} className="artist-cell">
          {song.explicit ? <span id="explicit">E</span> : null}
          <span id={song.id} class="artists">
            {song.artists[0].name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Songs;
