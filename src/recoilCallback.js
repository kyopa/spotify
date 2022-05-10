import { useRecoilCallback } from "recoil";
import { fetchQueue } from "./fetchSong";
import { queAlbumSongs, queArtistSongs, queRelatedSongs } from "./Queue/setQue";
import {
  currentSongState,
  onPauseState,
  currentTimeState,
  tokenState,
  queueState,
  trackState,
  searchState,
  posState,
} from "./recoil/atoms";

const useSetCurrentInfo = () => {
  return useRecoilCallback(
    ({ snapshot, set }) =>
      async (song, type, idx, item) => {
        set(queueState, []);
        const currentSong = snapshot.getLoadable(currentSongState).contents;
        const token = snapshot.getLoadable(tokenState).contents;
        console.log(song)
        console.log(currentSong)
        if (song.id === currentSong?.id) {
          const onPause = snapshot.getLoadable(onPauseState).contents;
          set(onPauseState, !onPause);
        } else {
          set(currentSongState, song);
          set(onPauseState, false);

          set(posState, { idx: idx, click: true });
          const queue = snapshot.getLoadable(queueState).contents;
          if (type === "searchpage") {
            const search = snapshot.getLoadable(searchState).contents;
            const arr = await searchPageArr(search, token);
            set(queueState, arr);
          } else if (type === "albumpage") {
            const arr = await queAlbumSongs(item.id, token);
            set(queueState, arr);
          } else if (type === "artistpage") {
            const arr = await queArtistSongs(item, token);
            console.log(arr)
            set(queueState, arr);
          } else if (type === "topresultSong") {
            const res = await fetchQueue(song.id, song.artists[0].id, token);
            const data = await res.json();
            if (!data) return;
            console.log(data)
            set(queueState, [song, ...data.tracks]);
          }
        }
      },
    []
  );
};

const searchPageArr = async (search, token) => {
  const res = await fetchTracks(search, token);
  const data = await res.json();
  return data.tracks.items;
};

export const fetchTracks = (search, token) => {
  return fetch(
    `https://api.spotify.com/v1/search?q=${search}&type=track&market=US&limit=50`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export default useSetCurrentInfo;
