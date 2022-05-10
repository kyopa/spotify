import "./x.css";
import playIcon from "../../extra/playIcon.png";
import useSetCurrentInfo from "../../recoilCallback";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { songsState, tokenState } from "../../recoil/atoms";
import fetchSong, { fetchQueue } from "../../fetchSong";
import { queAlbumSongs, queArtistSongs } from "../../Queue/setQue";
import { fetchTopTracks } from "../../recoil/selectors";

function GreenPlayButton({
  artist,
  type,
  id,
  right,
  bottom,
  position,
  page,
  animate,
}) {
  const token = useRecoilValue(tokenState);
  const setCurrentSongInfo = useSetCurrentInfo();

  const handleClick = async (e) => {
    console.log(e.target)
    e.preventDefault();

    switch (e.target.title) {
      case "track":
        const res = await fetchSong(e.target.id, token);
        const data = await res.json();
        setCurrentSongInfo(data, "topresultSong", 0);
        break;
      case "artist":
        const resX = await fetchTopTracks(artist, token);
        const dataX = await resX.json();
        setCurrentSongInfo(dataX.tracks[0], "artistpage", 0, artist);
        break;
      case "album":
        const albumId = e.target.id;
        const arr = await queAlbumSongs(albumId, token);
        const firstSong = arr[0];
        setCurrentSongInfo(firstSong, "albumpage", 0, { id: albumId });
        break;
      default:
        console.log("lol");
    }
  };

  return (
    <div
      data-artist={artist?.id}
      title={type}
      data-id={page ? "page" : "null"}
      id={id}
      data-animate={animate ? "animate" : null}
      onClick={(e) => handleClick(e)}
      className={"green-play-button"}
      style={{
        right: right,
        bottom: bottom || "1px",
        position: position,
      }}
    ></div>
  );
}

export default GreenPlayButton;
