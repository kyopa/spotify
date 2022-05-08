import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  onPauseState,
  onShuffleState,
  posState,
  queueState,
  rewindState,
  tokenState,
} from "../../../recoil/atoms";
import { currentSongState } from "../../../recoil/atoms";
import fetchSong from "../../../fetchSong";
import { songsState } from "../../../recoil/atoms";
import nextIcon from "../../../extra/skip-next.svg";
import prevIcon from "../../../extra/skip-previous.svg";
import playIcon from "../../../extra/play-circle.svg";
import pauseIcon from "../../../extra/pause-circle.svg";
import shuffleIcon from "../../../extra/shuffle-variant.svg";
import repeatIcon from "../../../extra/repeat-variant.svg";
import ProgressBar from "../ProgressBar/ProgressBar";
import Volume from "../Volume/Volume";
import Queue from "../Queue/Queue";
import { Link } from "react-router-dom";
import useSetCurrentInfo from "../../../recoilCallback";

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

  useEffect(() => {
    if (!currentSong) return;
    if (!currentSong.id) return;

    fetchSong(currentSong.id, token)
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
            <Link to={`album/${song.id}`} className="player-song-title">
              {song.name}
            </Link>
            <div className="player-artists">
              {song.artists &&
                song.artists.map((artist) => {
                  return (
                    <Link
                      id="artistname-player"
                      key={artist.id + 1}
                      to={`/artist/${artist.id}`}
                    >
                      {artist.name}
                    </Link>
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
  const [pos, setPos] = useRecoilState(posState);
  const setRewind = useSetRecoilState(rewindState);
  const [onShuffle, setOnShuffle] = useRecoilState(onShuffleState);
  const queue = useRecoilValue(queueState);

  const handleNext = () => {
    setPos(pos.idx + 1 || pos + 1);
  };

  const playPrev = () => {
    // if first song on album for example
    if (pos.idx === 0 || pos === 0) return setRewind(true);
    setPos(pos - 1);
  };

  return (
    <div className="playbar-container">
      <div className="buttons">
        <img
          onClick={() => setOnShuffle(!onShuffle)}
          className={`player-icon shuffle ${onShuffle ? "onShuffle" : null}`}
          src={shuffleIcon}
        ></img>
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
          onClick={() => handleNext()}
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

function OtherStuff() {
  return (
    <div className="otherstuff">
      <Queue />
      <Volume />
    </div>
  );
}

export default Player;
