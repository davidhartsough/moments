import React from "react";
import "./Splash.css";

export default ({ children }) => (
  <main id="splash-bg">
    <div id="splash">
      <div id="splash-logo">
        <svg viewBox="0 0 500 100">
          <path
            id="curve"
            d="m73.14999,79.74007c4,-1.13256 65.5,-17.97249 178.6,-17.74969c111.3,0.2228 170.8,16.76566 175.1,18.00962"
          />
          <text width="500">
            <textPath xlinkHref="#curve">moments</textPath>
          </text>
        </svg>
      </div>
      {children}
    </div>
  </main>
);
