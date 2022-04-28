import { atom } from "recoil";

export const currentSongState = atom({
  key: "currentSong",
  default: { playing: false, init: true },
});

export const fourState = atom({
  key: "four",
  default: "",
});

export const songState = atom({
  key: "song",
  default: "",
});

export const pauseState = atom({
  key: "pause",
  default: false,
});

export const rendersState = atom({
  key: "renders",
  default: 0,
});

export const tracksState = atom({
  key: "tracks",
  default: "",
});

export const albumsState = atom({
  key: "albums",
  default: "",
});

export const artistsState = atom({
  key: "artists",
  default: "",
});

export const searchState = atom({
  key: "search",
  default: "",
});

export const topArtistState = atom({
  key: "topArtist",
  default: "",
});

export const topTrackState = atom({
  key: "topTrack",
  default: "",
});

export const topAlbumState = atom({
  key: "topAlbum",
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
