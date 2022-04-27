import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil"
import { fourState } from "../atoms"



const useAudio = () => {


    const [four, setFour] = useRecoilState(fourState);
    const [song, setSong] = useState();

    const play = () => {
        song.play()
    }

    const pause = () => {
        song.pause()
    }

    const set = (track) => setSong(new Audio(track.preview_url))

    const end = () => song.currentTime = 0;

    return [play, pause, set, end]
}

export default useAudio;