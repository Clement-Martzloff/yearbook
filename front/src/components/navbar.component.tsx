import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container px-3">
        <Link to="/students" className="navbar-brand">
          Yearbook
        </Link>
        <Link to="/add" className="btn btn-outline-light">
          Add student
        </Link>
      </div>
    </nav>
  );
}
