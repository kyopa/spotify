import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { contextMenuAtoms, displayContextMenuState } from "../../recoil/atoms";

const useContextMenu = (height, width) => {
  const [display, setDisplay] = useRecoilState(displayContextMenuState);
  const [x, setX] = useRecoilState(contextMenuAtoms("x"));
  const [rightX, setRightX] = useState();
  const [y, setY] = useRecoilState(contextMenuAtoms("y"));
  const [botY, setBotY] = useState();

  const handleMenu = (e) => {
    e.preventDefault();
    setX(e.pageX);
    setY(e.pageY);
    setRightX(e.pageX + width);
    setBotY(e.pageY + height);
    setDisplay(true);
  };

  const handleDisplay = (e) => {
    console.log(e.pageY, y, botY);
    console.log(e.pageX, x, rightX);
    // if not inside box
    if (!(e.pageX > x && e.pageX < rightX && e.pageY > y && e.pageY < botY)) {
      setDisplay(false);
    }
  };
  // more than x but less than right x
  // more than y but less than botY

  useEffect(() => {
    if (display) {
      document.addEventListener("click", handleDisplay);
    }

    return () => document.removeEventListener("click", handleDisplay);
  }, [handleDisplay]);

  return { handleMenu, x, y };
};

export default useContextMenu;
