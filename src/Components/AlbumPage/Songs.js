import { useSetRecoilState, useRecoilState, useRecoilCallback } from "recoil";
import { currentSongState } from "../../recoil/atoms";
import { searchedSongState } from "../../recoil/atoms";
import { onPauseState } from "../../recoil/atoms";
import { currentTimeState } from "../../recoil/atoms";
import useSetCurrentInfo from "../../recoilCallback";

function Songs({ album }) {
  return (
    <div className="album-tracks">
      <div className="tracks-header">
        <div id="hashtag">#</div>
        <div>TITLE</div>
      </div>

      <div className="tracks">
        {album.tracks &&
          album.tracks.items.map((song, i) => {
            return <Song key={i} song={song} num={i + 1} />;
          })}
      </div>
    </div>
  );
}

function Song({ song, num }) {
  const setCurrentSongInfo = useSetCurrentInfo();

  return (
    <div className="song-container">
      <div onClick={() => setCurrentSongInfo(song.id)} id="num">
        {num}
      </div>
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
