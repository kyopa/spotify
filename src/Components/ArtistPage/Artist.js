import { Suspense, useEffect, useMemo, useState } from "react";
import { BrowserRouter, useMatch } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ArtistState,
  currentSongState,
  searchState,
  tokenState,
} from "../../recoil/atoms";
import { artistItemsState } from "../../recoil/selectors";
import "./Artist.css";
import Vibrant, { getHex } from "node-vibrant/lib/config";
import GreenPlayButton from "../greenPlayButton/x";
import Track from "./Track";
import Discography from "./Discography";
import Similar from "./Similar";
import Section from "../Main/Section";
import { useColor } from "color-thief-react";
import FadeColor, { useGetColor } from "../FadeColor";

function Artist() {
  const match = useMatch("/artist/:id");
  const { params } = match;
  const token = useRecoilValue(tokenState);
  const [artist, setArtist] = useRecoilState(ArtistState);
  const setSearch = useSetRecoilState(searchState);

  useEffect(() => {
    if (!token) return;
    fetchArtist(params.id, token)
      .then((res) => res.json())
      .then((data) => setArtist(data));
    return () => {
      setArtist("");
      setSearch("");
    };
  }, []);

  const src = useMemo(() => {
    if (!artist) return;
    console.log(artist.followers.total.toLocaleString());
    return artist.images[0].url;
  }, [artist]);

  const data = useGetColor(src);

  return (
    <div className="artist-page">
      {artist && (
        <div id="artist-page-box">
          <Header color={data} />
          <FadeColor data={data} />
          <PlayFollow />
          <Popular artist={artist}/>
          <Discography />
          <Similar />
        </div>
      )}
    </div>
  );
}

function Header({ color }) {
  const artist = useRecoilValue(ArtistState);

  return (
    <div
      className="artist-header"
      style={{
        background: `linear-gradient(transparent 0,rgba(0,0,0,.5) 100%), ${color}`,
      }}
    >
      <div className="header-contents">
        <img src={artist.images[0].url}></img>
        <div className="header-details">
          <div>Verified Artist</div>
          <h1 id="header-artist-name">{artist.name}</h1>
          <div id="listeners">
            {artist.followers.total.toLocaleString()} monthly listeners
          </div>
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

function Popular({artist}) {
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
                <Suspense fallback={<h1>loading track</h1>}>
                  <Track artist={artist.id}
                    key={i}
                    hide={i >= 5 && hide === true}
                    track={track}
                    num={i + 1}
                  />
                </Suspense>
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
  if (!token) return;
  return fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export default Artist;
