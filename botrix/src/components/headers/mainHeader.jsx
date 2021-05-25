import React, { useRef, useState } from "react";
import "../../css/header.scss";
import { Link } from "react-router-dom";
import SearchResults from "../searchResults";
import Tag from "../tags";
import axios from "axios";
import { useMediaQuery } from 'react-responsive'
import Particles from 'react-particles-js';
import { config } from "../../config";

function MainHeader() {
  let [search, setSearch] = useState("");
  let [searchResults, setResults] = useState();
  let [focused, setFocused] = useState(false);
  let botBox = useRef();

  //improve preformace on moblie
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 800px)'
  })

  let focus = () => {
    setFocused(!focused);
    console.log(botBox.current);
    console.log(focused);
  };

  let getResults = (e) => {
    setSearch(e.target.value);
    //get search results

    axios
      .get(`${config.backend}/v1/bots/search?query=${search}`)
      .then((res) => {
        console.log(res.data);
        setResults(res.data.result);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="main-header">
        <div className="particles">
        {isDesktopOrLaptop ? <Particles /> : ""}
        </div>
        <div className="center-header">
          <h1>Botrix</h1>
          <p>
            Welcome to botrix.. {"<3"}
          </p>
          <div className="input-container">
            <input
              onChange={getResults}
              value={search}
              onFocusCapture={focus}
              placeholder="Search for some bots!"
              className="input-searcher"
            ></input>
            <button className="go-search">
              <img src={"/search.png"}></img>
            </button>
            <div className="search-results">
              {searchResults && focused == true ? (
                <SearchResults
                  focus={focus}
                  results={searchResults}
                ></SearchResults>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="tag-contianer">
            <Tag name="Anime"></Tag>
            <Tag name="Moderation"></Tag>
            <Tag name="Fun"></Tag>
            <Tag name="Utility"></Tag>
            <Tag name="Music"></Tag>
          </div>
        </div>
        <div className="wave-container">
          <svg xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="none" viewBox="0 0 1440 320"><path preserveAspectRatio="none" fill="#100f13" fill-opacity="1" d="M0,32L48,58.7C96,85,192,139,288,176C384,213,480,235,576,202.7C672,171,768,85,864,80C960,75,1056,149,1152,160C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
      </div>
    </div>
  );
}

/* use for search page later on

 <div className="input-container">
            <input
              onChange={getResults}
              value={search}
              onFocusCapture={focus}
              placeholder="Search for some bots!"
              className="input-searcher"
            ></input>
            <button className="go-search">
              <img src={"/search.png"}></img>
            </button>
            <div className="search-results">
              {searchResults && focused == true ? (
                <SearchResults
                  focus={focus}
                  results={searchResults}
                ></SearchResults>
              ) : (
                ""
              )}
            </div>
          </div>
 <button className="feelin-good">Give me something random </button>

*/          


export default MainHeader;
