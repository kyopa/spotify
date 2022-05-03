import "./x.css";
import playIcon from "../../extra/playIcon.png";

function GreenPlayButton({ right, bottom }) {
  return (
    <div
      onClick={(e) => e.preventDefault()}
      className="green-play-button"
      style={{
        right: `${right}%`,
        bottom: `1px`,
      }}
    ></div>
  );
}
export default GreenPlayButton;
