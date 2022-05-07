import { useRecoilCallback } from "recoil";
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
        const currentSong = snapshot.getLoadable(currentSongState).contents;
        const token = snapshot.getLoadable(tokenState).contents;
        if (song.id === currentSong.id) {
          const onPause = snapshot.getLoadable(onPauseState).contents;
          set(onPauseState, !onPause);
        } else {
          set(currentSongState, song);
          set(onPauseState, false);
          set(posState, idx);
          const queue = snapshot.getLoadable(queueState).contents;
          const cleanQue = queue.filter((song) => song.que);
          if (type === "searchpage") {
            const search = snapshot.getLoadable(searchState).contents;
            const arr = await searchPageArr(search, token);
            set(queueState, [arr[0], ...cleanQue, ...arr.slice(1)]);
          } else if (type === "albumpage") {
            const arr = await queAlbumSongs(item.id, token);
            set(queueState, [arr[0], ...cleanQue, ...arr.slice(1)]);
          } else if (type === "artistpage") {
            const arr = await queArtistSongs(item, token);
            console.log([arr[0], ...cleanQue, ...arr.slice(1)])
            console.log(idx)
            set(queueState, [arr[0], ...cleanQue, ...arr.slice(1)])
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
