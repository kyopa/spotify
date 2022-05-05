import "./x.css";
import playIcon from "../../extra/playIcon.png";
import useSetCurrentInfo from "../../recoilCallback";

function GreenPlayButton({ id, right, bottom, position, page, animate }) {
  const setCurrentSongInfo = useSetCurrentInfo();
  console.log(id)
  return (
    <div
      data-id={page ? "page" : "null"}
      id={id}
      data-animate={animate ? "animate" : null}
      onClick={(e) => {
        e.preventDefault();
        setCurrentSongInfo(id);
        console.log(id)
      }}
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
