import { selector, selectorFamily } from "recoil";
import { currentSongState, searchedSongState, searchResultsState, tokenState } from "./atoms";
import hamming from "../hamming";
import fetchSong, { fetchQueue } from "../fetchSong";
import getLength from "../getLength";

export const itemsState = selectorFamily({
  key: "items",
  get:
    (type) =>
    ({ get }) => {
      const searchResults = get(searchResultsState);
      if (searchResults.constructor === Array) return;
      return searchResults[type].items;
    },
});

export const queueState = selector({
  key: "queue",
  get: async ({ get }) => {
    const token = get(tokenState);
    const song = get(searchedSongState);
    console.log(token);
    if (!token) return;
    if (!song) return
    const res = await fetchSong(song, token);
    const data = await res.json();
    const artists = data.artists.map((artist) => artist.id);
    const resTwo = await fetchQueue(
      data.id,
      artists.slice(0, 3).join(","),
      token
    );
    const dataTwo = await resTwo.json();
    const arr = [data, ...dataTwo.tracks.sort((a, b) => a.popularity - b.popularity).reverse()]
    return arr.filter(song => song.preview_url !== null)
  },
});

export const lengthState = selector({
  key: "length",
  get: async ({get}) => {
    const currentSong = get(currentSongState);
    const token = get(tokenState)
    if (!currentSong) return
    if (!token) return
    const res = await fetchSong(currentSong, token)
    const data = await res.json();
    console.log(data)
    return getLength(data)
  }
})
