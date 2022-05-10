import { useState } from "react";
import { useEffect } from "react";
import blackImg from "../extra/blackImage.webp";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import GreenPlayButton from "./greenPlayButton/x";
import playIcon from "../extra/playIcon.png";
import ContextMenu from "./ContextMenu/ContextMenu";
import useContextMenu from "./ContextMenu/useContextMenu";
import { useSetRecoilState, useRecoilState } from "recoil";
import { recentSearchesState, selectedItemState } from "../recoil/atoms";
import deleteIcon from "../extra/skull-scan.svg";
import RecentSearches from "./Main/RecentSearches";

function Row({ array, album, fromSearchpage }) {
  if (!array[0]) return;


  return (
    <div>
      <div className="item-row">
        {array &&
          (array.length > 1 ? (
            array.slice(0, 8).map((item) => {
              return (
                <Item
                  fromSearchpage={fromSearchpage}
                  key={item.id}
                  album={album}
                  item={item}
                  artist={item.type === "artist" ? true : false}
                />
              );
            })
          ) : (
            <Item
              fromSearchpage={fromSearchpage}
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

export function Item({
  item,
  artist,
  album,
  fromRecentSearches,
  fromSearchpage,
}) {
  const setRecentSearches = useSetRecoilState(recentSearchesState);
  const img = useMemo(() => {

    if (item.type === "track") {
      return item?.album?.images[0]?.url;
    }

    if (item.images === undefined || item.images.length === 0) {
      return blackImg;
    } else return item.images[0].url;
  });
  const { handleMenu } = useContextMenu();
  const setSelectedItem = useSetRecoilState(selectedItemState);


  return (
    <Link
      onClick={() =>
        fromSearchpage && setRecentSearches((prev) => [...prev, item])
      }
      title={item.type}
      to={`/${item.type === "artist" ? "artist" : "album"}/${item.id}`}
      id={item.id}
    >
      <div
        onContextMenu={(e) => {
          if (!album) return;
          handleMenu(e);
          setSelectedItem({ type: "album", id: item.id });
        }}
        className="item-details"
        id={item.id}
        title={item.type}
      >
        {album && <ContextMenu />}
        {fromRecentSearches && <Delete id={item.id} />}
        <div
          data-type={album ? "album" : "artist"}
          id={item.id}
          className="item-image"
        >
          <img id={item.id} className={album ? "album" : ""} src={img}></img>
          <GreenPlayButton
            artist={item.type === "artist" ? item : null}
            type={item.type}
            animate
            bottom="13px"
            right="8px"
            position="absolute"
            id={item.id}
          />
        </div>
        <div id={item.id} className="item-name">
          {item.name}
        </div>
        {artist && <div className="typerow">Artist</div>}
        {!artist && (
          <div id={item.id} className="album-details">
            <span id={item.id}>
              {!fromRecentSearches && item.release_date.substring(0, 4)}
            </span>{" "}
            {!fromRecentSearches && <span id="dot"> • </span>}
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

function Delete({ id }) {
  const [recentSearches, setRecentSearches] =
    useRecoilState(recentSearchesState);

  const handleClick = (e) => {
    e.preventDefault();
    setRecentSearches(recentSearches.filter((item) => item.id !== id));
  };

  return (
    <div onClick={(e) => handleClick(e)} id={id} className="delete">
      <img src={deleteIcon}></img>
    </div>
  );
}

export default Row;
