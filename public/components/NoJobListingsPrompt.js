// Dex last merged this code on 6th feb 2024

import React, { Component } from "react";


class NoJobListingsPrompt extends Component {
  render() {
    const {companyName} = this.props

    return (
      <section>
        <div className="contentBox landingCTA">
          <div className="placeholderPic askAQ" />
          <h2 className="landingCTATitle">
            <div>{companyName} hasn&#39;t listed any jobs yet. </div>
          </h2>
          <p className="landingCTADesc">
            <span>Looks like theres nobody here yet. Share a general highlight or invite others and we&#39;ll try to get this community going</span>
          </p>
        </div>
      </section>
    );
  }
}

export default NoJobListingsPrompt;
