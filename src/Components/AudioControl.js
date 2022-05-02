import {
  tokenState,
  rewindState,
  currentSongState,
  onPauseState,
  currentTimeState,
  timeState,
  songRestartState,
  rangeValueState,
  volumeState,
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
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);
  const [songRestart, setSongRestart] = useRecoilState(songRestartState);
  const rangeValue = useRecoilValue(rangeValueState);
  const volume = useRecoilValue(volumeState);

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

  let interval;
  useEffect(() => {
    if (!currentSong) return;
    audioRef.current.pause();
    interval = setInterval(() => {
      if (audioRef.current.currentTime >= 30) clearInterval(interval);
      setCurrentTime(audioRef.current.currentTime);
    }, 100);
  }, [currentSong]);

  useEffect(() => {
    if (!songRestart) return;
    if (!onPause) audioRef.current.pause();
    audioRef.current.currentTime = (rangeValue / 100) * 30;

    if (!onPause) audioRef.current.play();
    setSongRestart(false);
  }, [songRestart]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

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
