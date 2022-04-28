import { useState, useEffect, useMemo } from "react";
import { useContext } from "react";
import {
  tokenContext,
  AlbumsContext,
  ArtistsContext,
  SearchContext,
  topAlbumContext,
  topArtistContext,
  topTrackContext,
  TracksContext,
} from "../Context";
import hamming from "../hamming";
import { debounce } from "lodash";
import {
  albumsState,
  artistsState,
  searchState,
  tokenState,
  topAlbumState,
  topArtistState,
  topTrackState,
  tracksState,
} from "../atoms";
import {
  useRecoilCallback,
  useRecoilState,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

// Searches spotify api everytime search input field changes
// this could probably be a hook rather than a component tbh

function Search() {
  const [token, setToken] = useRecoilState(tokenState);
  const [search, setSearch] = useRecoilState(searchState);
  const setTopTrack = useSetRecoilState(topTrackState);
  const setTopAlbum = useSetRecoilState(topAlbumState);
  const setTopArtist = useSetRecoilState(topArtistState);
  const setArtists = useSetRecoilState(artistsState);
  const setAlbums = useSetRecoilState(albumsState);
  const setTracks = useSetRecoilState(tracksState);

  // how many items to search for
  let limit = "20";

  // idk if im supposed to update state like this
  // rather than setTracks()
  const updateTracks = useRecoilCallback(({ snapshot, set }) => (arr) => {
    set(tracksState, arr);
  });

  // everytime search changes this will set a lot of state
  useEffect(() => {
    if (!token) return;

    searchApi()
      .then((data) => data.json())
      .then((res) => {
        setTopTrack(res.tracks.items[0]);

        setTopArtist(res.artists.items[0] || res.tracks.items[0].artists[0]);

        if (res.artists.items.length > 1) {
          if (
            res.artists.items[0].popularity < res.artists.items[1].popularity
          ) {
            setTopArtist(res.artists.items[1]);
          }
        }
        fetchAlbum(res.albums.items[0])
          .then((data) => data.json())
          .then((res) => setTopAlbum(res))
          .catch((err) => console.log(err));

        setAlbums([]);
        res.albums.items.map((album) => {
          fetchAlbum(album)
            .then((data) => data.json())
            .then((res) => {
              setAlbums((prev) => [...prev, res]);
            })
            .catch((err) => console.log(err));
        });
        updateTracks([]);
        const sorted = res.tracks.items.sort(
          (a, b) => a.popularity - b.popularity
        );
        updateTracks(sorted.reverse());
        res.artists.items.map((artist) => {
          setArtists((prev) => [...prev, artist]);
        });
      })
      .catch((err) => console.log(err));
  }, [search]);

  const searchApi = () => {
    return fetch(
      `https://api.spotify.com/v1/search?q=${search}&type=track%2Cartist%2Calbum%2Cplaylist%2Cshow%2Cepisode&market=US&limit=${limit}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const fetchAlbum = (album) => {
    return fetch(`https://api.spotify.com/v1/albums/${album.id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <input
        onChange={(e) => setSearch(e.target.value)}
        className="searchbar-input"
        placeholder="Artists, songs or podcasts"
      ></input>
    </div>
  );
}

export default Search;
