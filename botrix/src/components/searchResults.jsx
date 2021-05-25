import React from "react";
import SearchBot from "./searchBot";
import { Link } from "react-router-dom";

function SearchResults(props) {
  return (
    <div>
      <div>
        {props.results.map((bot) => {
          return (
            <Link
              onClick={props.focus}
              className="bot-link"
              to={`/bots/${bot.botid}`}
            >
              <SearchBot key={bot.username} bot={bot}></SearchBot>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResults;
