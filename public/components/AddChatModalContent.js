// Dex last merged this code on 26th mar 2021

import React, { Component } from "react";
import Autocomplete from './Autocomplete.js';

class AddChatModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToDM: '',
    };
  }

  handleUserSearch = () => {
    // Dex to use
  }

  launchDM = (e, suggestion) => {
    this.setState({
      userToDM: e.target.dataset.id
    }, () => {
      console.log("launch chat with: "+this.state.userToDM)
      this.props.closeModal()

      // Close Full page "Match User" modal
  //    document.getElementById("modal-addPrDM").parentElement.remove();
    });
  }

  render() {

    var users = [
      {value: 'uuid123', name: 'Adam Ant', role: 'mentee'},{value: 'uuid124', name: 'Busy Bee', role: 'mentor'},{value: 'uuid125', name: 'Charlie Adams', role: 'mentee'},{value: 'uuid126', name: 'Derek David', role: 'mentor'},{value: 'uuid127', name: 'Emma Elephant', role: 'mentee'}
    ]

    return (
      <React.Fragment>
        <div className="modal-title">
          Start a DM
        </div>
        <div className="autocompleter">
          <Autocomplete
            suggestions={users}
            name='allUsersToDM'
            placeholder='Search all Prospela users by name'
          //  handleTabPress={this.handleTabPress}
            handleChange={this.handleUserSearch}
          //  handleMouseDown={this.handleMouseDown}
            focusOnLoad
            idValue='value'
            valueToShow='name' // This is the attribute of the array/object to be displayed to user
            showDetail
            detailToShow='role'
            showCTA1
            cta1ClickHandler={this.launchDM}
            cta1Text="Message"
            pushContentDownOnOpen // i.e. onOpen it expands the height of a modal rather than adding scrollbar to the modal
          //  showCTA2
          //  cta2ClickHandler={this.launchStartMatchModal}
          //  cta2Text="Match"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default AddChatModalContent;
