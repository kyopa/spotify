import {
  tokenState,
  rewindState,
  onPauseState,
  currentTimeState,
  songRestartState,
  rangeValueState,
  volumeState,
  posState,
  searchState,
} from "../recoil/atoms";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { useRef, useEffect, useState } from "react";
import fetchSong from "../fetchSong";
import { currentSongState } from "../recoil/atoms";
import { queueState } from "../recoil/atoms";
import { fetchTracks } from "../recoilCallback";

const AudioControl = () => {
  const token = useRecoilValue(tokenState);
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
  const audioRef = useRef();
  const onPause = useRecoilValue(onPauseState);
  const [rewind, setRewind] = useRecoilState(rewindState);
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);
  const [songRestart, setSongRestart] = useRecoilState(songRestartState);
  const rangeValue = useRecoilValue(rangeValueState);
  const volume = useRecoilValue(volumeState);
  const [pos, setPos] = useRecoilState(posState);
  const search = useRecoilValue(searchState);
  const [queue, setQueue] = useRecoilState(queueState);

  useEffect(() => {
    setQueue(queue.filter((song) => song.que === true));
  }, [search]);

  useEffect(() => {
    console.log(currentSong);
    if (!currentSong) return;
    if (!currentSong.id) return;

    audioRef.current.pause();
    fetchSong(currentSong.id, token)
      .then((res) => res.json())
      .then((data) => {
        audioRef.current.setAttribute("src", data.preview_url);
        audioRef.current.play();
      });
  }, [currentSong]);

  useEffect(() => {
    if (!queue[0]) return;
    if (currentSong.que) {
      // if song was from que remove it from the array
      setQueue([...queue.slice(0, pos - 1), ...queue.slice(pos)]);
    }
    console.log(pos);
    console.log(queue[pos]);
    console.log(queue);
    setCurrentSong(queue[pos]);
  }, [pos]);

  useEffect(() => {
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

    interval = setInterval(() => {
      if (audioRef.current.currentTime >= 30) clearInterval(interval);
      setCurrentTime(audioRef.current.currentTime);
    }, 100);
  }, [currentSong]);

  useEffect(() => {
    if (!songRestart) return;
    if (!onPause) audioRef.current.pause();
    /*
    audioRef.current.currentTime = (rangeValue / 100) * 30;

    if (!onPause) audioRef.current.play();
    setSongRestart(false);
    */
  }, [songRestart]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  return <audio ref={audioRef}></audio>;
};

export default AudioControl;
