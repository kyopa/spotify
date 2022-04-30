import { useCallback, useEffect, useRef } from "react";
import { useMemo } from "react";
import { useState } from "react";
import playIcon from "../../extra/playicon.png";
import pauseIcon from "../../extra/pause.png";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentSongState,
  historyState,
  onPauseState,
  searchedSongState,
  tokenState,
} from "../../recoil/atoms";
import Search from "../Search";
import { itemsState } from "../../recoil/selectors";
import fetchSong from "../../fetchSong";
import getLength from "../../getLength";

function FourSongs() {
  const tracks = useRecoilValue(itemsState("tracks"));

  return (
    <div>
      <div className="songs-see-all">
        <h2>Songs</h2>
        <a href="www" id="see-all">
          See all
        </a>
      </div>

      {tracks &&
        tracks.slice(0, 4).map((song) => {
          return (
            <div key={song.id}>
              <Song song={song} />
            </div>
          );
        })}
    </div>
  );
}

function Song(props) {
  const [song, setSong] = useState();
  const token = useRecoilValue(tokenState);
  const currentSong = useRecoilValue(currentSongState);

  const fetchSong = (song) => {
    return fetch(`https://api.spotify.com/v1/tracks/${song.id}?market=US`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    if (!props.song) return;
    fetchSong(props.song)
      .then((data) => data.json())
      .then((res) => {
        const artists = props.song.artists.map((artist) => {
          return { ...artist, hovering: false };
        });
        setSong({ ...res, artists: artists, playing: false });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {song && (
        <ul className="songs">
          <Box song={song} isCurrentSong={currentSong === song.id} />
        </ul>
      )}
    </div>
  );
}

function Box({ song, isCurrentSong }) {
  const onPause = useRecoilValue(onPauseState);
  const setCurrentSong = useSetRecoilState(currentSongState);
  if (!song) return;
  const length = getLength(song);

  return (
    <li
      style={{
        backgroundColor:
          isCurrentSong && !onPause ? "rgba(255,255,255,.3)" : "",
      }}
      className="song"
      onDoubleClick={() => setCurrentSong(song.id)}
    >
      <Img song={song} isCurrentSong={isCurrentSong} />
      <div className="song-details">
        <SongTitle song={song} isCurrentSong={isCurrentSong} />
        <div className="grey-details">
          {song.explicit ? <div id="E">E</div> : null}
          <Artists song={song} isCurrentSong={isCurrentSong} />
        </div>
      </div>
      <div id="length">{length}</div>
    </li>
  );
}

function Artists({ song, isCurrentSong }) {
  const onPause = useRecoilValue(onPauseState);

  return (
    <div className={isCurrentSong && !onPause ? "playing" : ""} id="artists">
      {song.artists.map((artist, i) => {
        return (
          <span key={crypto.randomUUID()}>
            {i !== song.artists.length - 1 ? (
              <span>
                <a id={artist.id} key={i}>
                  {artist.name}
                </a>
                ,{" "}
              </span>
            ) : (
              <span>
                <a id={artist.id} key={i}>
                  {artist.name}
                </a>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function Img({ song, isCurrentSong }) {
  const setCurrentSong = useSetRecoilState(currentSongState);
  const setSearchedSong = useSetRecoilState(searchedSongState);
  const [onPause, setOnPause] = useRecoilState(onPauseState);

  return (
    <div
      id={song.id}
      className="img-container"
      onClick={() => {
        return isCurrentSong
          ? setOnPause(!onPause)
          : (setCurrentSong(song.id),
            setSearchedSong(song.id),
            setOnPause(false));
      }}
    >
      <img
        loading="lazy"
        className={isCurrentSong && !onPause ? "playing" : ""}
        id="song-img"
        src={song.album && song.album.images[0].url}
      ></img>
      <div className="play-mini-song">
        <img
          id="play-icon"
          src={playIcon}
          className={isCurrentSong && !onPause ? "" : "idle"}
        ></img>

        <img
          className={isCurrentSong && onPause ? "playing" : ""}
          id="pause-icon"
          src={pauseIcon}
        ></img>
      </div>
    </div>
  );
}

function SongTitle({ song, isCurrentSong }) {
  return (
    <div
      style={{ color: isCurrentSong ? "#1db954" : "" }}
      className="song-title"
    >
      {song.name}
    </div>
  );
}

export default FourSongs;
