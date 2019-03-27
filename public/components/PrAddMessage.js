import React, { Component } from "react";
import "../css/PrAddMessage.css";
import 'emoji-mart/css/emoji-mart.css'
import { NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/emojione.json'

class PrAddMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      showEmojis: false,
    }
  }

  handleEmojiClick = (evt) => {
    console.log(evt.unified)
    let sym = evt.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emojiPic = String.fromCodePoint(...codesArray)
    this.setState((prevState) => {
      return {text: prevState.text + emojiPic};
    })
  }

  handleMessageChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  showEmojis = (e) => {
    this.setState({
      showEmojis: true
    }, () => document.addEventListener('click', this.closeMenu))
  }

  closeMenu = (e) => {
    console.log(this.emojiPicker)
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
      this.setState({
        showEmojis: false
      }, () => document.removeEventListener('click', this.closeMenu))
    }
  }

  render() {
    const {showEmojis} = this.state;
    const {text} = this.state.text;

    return (
      <React.Fragment>
        <div id="new-message" className="chatWindow-footer">
          <div className="footer-container">
            <div className="input-box-container">
              <button type="button" className="emojiContainer" onClick={this.showEmojis}>
                <i className="far fa-smile" />
              </button>
              {showEmojis && (
                <div className="emojiPickerContainer" ref={el => (this.emojiPicker = el)}>
                  <NimblePicker
                    onSelect={this.handleEmojiClick}
                    data={data}
                    title="Pick your emoji…"
                    emoji="point_up"
                    set="emojione"
                  />
                </div>
              )}
              <div className="input-flexContainer">
                <form>
                  <input
                    className="input-box"
                    placeholder="Type message..."
                    type="text"
                    value={this.state.text}
                    onChange={this.handleMessageChange}
                  />
                </form>
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
