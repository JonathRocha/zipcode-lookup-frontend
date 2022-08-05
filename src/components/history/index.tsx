import { useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import { searchHistory } from "../../hooks/useAddressSearch";

import "./styles.scss";

export const History = () => {
  const addressHistory = useReactiveVar(searchHistory);

  return (
    <div className="history">
      <h1>Your searchs</h1>

      <ul className="history_list">
        {addressHistory.map((address, index) => (
          <li key={index} className="history_list--item">
            <span>
              {address.placeName}, {address.state} {address.postCode} - {address.country}
            </span>
            <span>
              <Link to={`/${address.postCode}/map`}>View on map</Link>
            </span>
          </li>
        ))}
      </ul>

      {addressHistory.length > 0 && (
        <div className="history_action">
          <button className="history_action--button" onClick={() => searchHistory([])}>
            Clear history
          </button>
        </div>
      )}
    </div>
  );
};
