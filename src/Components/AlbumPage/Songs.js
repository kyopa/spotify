import { useRef, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { posState, songsState, tokenState } from "../../recoil/atoms";

import useSetCurrentInfo from "../../recoilCallback";
import ContextMenu from "../ContextMenu/ContextMenu";
import useContextMenu from "../ContextMenu/useContextMenu";

function Songs({ album }) {
  const WIDTH = 186;
  const HEIGHT = 40;
  const { handleMenu, x, y, display, setDisplay } = useContextMenu(HEIGHT, WIDTH);
  const [selected, setSelected] = useState();

  return (
    <div className="album-tracks" onContextMenu={(e) => setSelected(e.target.firstChild)}>
      {display && (
        <ContextMenu
          selected={selected}
          setDisplay={setDisplay}
          height={HEIGHT}
          width={WIDTH}
          top={y}
          left={x}
        />
      )}
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
    <div className="song-container">
      <div onClick={() => handleClick()} className="num" id={song.id}>{num}</div>
      <div className="song-details">
        <div id="trackname">{song.name}</div>
        <div className="artist-cell">
          {song.explicit ? <span id="explicit">E</span> : null}
          <span id="artists">{song.artists[0].name}</span>
        </div>
      </div>
    </div>
  );
}

export default Songs;
