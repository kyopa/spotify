import { atom, atomFamily, selector } from "recoil";

export const currentSongState = atom({
  key: "currentSong",
  default: "",
});

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
  default: {
    "external_urls": {
        "spotify": "https://open.spotify.com/artist/1zNqQNIdeOUZHb8zbZRFMX"
    },
    "followers": {
        "href": null,
        "total": 1463095
    },
    "genres": [
        "melodic rap",
        "trap"
    ],
    "href": "https://api.spotify.com/v1/artists/1zNqQNIdeOUZHb8zbZRFMX",
    "id": "1zNqQNIdeOUZHb8zbZRFMX",
    "images": [
        {
            "height": 640,
            "url": "https://i.scdn.co/image/ab6761610000e5eb1489b2b245307f3bc5d51291",
            "width": 640
        },
        {
            "height": 320,
            "url": "https://i.scdn.co/image/ab676161000051741489b2b245307f3bc5d51291",
            "width": 320
        },
        {
            "height": 160,
            "url": "https://i.scdn.co/image/ab6761610000f1781489b2b245307f3bc5d51291",
            "width": 160
        }
    ],
    "name": "Swae Lee",
    "popularity": 82,
    "type": "artist",
    "uri": "spotify:artist:1zNqQNIdeOUZHb8zbZRFMX",
    "txt": "swae lee`````````````````````````````````````",
    "dist": 37
},
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

export const searchedSongState = atom({
  key: "searchedSong",
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
  default: .5
});

export const ArtistState = atom({
  key: "artist",
  default: ""
})
