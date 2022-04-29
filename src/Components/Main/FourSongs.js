import { useCallback, useEffect, useRef } from "react";
import { useMemo } from "react";
import { useState } from "react";
import playIcon from "../../extra/playicon.png";
import pauseIcon from "../../extra/pause.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentSongState, onPauseState, tokenState } from "../../recoil/atoms";
import Search from "../Search";
import { itemsState } from "../../recoil/selectors";

function FourSongs() {
  const tracks = useRecoilValue(itemsState("tracks"));
  const currentSong = useRecoilValue(currentSongState);
  const [onPause, setOnPause] = useRecoilState(onPauseState);
  const audioRef = useRef();
  const songRef = useRef();

  useEffect(() => {
    if (currentSong.init) return;
    if (songRef.current === currentSong.id) {
      onPause ? audioRef.current.play() : audioRef.current.pause();
      setOnPause(!onPause);
    } else {
      setOnPause(false);
      audioRef.current.pause();
      audioRef.current.setAttribute("src", currentSong.preview_url);
      audioRef.current.play();
    }

    songRef.current = currentSong.id;
  }, [currentSong]);

  return (
    <div>
      <audio ref={audioRef}></audio>
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
  const onPause = useRecoilValue(onPauseState)
  console.log(onPause)

  const _handleClick = () => {
    if (currentSong.id !== song.id) {
      setCurrentSong({ ...song, playing: true });
    } else setCurrentSong({ ...song, playing: !currentSong.playing });
  };



  return (
    <div id={song.id} className="img-container" onClick={() => _handleClick()}>
      <img
        loading="lazy"
        s
        style={{
          opacity:
            song.hovering || (isCurrentSong && !onPause)
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
                ? song.hovering && !onPause
                : song.hovering
            )
              ? "block"
              : "none",
          }}
          src={playIcon}s
        ></img>

        <img
          style={{
            display: isCurrentSong && !onPause ? "block" : "none",
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
export default FourSongs;
