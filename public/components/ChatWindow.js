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
      isFlexContainerOpen: false,
      dragover: '',
    }
    this.toggleFlexContainer = this.toggleFlexContainer.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
  }

  // FILE DROP ACTIVITY

  handleDragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({dragover: 'dragover'});
  }

  handleDragLeave(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({dragover: ''});
  }

  handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; // changes the mouse cursor to a "+" to show user it's a copy action and active
    this.setState({dragover: 'dragover'});
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
                <div className="chat-title overflow-ellipsis">
                  Chat name
                </div>
              </div>
              <div className="more-info-container">
                <button type="button" className="other-user-profile button-unstyled" onClick={this.toggleFlexContainer}>
                  <span className="see-matchs-profile">See your Mentor&apos;s Profile </span>
                </button>
              </div>
            </div>
            <div id="drop-zone" className={"messages-panel messages-panel-" +this.state.dragover} onDragEnter={this.handleDragEnter} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave}>
              <div>
                <PrMessagesList />
              </div>
            </div>
            <PrAddMessage />
            <form onSubmit={this.handleFileSelect} encType="multipart/form-data">
              <input
                type="file"
                name="selectedFiles"
                onChange={this.onChange}
                multiple
              />
              <button type="submit">Upload</button>
            </form>
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
