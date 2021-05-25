import React, { useState } from "react";
import "../css/preloader.scss";

function Preloader() {
  let msgs = [
    "Hi there!",
    "Pixel sus ><",
    "Did you know that botrix is opensource?",
    "poggies",
    "hi there, have an amazing day!",
    "looooaddddinngggg",
    "botrix.cc/secret",
    "o hello there :flooshed:",
    "ABC, Always be closing",
    "When life gives you lemons, make lemonade.",
    "If you're seeing this, you're a cutie.",
  ];

  let [msg, setMsg] = useState(msgs[Math.floor(Math.random() * msgs.length)]);

  return (
    <div>
      <div className="center-of-screen">
        <div class="loader">
          <svg class="circular" viewBox="25 25 50 50">
            <circle
              class="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke-width="2"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
        <br></br>
        <p>{msg}</p>
      </div>
    </div>
  );
}

export default Preloader;
