import { useEffect, useState } from "react";
import { BrowserRouter, useMatch } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ArtistState, tokenState } from "../../recoil/atoms";
import {
  artistItemsState,
  artistSingles,
  artistSinglesState,
  artistTopTracks,
} from "../../recoil/selectors";

function Artist() {
  const match = useMatch("/artist/:id");
  const { params } = match;
  const token = useRecoilValue(tokenState);
  const [artist, setArtist] = useRecoilState(ArtistState);
  const topTracks = useRecoilValue(artistItemsState("topTracks"));
  const artistSingles = useRecoilValue(artistItemsState("singles"));
  const artistAlbums = useRecoilValue(artistItemsState("albums"));
  const appearsOn = useRecoilValue(artistItemsState("appearsOn"))
  const relatedArtists = useRecoilValue(artistItemsState("relatedArtists"))

  useEffect(() => {
    fetchArtist(params.id, token)
      .then((res) => res.json())
      .then((data) => setArtist(data));
    console.log(topTracks);
  }, []);


  useEffect(() => {
      console.log(appearsOn)
  }, [appearsOn]);




  return <div>{artist.name}</div>;
}

const fetchArtist = (id, token) => {
  return fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export default Artist;
