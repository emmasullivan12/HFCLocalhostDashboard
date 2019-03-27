import React, { Component } from "react";
import "../css/AcceptMenteeContent.css";

class AcceptMenteeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptMenteeMessage: '',
    };
  }

  handleMessageChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  canBeSubmitted() {
    const {acceptMenteeMessage} = this.state;
    return (
      acceptMenteeMessage.length > 0
    );
  }

  render() {
    const { acceptMenteeMessage } = this.state;
    const isEnabled = this.canBeSubmitted();
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="acceptMenteeMessage"
            className="acceptMenteeMessage-Form"
            placeholder="Type your message"
            value={this.state.acceptMenteeMessage}
            onChange={this.handleMessageChange}
          />
          <button type="submit" disabled={!isEnabled} className="AcceptMentee-btn">
            Accept
          </button>
        </form>
        <div>
          <div className="needIdeas-Title">
            Need ideas for what to say?
          </div>
          <ul>
            <li><span className="bold">Introduce yourself</span> (your name, what you are working on, your hobbies)</li>
            <li><span className="bold">Your career path</span> (what role and industries you have experience in)</li>
            <li><span className="bold">Why this mentee</span> (what you think you can help them with)sss</li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}


export default AcceptMenteeContent;
