import { atom, atomFamily, selector } from "recoil";

export const currentSongState = atom({
  key: "currentSong",
  default: {}
})

export const searchResultsState = atom({
  key: "searchResults",
  default: [],
});

export const songState = atomFamily({
  key: "song",
  default: "",
});

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
  default: ""
});

export const relatedArtistsState = atom({
  key: "relatedArtists",
  default: "",
});

export const tokenState = atom({
  key: "token",
  default: "",
});

export const historyState = atom({
  key: "history",
  default: [],
});

export const rewindState = atom({
  key: "rewind",
  default: false,
});

export const songQueState = atom({
  key: "songQue",
  default: "",
});

export const currentTimeState = atom({
  key: "currentTime",
  default: 0,
});

export const timeState = atom({
  key: "time",
  default: 0,
});

export const songRestartState = atom({
  key: "songRestart",
  default: false,
});

export const rangeValueState = atom({
  key: "rangeValue",
  default: 0.1,
});

export const volumeState = atom({
  key: "volume",
  default: 0.5,
});

export const ArtistState = atom({
  key: "artist",
  default: "",
});

export const trackState = atomFamily({
  key: "track",
  default: "",
});

export const posState = atom({
  key: "position",
  default: 0
})

export const onShuffleState = atom({
  key: "onShuffle",
  default: false
})

export const queueState = atom({
  key: "queue",
  default: []
})
