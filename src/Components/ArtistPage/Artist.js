import { Suspense, useEffect, useMemo, useState } from "react";
import { BrowserRouter, useMatch, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ArtistState,
  searchState,
  tokenState,
} from "../../recoil/atoms";
import { artistItemsState } from "../../recoil/selectors";
import "./Artist.css";
import Track from "./Track";
import Similar from "./Similar";
import FadeColor, { useGetColor } from "../FadeColor";
import MiniDiscoGraphy from "./MiniDisco";
import useContextMenu from "../ContextMenu/useContextMenu";
import { selectedItemState } from "../../recoil/atoms";

function Artist() {
  const id = useParams().id;
  const token = useRecoilValue(tokenState);
  const [artist, setArtist] = useRecoilState(ArtistState);
  const setSearch = useSetRecoilState(searchState);

  useEffect(() => {
    console.log(token)
    if (!token) return;
    fetchArtist(id, token)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setArtist(data);
      });
    return () => {
      console.log("UNM;OUNT")
      setArtist();
      setSearch();
    };
  }, [id]);

  const src = useMemo(() => {
    if (!artist || !artist.images) return;
    
    return artist?.images[0]?.url;
  }, [artist]);

  const data = useGetColor(src);

  return (
    <div className="artist-page">
      {artist && (
        <div id="artist-page-box">
          <Header color={data} />
          <FadeColor data={data} />
          <PlayFollow />
          <Popular artist={artist} />
          <MiniDiscoGraphy />
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
        backgroundImage: `url(${artist?.images[0].url})`,
  
      }}
    >
      <div className="header-contents">
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

function Popular({ artist }) {
  const topTracks = useRecoilValue(artistItemsState("topTracks"));
  const [hide, setHide] = useState(true);
  const {handleMenu} = useContextMenu();
  const setSelectedItem = useSetRecoilState(selectedItemState);

  return (
    <div className="popular">
      {topTracks && (
        <div>
          <h2>Popular</h2>
          <div className="tracks-container" onContextMenu={(e) => handleMenu(e)}>
            {topTracks.tracks.map((track, i) => {
              return (
                <Suspense fallback={<h1>loading track</h1>}>
                  <Track
                    artist={artist.id}
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
