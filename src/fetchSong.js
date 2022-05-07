import { useRecoilValue } from "recoil";
import { tokenState } from "./recoil/atoms";


const fetchSong = (song, token) => {
  if (!token) return
  if (!song) return
  return fetch(`https://api.spotify.com/v1/tracks/${song}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const fetchQueue = (song, artists, token) => {
  if (!token) return
  return fetch(
    `https://api.spotify.com/v1/recommendations?limit=40&market=US&seed_artists=${artists}&seed_tracks=${song}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export default fetchSong;
