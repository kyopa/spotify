import "./x.css";
import playIcon from "../../extra/playIcon.png";

function GreenPlayButton({ right, bottom, position, page, animate }) {
  return (
    <div
      id={page ? "page" : "null"}
      data-animate={animate ? "animate" : null}
      onClick={(e) => e.preventDefault()}
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
