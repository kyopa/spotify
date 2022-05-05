import { useCallback, useEffect, useRef } from "react";
import { useMemo } from "react";
import { useState } from "react";
import playIcon from "../../extra/playicon.png";
import pauseIcon from "../../extra/pause.png";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentTimeState,
  onPauseState,
  posState,
  searchedSongState,
  tokenState,
} from "../../recoil/atoms";
import { currentSongState } from "../../recoil/atoms";
import { itemsState } from "../../recoil/selectors";
import getLength from "../../getLength";
import { Link } from "react-router-dom";
import { useRecoilCallback } from "recoil";
import useSetCurrentInfo from "../../recoilCallback";

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

export function Song(props) {
  const [song, setSong] = useState();
  const token = useRecoilValue(tokenState);

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
          <Box song={song} />
        </ul>
      )}
    </div>
  );
}

export function Box({ song }) {
  if (!song) return;
  const length = getLength(song);

  return (
    <li className="song">
      <Img song={song} />
      <div className="song-details">
        <SongTitle song={song} />
        <div className="grey-details">
          {song.explicit ? <div id="E">E</div> : null}
          <Artists song={song} />
        </div>
      </div>
      <div id="length">{length}</div>
    </li>
  );
}

function Artists({ song }) {
  return (
    <div id="artists">
      {song.artists.map((artist, i) => {
        return (
          <span key={crypto.randomUUID()}>
            {i !== song.artists.length - 1 ? (
              <span>
                <Link to={`/artist/${artist.id}/`} id={artist.id} key={i}>
                  {artist.name}
                </Link>
                ,{" "}
              </span>
            ) : (
              <span>
                <Link to={`/artist/${artist.id}/`} key={i} id={artist.id}>
                  {artist.name}
                </Link>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function Img({ song }) {
  const setCurrentSongInfo = useSetCurrentInfo();

  return (
    <div
      id={song.id}
      className="img-container"
      onClick={() => setCurrentSongInfo(song.id)}
    >
      <img
        loading="lazy"
        id="song-img"
        src={song.album && song.album.images[0].url}
      ></img>
      <div className="play-mini-song">
        <img id="play-icon" src={playIcon}></img>

        <img id="pause-icon" src={pauseIcon}></img>
      </div>
    </div>
  );
}

function SongTitle({ song }) {
  return <div className="song-title">{song.name}</div>;
}

export default FourSongs;
