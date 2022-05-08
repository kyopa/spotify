import { useRecoilValue } from "recoil";
import { getToken } from ".";
import { tokenState } from "./recoil/atoms";


const fetchSong = async (song, token) => {
  let tocen;
  if (!token) {
    const res = await getToken();
    const data = await res.json();
    tocen = data.access_token
  }
  console.log(song)
  
  return fetch(`https://api.spotify.com/v1/tracks/${song}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token || tocen}`,
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
