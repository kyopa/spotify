import { useSetRecoilState } from "recoil";
import { queueState } from "../recoil/atoms";
import { fetchQueue } from "../fetchSong";
import fetchSong from "../fetchSong";
import { fetchTopTracks } from "../recoil/selectors";

export const queArtistSongs = async (artist, token) => {
  const fetchTracks = () => {
    return fetch(`https://api.spotify.com/v1/artists/${artist?.id || artist}/albums`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };
  console.log(artist)

  const resX = await fetchTopTracks({ id: artist?.id || artist }, token, 10);
  const dataX = await resX.json();
  console.log(dataX);

  const res = await fetchTracks();
  const data = await res.json();
  const arr = await data.items.map((album) => {
    const id = album.id;
    return fetchAlbumTracks(id, token)
      .then((res) => res.json())
      .then((data) => data.items);
  });
  const array = await Promise.all([...arr]).then((res) => [...res]);
  const final = array.map((album) => album);
  return [...dataX.tracks, ...final.flat()];
};

export const fetchAlbumTracks = (album, token) =>
  fetch(`https://api.spotify.com/v1/albums/${album}/tracks`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const queAlbumSongs = async (album, token) => {
  const res = await fetchAlbumTracks(album, token);
  const data = await res.json();
  return data.items;
};
