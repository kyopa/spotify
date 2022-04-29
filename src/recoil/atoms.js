import { atom, atomFamily } from "recoil";

export const currentSongState = atom({
  key: "currentSong",
  default: { playing: false, init: true },
});

export const searchResultsState = atom({
  key: "searchResults",
  default: []
})

export const songState = atomFamily({
  key: "song",
  default: ""
})

export const onPauseState = atom({
  key: "onPause",
  default: true,
});


export const searchState = atom({
  key: "search",
  default: "",
});

export const topResultState = atom({
  key: "topResult",
  default: "",
});

export const relatedArtistsState = atom({
  key: "relatedArtists",
  default: "",
});

export const tokenState = atom({
  key: "token",
  default: "",
});
