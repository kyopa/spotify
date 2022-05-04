import { useSetRecoilState, useRecoilState } from "recoil";
import { currentSongState } from "../../recoil/atoms";
import { searchedSongState } from "../../recoil/atoms";
import { onPauseState } from "../../recoil/atoms";
import { currentTimeState } from "../../recoil/atoms";

function Songs({ album }) {
  console.log(album.tracks);

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
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
  const setSearchedSong = useSetRecoilState(searchedSongState);
  const [onPause, setOnPause] = useRecoilState(onPauseState);
  const setCurrentTime = useSetRecoilState(currentTimeState);

  return (
    <div className="song-container">
      <div
        onClick={() =>
          currentSong === song.id
            ? setOnPause(!onPause)
            : ((setCurrentSong(song.id),
              setSearchedSong(song.id),
              setOnPause(false)),
              setCurrentTime(0))
        }
        id="num"
      >
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
