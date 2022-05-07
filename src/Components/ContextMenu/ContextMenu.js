import { useEffect, useState, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import fetchSong from "../../fetchSong";
import { posState, queueState, tokenState } from "../../recoil/atoms";
import "./x.css";

function ContextMenu({ left, top, width, height, selected, setDisplay }) {
  const setQueue = useSetRecoilState(queueState);
  const pos = useRecoilValue(posState);
  const token = useRecoilValue(tokenState);
  const [song, setSong] = useState();

  useEffect(() => {
    if (!selected) return;
    console.log(selected)
    fetchSong(selected.id, token)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSong(data);
      })
      .catch(err => console.log(err))
  }, [selected]);

  const handleQue = () => {
    if (pos === 0) {
      setQueue((q) => [q[0], { ...song, que: true }, ...q.slice(1)]);
    } else {
      setQueue((que) => [
        ...que.slice(0, pos + 1),
        { ...song, que: true },
        ...que.slice(pos + 1),
      ]);
    }
    setDisplay(false);
  };
  return (
    <div
      className="contextmenu"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "fixed",
        left: `${left}px`,
        top: `${top}px`,
      }}
    >
      <div onClick={() => handleQue()} className="addtoque">
        <div>Add to queue</div>
      </div>
    </div>
  );
}

export default ContextMenu;
