import React, { Component } from "react";
import ReactDOM from "react-dom";
import PrMessagesList from "./PrMessagesList";
import PrAddMessage from "./PrAddMessage";
import "../css/ChatWindow.css";


// FlexContainerContent provides all of the Content within FlexContainer
const FlexContainerContent = ({
  content
}) => {
  return (
    <div className="flex-container-overlay">
      <div className="flex-container-container">
        <div className="flex-container-header">
          Title goes here
        </div>
        <div className="flex-container-content">
          {content}
        </div>
      </div>
    </div>
  );
}

//To do
// This is a container for all messages in the chat
class ChatWindow extends Component {
  constructor () {
    super();
    this.state = {
      isFlexContainerOpen: false
    }
    this.toggleFlexContainer = this.toggleFlexContainer.bind(this);
  }

  toggleFlexContainer() {
    const currentState = this.state.isFlexContainerOpen;
    this.setState({ isFlexContainerOpen: !currentState });
  }

  render() {
  const {isFlexContainerOpen} = this.state;
  const {flexContent} = this.props;

    return (
      <React.Fragment>
        <div className="chat-container">
          <div className="chat-content-container">
            <div className="chat-header">
              <div className="chat-detail-container">
                <div className="chat-title">
                  Chat name
                </div>
              </div>
              <div className="more-info-container">
                <button type="button" className="other-user-profile" onClick={this.toggleFlexContainer}>
                  <span className="see-matchs-profile">See your Mentor&apos;s Profile </span>
                </button>
              </div>
            </div>
            <div className="messages-panel">
              <PrMessagesList />
              <PrAddMessage />
            </div>
          </div>
          {isFlexContainerOpen && (
            <FlexContainerContent
              content={flexContent}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ChatWindow;
