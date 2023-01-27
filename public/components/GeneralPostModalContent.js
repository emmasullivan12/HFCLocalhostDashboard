// Dex last merged this code on 30th dec 2022

import React, { Component } from "react";

class GeneralPostModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {post} = this.props
    return (
      <React.Fragment>
        <div className="modal-title">
          General Post goes here!
          {post.text}
        </div>
      </React.Fragment>
    );
  }
}


export default GeneralPostModalContent;
