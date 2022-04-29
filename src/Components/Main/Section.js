import { Suspense } from "react";
import Row from "./Row";

function Section(props) {
  return (
    <div>
      <div className="row-see-all">
        <h2>{props.title}</h2>
        <a href="yo" id="see-all">
          See all
        </a>
      </div>
      <Suspense fallback={<div>hello</div>}>
        <Row array={props.array} album={props.album} />
      </Suspense>
    </div>
  );
}

export default Section;
