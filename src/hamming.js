import { useRecoilValue } from "recoil";
import { searchState } from "./recoil/atoms";

const hamming = (topArtist, topTrack, topAlbum, search) => {
  const long = [topArtist.name, topTrack.name, topAlbum.name].sort(
    (a, b) => a.length - b.length
  )[2];

  let track = {
    ...topTrack,
    txt: "",
    dist: 0,
  };
  let artist = {
    ...topArtist,
    txt: "",
    dist: 0,
  };
  let album = {
    ...topAlbum,
    txt: "",
    dist: 0,
  };

  [...long].forEach((l, i) => {
    !topTrack.name[i]
      ? (track.txt += "'")
      : (track.txt += topTrack.name[i].toLowerCase());
    !topArtist.name[i]
      ? (artist.txt += "`")
      : (artist.txt += topArtist.name[i].toLowerCase());
    !topAlbum.name[i]
      ? (album.txt += "^")
      : (album.txt += topAlbum.name[i].toLowerCase());
  });

  [...track.txt].forEach((l, i) => {
    return l != search[i] ? (track.dist += 1) : null;
  });
  [...artist.txt].forEach((l, i) => {
    return l != search[i] ? (artist.dist += 1) : null;
  });

  [...album.txt].forEach((l, i) => {
    return l != search[i] ? (album.dist += 1) : null;
  });

  let topResult;
  const arr = [album, artist, track].sort((a, b) => a.dist - b.dist);
  const dist = arr[0].dist;

  if (arr[0].dist === arr[1].dist) {
    const distArr = arr.filter((item) => item.dist === dist);
    return distArr.sort((a, b) => a.popularity - b.popularity)[
      distArr.length - 1
    ];
  } else topResult = arr[0];

  return topResult;
};

export default hamming;
