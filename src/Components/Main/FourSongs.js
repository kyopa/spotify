import { useCallback, useEffect, useRef } from "react";
import { useMemo } from "react";
import { useState } from "react";
import playIcon from "../../extra/playicon.png";
import pauseIcon from "../../extra/pause.png";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  tokenState,
  songsState,
  posState,
  searchState,
  queueState,
} from "../../recoil/atoms";
import { currentSongState } from "../../recoil/atoms";
import { itemsState } from "../../recoil/selectors";
import getLength from "../../getLength";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilCallback } from "recoil";
import useSetCurrentInfo, { fetchTracks } from "../../recoilCallback";
import { queRelatedSongs } from "../../Queue/setQue";

function FourSongs() {
  const tracks = useRecoilValue(itemsState("tracks"));

  return (
    <div>
      <div className="songs-see-all">
        <h2>Songs</h2>
        <Link to="/" id="see-all">
          See all
        </Link>
      </div>

      {tracks &&
        tracks.slice(0, 4).map((song, idx) => {
          return (
            <div key={song.id}>
              <Song song={song} idx={idx} />
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
          <Box song={song} idx={props.idx} />
        </ul>
      )}
    </div>
  );
}

export function Box({ song, idx }) {
  const length = getLength(song);
  const [queue, setQueue] = useRecoilState(queueState);
  const pos = useRecoilValue(posState);

  const handleQue = () => {

  }

  return (
    <li className="song">
      <button
        onClick={() => handleQue()}
      >
        que
      </button>
      <Img song={song} idx={idx} />
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

function Img({ song, idx }) {
  const setCurrentSongInfo = useSetCurrentInfo();
  const [pos, setPos] = useRecoilState(posState);
  const tracks = useRecoilValue(itemsState("tracks"));

  const handleClick = async () => {
    setCurrentSongInfo(song, "searchpage", idx);
  };

  return (
    <div id={song.id} className="img-container" onClick={() => handleClick()}>
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
