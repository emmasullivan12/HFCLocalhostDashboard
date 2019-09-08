// Dex last merged this code on 10th August 2019

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
    const tflink = this.props.tflink;
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
    document.getElementById('typeform-popup').addEventListener('click',function(){
      fullPageTypeformPopup.open();
    });
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
