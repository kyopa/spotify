import "./x.css";
import playIcon from "../../extra/playIcon.png";
import useSetCurrentInfo from "../../recoilCallback";
import { useSetRecoilState } from "recoil";
import { songsState } from "../../recoil/atoms";

function GreenPlayButton({ type, id, right, bottom, position, page, animate }) {
  const setCurrentSongInfo = useSetCurrentInfo();


  const handleClick = (e) => {
    e.preventDefault();

  }

  return (
    <div
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
