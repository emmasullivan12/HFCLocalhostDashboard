import React, { Component } from "react";
import "../css/PrAddMessage.css";
import EmojiModal from "./EmojiModal";

class PrAddMessage extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="new-message" className="chatWindow-footer">
          <div className="footer-container">
            <div className="input-box-container">
              <EmojiModal />
              <div className="input-flexContainer">
                <input className="input-box" placeholder="Message Prospela..."/>
                <button type="button" className="attachmentContainer">
                  <i className="fas fa-paperclip" />
                </button>
                <button type="button" className="picContainer">
                  <i className="far fa-image" />
                </button>
              </div>
            </div>
            <div className="msgInsights-bar">
              <div className="msgInsights-bar-left">
                Dexter is Typing...
              </div>
              <div className="msgInsights-bar-right">
                <b>*bold*</b>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default PrAddMessage;
