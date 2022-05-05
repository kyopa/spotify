import { useState } from "react";
import { useEffect } from "react";
import blackImg from "../../extra/blackImage.webp";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import GreenPlayButton from "../greenPlayButton/x";
import "../greenPlayButton/x.css";
import playIcon from "../../extra/playIcon.png";

function Row({ array, album }) {
  if (!array[0]) return;

  return (
    <div>
      <div className="item-row">
        {array &&
          (array.length > 1 ? (
            array.slice(0, 8).map((item) => {
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

  return (
    <Link title={item.type} to={`/${item.type}/${item.id}`} id={item.id}>
      <div
        onContextMenu={(e) => console.log(e.type)}
        className="item-details"
        id={item.id}
        title={item.type}
      >
        <div className="item-image">
          <img className={album ? "album" : ""} src={img}></img>
          <GreenPlayButton
            animate
            bottom="13px"
            right="8px"
            position="absolute"
          />
        </div>
        <div className="item-name">{item.name}</div>
        {artist && <div className="type">Artist</div>}
        {!artist && (
          <div className="album-details">
            <span>{item.release_date.substring(0, 4)}</span>{" "}
            <span id="dot"> • </span>
            {item.artists.map((artist, index) => {
              return (
                <span key={crypto.randomUUID()}>
                  {index !== item.artists.length - 1 ? (
                    <a> {artist.name}, </a>
                  ) : (
                    <a> {artist.name}</a>
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
