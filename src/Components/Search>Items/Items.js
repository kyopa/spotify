import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  constSelector,
  useGetRecoilValueInfo_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { ArtistState, searchState } from "../../recoil/atoms";
import { artistItemsState, itemsState } from "../../recoil/selectors";
import { Item } from "../Main/Row";
import Top from "../Top/Top";
import "./items.css";

function Items() {
  const type = useParams().id;
  const search = useRecoilValue(searchState);
  const items = useRecoilValue(
    itemsState(type === "artists" ? "artists" : "albums")
  );
  const relatedArtists = useRecoilValue(
    type === "artists"
      ? artistItemsState("relatedArtists")
      : constSelector(null)
  );
  const setArtist = useSetRecoilState(ArtistState);
  const [arr, setArr] = useState([]);

  console.log(items);
  console.log(relatedArtists);
  useEffect(() => {
    if (!items) return;
    if (type === "artists") {
      setArtist(items[0]);
    } else {
      setArr(items);
    }
  }, []);

  useEffect(() => {
    if (!relatedArtists) return;
    if (type !== "artists") return;
    setArr([items[0], ...relatedArtists.artists, ...items.slice(1)]);
  }, [relatedArtists]);

  return (
    <div className="items-container">
      <Top marginleft="32" />
      <div className="main-spacing itemspage">
        <h2>
          All {type} for "{search}"
        </h2>

        <div className="item-row items">
          {arr &&
            arr.map((item) => {
              console.log(item.type);
              return (
                <Item
                  item={item}
                  artist={item.type === "artist"}
                  album={item.type === "album"}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Items;
