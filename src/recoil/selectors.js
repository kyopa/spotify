import { selector, selectorFamily } from "recoil";
import {
  searchResultsState,
} from "./atoms";
import hamming from "../hamming";

export const itemsState = selectorFamily({
  key: "items",
  get:
    (type) =>
    ({ get }) => {
      const searchResults = get(searchResultsState);
      if (searchResults.constructor === Array) return;
      console.log(searchResults[type])
      return searchResults[type].items
    },
});
