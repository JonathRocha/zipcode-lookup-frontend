import { Link } from "react-router-dom";

import "@/pages/notFound/styles.scss";

export const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found_title">Page not found</h1>
      <Link className="not-found_link" to="/">
        Go to home
      </Link>
    </div>
  );
};
