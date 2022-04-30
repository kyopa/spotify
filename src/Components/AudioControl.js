import {
  tokenState,
  rewindState,
  currentSongState,
  onPauseState,
  currentTimeState,
} from "../recoil/atoms";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { useRef, useEffect } from "react";
import fetchSong from "../fetchSong";

const AudioControl = () => {
  const token = useRecoilValue(tokenState);
  const currentSong = useRecoilValue(currentSongState);
  const audioRef = useRef();
  const onPause = useRecoilValue(onPauseState);
  const [rewind, setRewind] = useRecoilState(rewindState);
  const setCurrentTime = useSetRecoilState(currentTimeState)

  useEffect(() => {
    if (!currentSong) return;
    audioRef.current.pause();
    fetchSong(currentSong, token)
      .then((res) => res.json())
      .then((data) => {
        audioRef.current.setAttribute("src", data.preview_url);
        audioRef.current.play();
      });
  }, [currentSong]);

  useEffect(() => {
    console.log(onPause);
    !onPause ? audioRef.current.play() : audioRef.current.pause();
  }, [onPause]);

  useEffect(() => {
    if (!rewind) return;
    audioRef.current.currentTime = 0;
    setRewind(false);
  }, [rewind]);

  useEffect(() => {
    let interval = setInterval(() => getCurrentTime(), 100);
    return () => clearInterval(interval);
  }, []);

  const getCurrentTime = () => {
    const secs = audioRef.current.currentTime;
    setCurrentTime(
      `0:${
        secs < 10
          ? `0${secs.toString().charAt(0)}`
          : secs.toString().substring(0, 2)
      }`
    );
  };

  return <audio ref={audioRef}></audio>;
};

export default AudioControl;
