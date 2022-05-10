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
  urgentSongsState,
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
  const [urgentSongs, setUrgentSongs] = useRecoilState(urgentSongsState);

  useEffect(() => {
    if (!currentSong) return;
    if (!currentSong.id) return;

    audioRef.current.pause();
    fetchSong(currentSong.id, token)
      .then((res) => res.json())
      .then((data) => {
        audioRef.current.setAttribute("src", data.preview_url);
        audioRef.current.play();
      });
  }, [currentSong, token]);

  useEffect(() => {
    console.log(urgentSongs);
  }, [urgentSongs]);

  useEffect(() => {
    if (pos.decr) return;
    console.log(pos, "normal");
    console.log(urgentSongs.length, urgentSongs.length !== 0);
    console.log(queue);

    if (urgentSongs.length !== 0 && !pos.click) {
      console.log("urgnent songs triggerd");
      setCurrentSong(urgentSongs[0]);
      setUrgentSongs([...urgentSongs.slice(1)]);
      setPos({ idx: pos - 1, decr: true });
    } else {
      if (!queue[0]) return;
      // if last song in album for example
      if (pos === queue.length) {
        const random = Math.floor(Math.random() * queue.length) + 1;
        setPos(random);
        setCurrentSong(queue[random]);
      } else {
        setCurrentSong(queue[pos.idx ? pos.idx : pos]);
      }
    }
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
      if (audioRef.current.currentTime >= 29.95) clearInterval(interval);
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

  useEffect(() => {
    audioRef.current.onended = () => {
      setPos(pos.idx + 1 || pos + 1);
      audioRef.current.currentTime = 0;
    };
  }, [currentTime]);

  return <audio ref={audioRef}></audio>;
};

export default AudioControl;
