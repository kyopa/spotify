import { atom } from "recoil"


export const currentSongState = atom({
    key: "currentSong",
    default: {playing: false}
})

export const fourState = atom({
    key: "four",
    default: ""
})

export const songState = atom({
    key: "song",
    default: ""
})

export const pauseState = atom({
    key: "pause",
    default: false
})