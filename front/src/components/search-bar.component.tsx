import useSearchBar from "../hooks/useSearchBar";

export default function SearchBar() {
  const { searchBarState, dispatchEvent, CHANGE_TERM } = useSearchBar();

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex align-items-md-center px-3">
        <form className="bd-search">
          <input
            id="search-input"
            type="search"
            className="form-control"
            placeholder="Search students..."
            autoComplete="off"
            value={searchBarState.term}
            onChange={(event) => {
              dispatchEvent({
                name: CHANGE_TERM,
                payload: { term: event.target.value },
              });
            }}
          />
        </form>
      </div>
    </nav>
  );
}
