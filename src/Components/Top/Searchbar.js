import { Suspense } from "react";
import Search from "../Search";

function Searchbar() {
  return (
    <div className="searchbar-container">
      <form>
        <Suspense fallback={<h1>shit</h1>}>
        <Search />
        </Suspense>
      </form>
    </div>
  );
}

export default Searchbar;
