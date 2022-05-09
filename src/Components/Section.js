import { Suspense } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ArtistState } from "../recoil/atoms";
import Row from "./Row";

function Section(props) {
  const setArtist = useSetRecoilState(ArtistState);
  if (!props.array) return;
  return (
    <div className="section">
      <div className="row-see-all">
        <h2 id="section-title">{props.title}</h2>
        {props.array && props.array.length >= 8 && (
          <Link
            onClick={() => {
              setArtist(props.artist);
            }}
            to={
              !props.disco
                ? `/search/${props.type}`
                : `/artist/${props?.artist?.id}/discography`
            }
            id="see-all"
          >
            <div style={{ marginRight: props.disco ? "35px" : null }}>
              {props.open || "See All"}
            </div>
          </Link>
        )}
      </div>
      <Suspense fallback={<div>hello</div>}>
        <Row fromSearchpage={props.fromSearchpage} array={props.array} album={props.album || props.disco} />
      </Suspense>
    </div>
  );
}

export default Section;
