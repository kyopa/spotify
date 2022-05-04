import { useEffect, useState } from "react";
import { BrowserRouter, useMatch } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ArtistState, searchState, tokenState } from "../../recoil/atoms";
import { artistItemsState } from "../../recoil/selectors";
import "./Artist.css";
import Vibrant, { getHex } from "node-vibrant/lib/config";
import GreenPlayButton from "../greenPlayButton/x";
import Track from "./Track";
import Discography from "./Discography";
import Similar from "./Similar";
import Section from "../Main/Section";

function Artist() {
  const match = useMatch("/artist/:id");
  const { params } = match;
  const token = useRecoilValue(tokenState);
  const [artist, setArtist] = useRecoilState(ArtistState);
  const setSearch = useSetRecoilState(searchState) 
  const similar = useRecoilValue(artistItemsState("relatedArtists"))

  useEffect(() => {
    if (!token) return
    fetchArtist(params.id, token)
      .then((res) => res.json())
      .then((data) => setArtist(data));
    return () => {
      setArtist("")
      setSearch("")
    };
  }, []);

  return (
    <div className="artist-page">
      {artist && (
        <div>
          <Header />
          <PlayFollow />
          <Popular />
          <Discography />
          <Similar />
        </div>
      )}
    </div>
  );
}

function Header() {
  const artist = useRecoilValue(ArtistState);
  return (
    <div className="artist-header">
      <div className="header-contents">
        <img src={artist.images[0].url}></img>
        <div className="header-details">
          <div>verified Artist</div>
          <h1>{artist.name}</h1>
          <div id="listeners">monthly listeners</div>
        </div>
      </div>
    </div>
  );
}

function PlayFollow() {
  const [following, setFollowing] = useState(false);
  return (
    <div className="playfollow-container">
      <button id="play">P</button>
      <button id="follow" onClick={() => setFollowing(!following)}>
        {!following ? "follow" : "following"}
      </button>
    </div>
  );
}

function Popular() {
  const topTracks = useRecoilValue(artistItemsState("topTracks"));
  const [hide, setHide] = useState(true);

  return (
    <div className="popular">
      {topTracks && (
        <div>
          <h2>Popular</h2>
          <div className="tracks-container" style={{}}>
            {topTracks.tracks.map((track, i) => {
              return (
                <Track
                key={i}
                  hide={i >= 5 && hide === true}
                  track={track}
                  num={i + 1}
                />
              );
            })}
          </div>
          <div id="hide" onClick={() => setHide(!hide)}>
            {hide ? "show all" : "show less"}
          </div>
        </div>
      )}
    </div>
  );
}

const fetchArtist = (id, token) => {
  if (!token) return
  return fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export default Artist;
