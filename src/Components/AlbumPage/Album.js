import { useEffect, useMemo, useState } from "react";
import { useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/atoms";
import GreenPlayButton from "../greenPlayButton/x";
import dotsIcon from "../../extra/dots-horizontal.svg";
import "./Album.css";
import Songs from "./Songs";
import { fetchArtistAlbums, fetchArtistSingles } from "../../recoil/selectors";
import Section from "../Main/Section";

function Album() {
  const id = useMatch("/album/:id").params.id;
  const token = useRecoilValue(tokenState);
  const [album, setAlbum] = useState([]);
  const [singles, setSingles] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (!id) return;
    if (!token) return;
    (async () => {
      try {
        const res = await fetchItem("albums", id);
        const data = await res.json();
        setAlbum(data);
        if (data.error) throw data.error;
      } catch (err) {
        console.log(err);
        if (err.status === 404) {
          const res = await fetchItem("tracks", id);
          const data = await res.json();
          const res2 = await fetchItem("albums", data.album.id);
          const data2 = await res2.json();
          setAlbum(data2);
        }
      }
    })();
    return () => {
      setAlbum([]);
      setAlbums([])
      setSingles([])
    };
  }, []);

  useEffect(() => {
    if (!album.artists) return;
    fetchArtistSingles(album.artists[0], token)
      .then((res) => res.json())
      .then((data) => {
        fetchArtistAlbums(album.artists[0], token)
          .then((res) => res.json())
          .then((data2) => {
            setAlbums(removeDuplicates(data2.items));
            setSingles(removeDuplicates(data.items));
          });
      });
  }, [album]);

  useEffect(() => {
    console.log(albums);
    console.log(singles);
  }, [albums, singles]);

  const moreBy = useMemo(() => {
    return [...albums, ...singles];
  }, [albums, singles]);

  useEffect(() => {
    console.log(moreBy);
  }, [moreBy]);

  console.log(id);
  const fetchItem = (type, id) => {
    return fetch(`https://api.spotify.com/v1/${type}/${id}?market=US`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="album-page">
      <Header album={album} />
      <Nav />
      <Songs album={album} />
      <Label album={album} />

      <div className="moreby">
        {moreBy && album.artists && (
          <Section
            array={moreBy}
            title={`More by ${album.artists[0].name}`}
            album
          />
        )}
      </div>
    </div>
  );
}

function Header({ album }) {
  console.log(album);
  return (
    <div className="album-header">
      {album.images && (
        <div className="header-content">
          <img src={album.images[0].url}></img>
          <div className="album-details">
            <div id="type">type</div>
            <div id="albumname">{album.name}</div>

            <div className="minor-details">
              <div>{album.artists[0].name}</div>
              <div>{album.release_date}</div>
              <div>{album.total_tracks} songs</div>
              <div>length</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Nav() {
  return (
    <div className="album-nav">
      <GreenPlayButton page position="relative" />
      <img id="dots" src={dotsIcon}></img>
    </div>
  );
}

function Label({ album }) {
  console.log(album);
  return <div id="label">{album.label}</div>;
}

const removeDuplicates = (arr) => {
  return arr.filter(
    (item, idx) => arr.findIndex((o) => o.name === item.name) === idx
  );
};

export default Album;
