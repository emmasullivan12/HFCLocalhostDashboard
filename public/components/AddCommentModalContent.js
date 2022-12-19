// Dex last merged this code on 8th feb 2022

import React, { Component } from "react";

class AddCommentModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageFromServer: '',
    };
  }

  handleSubmit = (e) => {
    this.setState({ messageFromServer: 'Comment added' });
  }

  render() {
    const { messageFromServer} = this.state;

    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            ADD COMMENT CONTENT GOES HERE
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div className="modal-title">
          <div className="emoji-icon tada-emoji successBox" />
          Comment added
        </div>
      )
    }
  }
}


export default AddCommentModalContent;
