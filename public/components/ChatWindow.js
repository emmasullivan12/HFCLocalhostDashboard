import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/ChatWindow.css";

// This shows the user thumbnail picture
function Avatar(props) {
  return (
    <div className="msg-thumb-container">
      <img
        className="msg-thumb img-square"
        src={props.sender.avatarUrl}
        alt={props.sender.name}
      />
    </div>
  );
}

// This shows the sender name, timestamp & message content
class MessageContent extends Component {
  render() {
    const message = this.props.message;

    return(
      <React.Fragment>
        <div className="block-container">
          <div className="message-container">
            <Avatar sender={message.sender}/>
            <div className="message-content-box">
              <div className="sent-msg-info">
                <span className="sender-name">{message.sender.name}</span>
                <span className="msg-sent-time">{message.msgSentTime}</span>
              </div>
              <p className="message-content">
                {message.messageContent}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

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
  const messages = [];

  this.props.messages.forEach((message) => {
    messages.push(
      <MessageContent
        message={message}
        key={message.messageID}
      />
    );
  });

    return (
      <div className="chat-container">
        <div className="chat-content-container">
          <div className="chat-header">
            <div className="chat-detail-container">
              <div className="chat-title">
                {this.props.messages[0].chatTitle}
              </div>
            </div>
            <div className="more-info-container">
              <button type="button" className="other-user-profile" onClick={this.toggleFlexContainer}>
                <span className="see-matchs-profile">See your Mentor&apos;s Profile </span>
              </button>
            </div>
          </div>
          <div className="messages-panel">
            {messages}
          </div>
        </div>
        {isFlexContainerOpen && (
          <FlexContainerContent
            content={flexContent}
          />
        )}
      </div>
    );
  }
}
export default ChatWindow;
