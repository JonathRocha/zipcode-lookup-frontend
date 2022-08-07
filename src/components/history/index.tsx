import { searchHistory } from "@/hooks/useAddressSearch";
import { useReactiveVar } from "@apollo/client";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "@/components/history/styles.scss";

export const History = () => {
  const addressHistory = useReactiveVar(searchHistory);

  const handleClick = useCallback(() => {
    searchHistory([]);
    toast.success("History cleared");
  }, []);

  return (
    <div className="history">
      <h1>Your last five searchs</h1>

      <ul className="history_list">
        {addressHistory.map((address, index) => (
          <li key={index} className="history_list--item">
            <span>
              {address.placeName}, {address.state} {address.postCode} - {address.country}
            </span>
            <span>
              <Link to={`/${address.countryCode}/${address.postCode}/map`}>View on map</Link>
            </span>
          </li>
        ))}
      </ul>

      {addressHistory.length > 0 && (
        <div className="history_action">
          <button className="history_action--button" type="button" onClick={handleClick}>
            Clear history
          </button>
        </div>
      )}
    </div>
  );
};
