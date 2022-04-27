import { atom } from "recoil"


export const currentSongState = atom({
    key: "currentSong",
    default: {playing: false, init: true}
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

export const rendersState = atom({
    key: "renders",
    default: 0
})