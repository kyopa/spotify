import { useState, useEffect, useMemo } from "react";
import hamming from "../hamming";
import { searchResultsState, searchState, tokenState } from "../recoil/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

// Searches spotify api everytime search input field changes
// this could probably be a hook rather than a component tbh

function Search() {
  const [token, setToken] = useRecoilState(tokenState);
  const [search, setSearch] = useRecoilState(searchState);
  const setSearchResults = useSetRecoilState(searchResultsState);

  useEffect(() => {
    if (!token) return;
    if (search === "") return

    searchApi()
      .then((data) => data.json())
      .then((res) => {
        setSearchResults(res);
      })
      .catch((err) => {
        if (err.status === 404) alert("heeye")
      });
  }, [search]);

  const searchApi = () => {
    return fetch(
      `https://api.spotify.com/v1/search?q=${
        search || " "
      }&type=track%2Cartist%2Calbum%2Cplaylist%2Cshow%2Cepisode&market=US&limit=20`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
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
