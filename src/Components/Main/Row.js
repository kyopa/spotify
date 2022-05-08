import { useState } from "react";
import { useEffect } from "react";
import blackImg from "../../extra/blackImage.webp";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import GreenPlayButton from "../greenPlayButton/x";
import "../greenPlayButton/x.css";
import playIcon from "../../extra/playIcon.png";
import ContextMenu from "../ContextMenu/ContextMenu";
import useContextMenu from "../ContextMenu/useContextMenu";

function Row({ array, album }) {
  if (!array[0]) return;

  return (
    <div>
      <div className="item-row">
        {array &&
          (array.length > 1 ? (
            array.slice(0, 7).map((item) => {
              return (
                <Item
                  id={item.id}
                  key={item.id}
                  album={album}
                  item={item}
                  artist={item.type === "artist" ? true : false}
                />
              );
            })
          ) : (
            <Item
              id={array[0].id}
              key={array[0].id}
              album={album}
              item={array[0]}
              artist={array[0].type === "artist" ? true : false}
            />
          ))}
      </div>
    </div>
  );
}

function Item({ item, artist, album }) {
  const img = useMemo(() => {
    if (!item) return;

    if (item.images === undefined || item.images.length === 0) {
      return blackImg;
    } else return item.images[0].url;
  });
  const { handleMenu } = useContextMenu();
  const [selected, setSelected] = useState();
  console.log(selected)

  return (
    <Link title={item.type} to={`/${item.type}/${item.id}`} id={item.id}>
      <div
        onContextMenu={(e) => {
          if (!album) return;
          handleMenu(e);
          setSelected(e.target.id)
        }}
        className="item-details"
        id={item.id}
        title={item.type}
      >
        {album && <ContextMenu selected={selected} type="album"/>}
        <div id={item.id} className="item-image">
          <img id={item.id} className={album ? "album" : ""} src={img}></img>
          <GreenPlayButton
            type={item.type}
            animate
            bottom="13px"
            right="8px"
            position="absolute"
          />
        </div>
        <div id={item.id} className="item-name">{item.name}</div>
        {artist && <div className="typerow">Artist</div>}
        {!artist && (
          <div id={item.id} className="album-details">
            <span id={item.id}>{item.release_date.substring(0, 4)}</span>{" "}
            <span id="dot"> • </span>
            {item.artists.map((artist, index) => {
              return (
                <span key={crypto.randomUUID()}>
                  {index !== item.artists.length - 1 ? (
                    <a id={item.id}> {artist.name}, </a>
                  ) : (
                    <a id={item.id}> {artist.name}</a>
                  )}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
}

export default Row;
