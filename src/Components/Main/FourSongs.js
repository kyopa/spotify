import { useEffect, useRef } from "react";
import { useMemo } from "react";
import { useState } from "react";
import playIcon from "../../extra/playicon.png";
import pauseIcon from "../../extra/pause.png";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilStoreID,
  useRecoilValue,
} from "recoil";
import {
  currentSongState,
  fourState,
  pauseState,
  rendersState,
  tokenState,
  tracksState,
} from "../../atoms";

function FourSongs() {
  // am i supposed to do something like this rather than
  // const [four, setFour] = useRecoilState(fourState)??
  const four = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const arr = snapshot.getPromise(tracksState);
        set(fourState, arr.slice(0, 4));

        return arr.slice(0, 4);
      },
    []
  );

  /*
    THIS IS HOW I WOULD PLAY THE CURRENT SONG
    but this doesnt work because it will flash

    const [currentSong, setCurrentSong] = useRecoilState(currentSongState)
    const audioRef = useRef();
    
    useEffect(() => {
        if (currentSong.init) return

        audioRef.current.pause();
        audioRef.current.setAttribute("src", currentSong.preview_url)
        audioRef.current.play();

    }, [currentSong])

    <audio ref={audioRef}></audio>
    */

  return (
    <div>
      <div className="songs-see-all">
        <h2>Songs</h2>
        <a href="www" id="see-all">
          See all
        </a>
      </div>

      {four &&
        four.map((song) => {
          return (
            <div key={crypto.randomUUID()}>
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
    return fetch(`https://api.spotify.com/v1/tracks/${song.id}?market=ES`, {
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
          <Box
            song={song}
            setSong={setSong}
            currentSong={currentSong.id === song.id ? true : false}
          />
        </ul>
      )}
    </div>
  );
}

function Box({ song, setSong, currentSong }) {
  const currentSongItem = useRecoilValue(currentSongState);

  const hover = () => {
    setSong((prev) => ({ ...prev, hovering: true }));
  };

  const noHover = () => {
    setSong((prev) => ({ ...prev, hovering: false }));
  };

  const _getLength = () => {
    const mins = Math.floor(song.duration_ms / 60000);
    const secs = ((song.duration_ms % 60000) / 1000).toFixed(0);
    return `${mins}:${secs < 10 ? `0${secs}` : `${secs}`}`;
  };

  return (
    <li
      style={{
        backgroundColor:
          currentSong && currentSongItem.playing ? "rgba(255,255,255,.3)" : "",
      }}
      className="song"
      onMouseEnter={() => hover()}
      onMouseLeave={() => noHover()}
    >
      <Img song={song} setSong={setSong} isCurrentSong={currentSong} />
      <div className="song-details">
        <SongTitle song={song} isCurrentSong={currentSong} />
        <div className="grey-details">
          {song.explicit ? <div id="E">E</div> : null}
          <Artists song={song} setSong={setSong} isCurrentSong={currentSong} />
        </div>
      </div>
      <div id="length">{_getLength()}</div>
    </li>
  );
}

function Artists({ song, isCurrentSong }) {
  const currentSong = useRecoilValue(currentSongState);

  return (
    <div
      className={isCurrentSong && currentSong.playing ? "playing" : ""}
      id="artists"
    >
      {song.artists.map((artist, i) => {
        return (
          <span key={crypto.randomUUID()}>
            {i !== song.artists.length - 1 ? (
              <span>
                <a id={artist.id} key={crypto.randomUUID()}>
                  {artist.name}
                </a>
                ,{" "}
              </span>
            ) : (
              <span>
                <a id={artist.id} key={crypto.randomUUID()}>
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
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);

  const updateCurrentSong = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        if (currentSong.id !== song.id) {
          set(currentSongState, { ...song, playing: true });
        } else
          set(currentSongState, { ...song, playing: !currentSong.playing });
      },
    [currentSong.id]
  );

  return (
    <div id={song.id} className="img-container" onClick={updateCurrentSong}>
      <img
        loading="lazy"
        style={{
          opacity:
            song.hovering || (isCurrentSong && currentSong.playing)
              ? "0.5"
              : "1",
        }}
        className="song-img"
        src={song.album && song.album.images[0].url}
      ></img>
      <div className="play-mini-song">
        <img
          style={{
            display: (
              isCurrentSong
                ? song.hovering && !currentSong.playing
                : song.hovering
            )
              ? "block"
              : "none",
          }}
          src={playIcon}
        ></img>

        <img
          style={{
            display: isCurrentSong && currentSong.playing ? "block" : "none",
          }}
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
