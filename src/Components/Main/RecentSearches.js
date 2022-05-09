import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { recentSearchesState } from "../../recoil/atoms";
import { removeDuplicates } from "../AlbumPage/Album";
import { Item } from "../Row";

function RecentSearches() {
  const [recentSearches, setRecentSearches] =
    useRecoilState(recentSearchesState);

  const finalProduct = useMemo(() => {
    return removeDuplicates(recentSearches);
  }, [recentSearches]);

  return (
    <div>
      <h2>Recent Searches</h2>

      <div className="item-row">
        {finalProduct &&
          finalProduct.reverse().map((item) => {
            console.log(item);
            return (
              <Item
                item={item}
                artist={item.type === "artist"}
                album={item.type === "album" || item.type === "track"}
                fromRecentSearches
              />
            );
          })}
        {finalProduct.length === 0 && <h1>go search some stuff</h1>}
      </div>
    </div>
  );
}

export default RecentSearches;
