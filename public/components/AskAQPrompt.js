// Dex last merged this code on 18th nov 2020

import React, { Component } from "react";

import "../css/General.css";

class AutoEnrollPrompt extends Component {
  render() {

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic askAQ" />
          <h2 className="landingCTATitle">
            Get your burning questions answered by real employees
          </h2>
          <p className="landingCTADesc">
            Click below to get started
          </p>
          <button type="button" className="Submit-btn">Ask a Question</button>
        </div>
      </section>
    );
  }
}

export default AutoEnrollPrompt;
