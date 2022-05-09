import { selector, selectorFamily } from "recoil";
import {
  ArtistState,
  searchResultsState,
  tokenState,
  currentSongState,
} from "./atoms";
import fetchSong from "../fetchSong";
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

export const fetchAlbumTracks = (album, token) =>
  fetch(`https://api.spotify.com/v1/albums/${album}/tracks`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const lengthState = selector({
  key: "length",
  get: async ({ get }) => {
    const currentSong = get(currentSongState);
    const token = get(tokenState);
    if (!currentSong) return;
    if (!token) return;
    const res = await fetchSong(currentSong.id, token);
    const data = await res.json();

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
      console.log(artist)
      if (!artist) return;
      switch (type) {
        case "singles":
          try {
            const res = await fetchArtistSingles(artist, token, 50);
            const data = await res.json();
            return data;
          } catch (err) {
            console.log(err);
          }
          break;
        case "topTracks":
          try {
            const resX = await fetchTopTracks(artist, token, 10);
            const dataX = await resX.json();
            return dataX;
          } catch (err) {
            console.log(err);
          }
          break;
        case "albums":
          try {
            const resY = await fetchArtistAlbums(artist, token);
            const dataY = await resY.json();
            return dataY;
          } catch (err) {
            console.log(err);
          }
          break;
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
          break;
        case "relatedArtists":
          try {
            const resG = await fetchRelatedArtists(artist, token);
            const dataG = await resG.json();
            console.log(dataG)
            return dataG;
          } catch (err) {
            console.log(err);
          }
          break;
        default:
          console.log("lol")
      }
    },
});

export const fetchTopTracks = (artist, token, limit) => {
  console.log(artist.id)
  if (!artist) return;
  return fetch(
    `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US&limit=${limit}`,
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
    `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=single&market=US&limit=50`,
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
  if (!artist) return;
  return fetch(
    `https://api.spotify.com/v1/artists/${artist.id}/albums?market=US&limit=50`,
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
