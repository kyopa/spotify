import { selector, selectorFamily } from "recoil";
import {
  ArtistState,
  currentSongState,
  searchedSongState,
  searchResultsState,
  searchState,
  tokenState,
  topResultState,
} from "./atoms";
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
    if (!song) return;
    const res = await fetchSong(song, token);
    const data = await res.json();
    const artists = data.artists.map((artist) => artist.id);
    const resTwo = await fetchQueue(
      data.id,
      artists.slice(0, 3).join(","),
      token
    );
    const dataTwo = await resTwo.json();
    const arr = [
      data,
      ...dataTwo.tracks.sort((a, b) => a.popularity - b.popularity).reverse(),
    ];
    return arr.filter((song) => song.preview_url !== null);
  },
});

export const lengthState = selector({
  key: "length",
  get: async ({ get }) => {
    const currentSong = get(currentSongState);
    const token = get(tokenState);
    if (!currentSong) return;
    if (!token) return;
    const res = await fetchSong(currentSong, token);
    const data = await res.json();
    console.log(data);
    return getLength(data);
  },
});

export const artistItemsState = selectorFamily({
  key: "artistItems",
  get:
    (type) =>
    async ({ get }) => {
      const token = get(tokenState);
      const artist = get(ArtistState);
      if (!artist) return;
      switch (type) {
        case "singles":
          try {
            const res = await fetchArtistSingles(artist, token);
            const data = await res.json();
            return data;
          } catch (err) {
            console.log(err);
          }
        case "topTracks":
          try {
            const resX = await fetchTopTracks(artist, token);
            const dataX = await resX.json();
            return dataX;
          } catch (err) {
            console.log(err);
          }
        case "albums":
          try {
            const resY = await fetchArtistAlbums(artist, token);
            const dataY = await resY.json();
            return dataY;
          } catch (err) {
            console.log(err);
          }

        case "appearsOn":
          try {
            const resF = await fetchApperances(artist, token);

            const dataF = await resF.json();
            console.log(dataF);
            return dataF.items.filter(
              (album) => album.album_group === "appears_on"
            );
          } catch (err) {
            console.log(err);
          }
        case "relatedArtists":
          try {
            const resG = await fetchRelatedArtists(artist, token);
            const dataG = await resG.json();
            return dataG;
          } catch (err) {
            console.log(err);
          }
      }
    },
});


const fetchTopTracks = (artist, token) => {
  if (!artist) return;
  return fetch(
    `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US&limit=40`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const fetchArtistSingles = (artist, token) => {
  if (!artist) return;
  return fetch(
    `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=single&market=US`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const fetchArtistAlbums = (artist, token) => {
  console.log(artist)
  if (!artist) return;
  return fetch(
    `https://api.spotify.com/v1/artists/${artist.id}/albums?market=US`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const fetchApperances = (artist, token) => {
  if (!token) return;
  return fetch(
    `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=appears_on&market=US&limit=20`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export async function fetchRelatedArtists(artist, token) {
  if (!token) return;
  return fetch(
    `https://api.spotify.com/v1/artists/${artist.id}/related-artists`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function fetchArtistsBySearch(search, token) {
  if (!token) return;
  return fetch(
    `https://api.spotify.com/v1/search?q=${search}&type=artist&limit=40`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
