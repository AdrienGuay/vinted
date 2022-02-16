import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bad_getaway">
      <p className="not_found">404</p>
      <p>Page not found</p>
      <p>The page you are looking for doesn't exist...</p>
      {/* Revenir sur homepage */}
      <Link className="gb" to="/">
        Go back
      </Link>
    </div>
  );
};

export default NotFound;
