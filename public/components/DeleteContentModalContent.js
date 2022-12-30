// Dex last merged this code on 8th feb 2022

import React, { Component } from "react";

class DeleteContentModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageFromServer: '',
    };
  }

  handleSubmit = (e) => {
    this.setState({ messageFromServer: 'Content deleted' });
  }

  render() {
    const { messageFromServer} = this.state;

    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            Are you sure you want to delete this post?
          </div>
          <div className="request-btn-container">
            <button type="button" className="Submit-btn" autoFocus onClick={this.handleSubmit}>
              Yes, Delete
            </button>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div className="modal-title">
          <div className="emoji-icon tada-emoji successBox" />
          Post deleted
        </div>
      )
    }
  }
}


export default DeleteContentModalContent;
