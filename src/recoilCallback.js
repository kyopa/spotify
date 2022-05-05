import { useRecoilCallback } from "recoil";
import {
  currentSongState,
  onPauseState,
  currentTimeState,
} from "./recoil/atoms";

const useSetCurrentInfo = () => {
  return useRecoilCallback(
    ({ snapshot, set }) =>
      (id) => {
        const song = snapshot.getLoadable(currentSongState).contents;
        if (id === song) {
          const onPause = snapshot.getLoadable(onPauseState).contents;
          set(onPauseState, !onPause);
        } else {
          set(currentSongState, id);
          set(currentTimeState, 0);
          set(onPauseState, false);
        }
      },
    []
  );
};

export default useSetCurrentInfo;
