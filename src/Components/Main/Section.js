import { Suspense } from "react";
import { Link } from "react-router-dom";
import Row from "./Row";


function Section(props) {
  if (!props.array) return;
  console.log(props.type)
  return (
    <div className="section">
      <div className="row-see-all">
        <h2 id="section-title">{props.title}</h2>
        {props.array && props.array.length >= 8 && (
          <Link to={`/search/${props.type}`} id="see-all">
            {props.open || "See All"}
          </Link>
        )}
      </div>
      <Suspense fallback={<div>hello</div>}>
        <Row array={props.array} album={props.album} />
      </Suspense>
    </div>
  );
}

export default Section;
