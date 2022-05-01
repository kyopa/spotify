import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentSongState,
  currentTimeState,
  onPauseState,
  rangeValueState,
  songRestartState,
  tokenState,
} from "../../recoil/atoms";
import fetchSong, { fetchQueue } from "../../fetchSong";
import { queueState } from "../../recoil/selectors";
import nextIcon from "../../extra/skip-next.svg";
import prevIcon from "../../extra/skip-previous.svg";
import playIcon from "../../extra/play-circle.svg";
import pauseIcon from "../../extra/pause-circle.svg";
import shuffleIcon from "../../extra/shuffle-variant.svg";
import repeatIcon from "../../extra/repeat-variant.svg";
import Bar from "./ProgressBar";


// NONE OF THIS IS SETUP PROPERLY YET

function Player() {
  return (
    <div className="player">
      <div className="player-song-details">
        <SongDetails />
      </div>
      <div className="playbar">
        <PlayBar />
      </div>
      <div className="otherstuff">
        <OtherStuff />
      </div>
    </div>
  );
}

function SongDetails() {
  const currentSong = useRecoilValue(currentSongState);
  const token = useRecoilValue(tokenState);
  const [song, setSong] = useState();
  console.log(currentSong);

  useEffect(() => {
    if (!currentSong) return;

    fetchSong(currentSong, token)
      .then((res) => res.json())
      .then((data) => {
        setSong(data);
      });
  }, [currentSong]);

  return (
    <div>
      {song && (
        <div>
          <img
            src={song.album && song.album.images[0].url}
            className="player-img"
          ></img>

          <div className="name-artists">
            <div className="player-song-title">{song.name}</div>
            <div className="player-artists">
              {song.artists &&
                song.artists.map((artist, idx) => {
                  return idx === 0 ? (
                    <span key={crypto.randomUUID()}>
                      <a>{artist.name}</a>
                    </span>
                  ) : (
                    <span key={crypto.randomUUID()}>
                      , <a>{artist.name}</a>
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PlayBar() {
  const [onPause, setOnPause] = useRecoilState(onPauseState);
  const setCurrentSong = useSetRecoilState(currentSongState);
  const queue = useRecoilValue(queueState);
  const [index, setIndex] = useState(0);

  const _handleNext = () => {
    setIndex(index + 1);
  };

  useEffect(() => {
    if (!queue) return;

    setCurrentSong(queue[index].id);
  }, [index]);

  const playPrev = () => {
    if (index === 0) return;
    setIndex(index - 1);
  };

  return (
    <div className="playbar-container">
      <div className="buttons">
        <img className={"player-icon shuffle"} src={shuffleIcon}></img>
        <img
          onClick={() => playPrev()}
          className="player-icon"
          src={prevIcon}
        ></img>
        <img
          className="player-icon center-icon"
          onClick={() => setOnPause(!onPause)}
          src={onPause ? playIcon : pauseIcon}
        ></img>

        <img
          onClick={() => _handleNext()}
          className="player-icon"
          src={nextIcon}
        ></img>
        <img className="player-icon repeat" src={repeatIcon}></img>
      </div>

      <div className="bar-container">
        <ProgressBar />
      </div>
    </div>
  );
}

const ProgressBar = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useRecoilState(rangeValueState)
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeState)
  const setSongRestart = useSetRecoilState(songRestartState)

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
              setSongRestart(true)
            }}
            onMouseDown={() => setEditing(true)}
          ></input>
        </div>
      </div>
    </div>
  );
};

function OtherStuff() {
  return <div>Volume</div>;
}

export default Player;
