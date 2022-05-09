import {  useEffect } from "react";
import { useState } from "react";
import playIcon from "../../extra/playicon.png";
import pauseIcon from "../../extra/pause.png";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  tokenState,
  posState,
  selectedItemState,
} from "../../recoil/atoms";
import { itemsState } from "../../recoil/selectors";
import getLength from "../../getLength";
import { Link } from "react-router-dom";
import useSetCurrentInfo from "../../recoilCallback";
import useContextMenu from "../ContextMenu/useContextMenu";

function FourSongs() {
  const tracks = useRecoilValue(itemsState("tracks"));
  const { handleMenu } = useContextMenu();
  const setSelectedItem = useSetRecoilState(selectedItemState)

  return (
    <div>

      <div className="songs-see-all">
        <h2>Songs</h2>
        <Link to="/" id="see-all">
          See all
        </Link>
      </div>

      <div onContextMenu={e => {
        console.log(e.target)
        setSelectedItem({type: "song", id: e.target.id})
        handleMenu(e)
      }}>
        {tracks &&
          tracks.slice(0, 4).map((song, idx) => {
            return (
              <div id={song.id} key={song.id}>
                <Song song={song} idx={idx} />
              </div>
            );
          })}
      </div>
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

  return (
    <li id={song.id} className="song">
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
              <span id={song.id}>
                <Link to={`/artist/${artist.id}/`} id={song.id} key={i}>
                  {artist.name}
                </Link>
                ,{" "}
              </span>
            ) : (
              <span id={song.id}>
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
      <img id={song.id}
        loading="lazy"
        class="song-img"
        src={song.album && song.album.images[0].url}
      ></img>
      <div className="play-mini-song">
        <img id={song.id} class="play-icon" src={playIcon}></img>

        <img id={song.id} class="pause-icon" src={pauseIcon}></img>
      </div>
    </div>
  );
}

function SongTitle({ song }) {
  return <div id={song.id} className="song-title">{song.name}</div>;
}

export default FourSongs;
