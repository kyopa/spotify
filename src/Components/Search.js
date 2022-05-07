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
    if (!search) return
    searchApi()
      .then((data) => data.json())
      .then((res) => {
        console.log(search);
        console.log(res);
        setSearchResults(res);
      })
      .catch((err) => {
        if (err.status === 404) alert("heeye");
      });
  }, [search]);

  const searchApi = () => {
    if (!token) return
    return fetch(
      `https://api.spotify.com/v1/search?q=${search}&type=track%2Cartist%2Calbum&market=US&limit=50`,
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
        id="search"
        autoComplete="off"
        spellCheck="false"
        onChange={(e) => setSearch(e.target.value)}
        className="searchbar-input"
        placeholder="Artists, songs or podcasts"
      ></input>
    </div>
  );
}

export default Search;
