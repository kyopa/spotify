import { useEffect, useMemo, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/atoms";
import GreenPlayButton from "../greenPlayButton/x";
import dotsIcon from "../../extra/dots-horizontal.svg";
import { Link } from "react-router-dom";
import "./Album.css";
import Songs from "./Songs";
import { fetchArtistAlbums, fetchArtistSingles } from "../../recoil/selectors";
import Section from "../Main/Section";
import FadeColor, { useGetColor } from "../FadeColor";
import { getTotalLength } from "../../getLength";

function Album() {
  const token = useRecoilValue(tokenState);
  const [album, setAlbum] = useState([]);
  const [singles, setSingles] = useState([]);
  const [albums, setAlbums] = useState([]);
  const id = useParams().id;

  useEffect(() => {
    console.log(token, id);

    (async () => {
      try {
        console.log(id);
        const res = await fetchItem("albums", id);
        const data = await res.json();
        setAlbum(data);
        console.log(data);
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
      setAlbums([]);
      setSingles([]);
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

  const moreBy = useMemo(() => {
    return [...albums, ...singles];
  }, [albums, singles]);

  const fetchItem = (type, id) => {
    return fetch(`https://api.spotify.com/v1/${type}/${id}?market=US`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  const src = useMemo(() => {
    if (Array.isArray(album) || album.error) return;

    return album.images[0].url;
  }, [album]);
  // get most dominant color
  const data = useGetColor(src);
  console.log(data);

  return (
    <div className="album-page">
      <Header album={album} color={data} />
      <FadeColor data={data} />
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

function Header({ album, color }) {
  const length = getTotalLength(album.tracks);
  const { name } = album;

  return (
    <div
      className="album-header"
      style={{
        background: `linear-gradient(transparent 0,rgba(0,0,0,.5) 100%), ${color}`,
      }}
    >
      {album.images && (
        <div className="header-content">
          <img src={album.images[0].url}></img>
          <div className="album-details">
            <div id="type">{album.type}</div>
            <div
              style={{
                fontSize: `${
                  name.length < 12 ? 96 : name.length > 20 ? 72 : 48
                }px`,
              }}
              id="albumname"
            >
              {name}
            </div>

            <div className="minor-details">
              <div className="details-artists">
                {album.artists.map((artist) => {
                  console.log(artist);
                  return (
                    <Link id="artistlink" to={`/artist/${artist.id}`}>
                      {artist.name}
                    </Link>
                  );
                })}
              </div>
              <div id="releasedate">
                {" "}
                {new Date(album.release_date).getFullYear()}
              </div>
              <div className="total">
                {album.total_tracks}
                {album.total_tracks > 1 ? " songs" : " song"}, &#8203;
              </div>
              <div id="albumlength"> {length}</div>
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
  return <div id="label">{album.label}</div>;
}

export const removeDuplicates = (arr) => {
  return arr.filter(
    (item, idx) => arr.findIndex((o) => o.name === item.name) === idx
  );
};

export default Album;
