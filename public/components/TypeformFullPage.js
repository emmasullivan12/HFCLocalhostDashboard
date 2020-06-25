// Dex last merged this code on 10th Sept 2019

import React, { Component } from "react";
import * as typeformEmbed from '@typeform/embed';

// Typeform Trigger is the button that will open the TF
const TypeformTrigger = ({
  text,
  usedFor
}) => (
  <button type="button" id="typeform-popup" className="Submit-btn">
    {text}
  </button>
);

// Launches Full page Typeform Modal to complete full sign up (will need to copy our Typeform URL below)
class TypeformFullPage extends Component {

  componentDidMount(){
    //not sure this is right formula anymore as changed it      
    this.createFullPageTypeformPopup()
    document.getElementById('typeform-popup').addEventListener('click',function(){
      this.fullPageTypeformPopup.open();
    });
  }

  componentWillUnmount() {
    document.getElementById('typeform-popup').removeEventListener('click',function(){
      this.fullPageTypeformPopup.open();
    });
  }

  createFullPageTypeformPopup = () => {
    const {tflink} = this.props;

    const fullPageTypeformPopup = typeformEmbed.makePopup(
      tflink,
      {
        mode: 'popup',
        autoOpen: false,
        autoClose: 350,
        hideFooter: false,
        hideHeaders: true,
        hideScrollbars: true,
        onSubmit: function () {
          alert('Typeform submitted!');
        }
      }
    )
  }

  render(){
    const {triggerText, usedFor} = this.props;
    return(
      <React.Fragment>
        <TypeformTrigger
          text={triggerText}
          usedFor={usedFor}
        />
      </React.Fragment>
    );
  }
}

export default TypeformFullPage;
