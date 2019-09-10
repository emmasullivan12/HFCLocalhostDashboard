// Dex last merged this code on 10th Sept 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { connect } from "react-redux";
import * as typeformEmbed from '@typeform/embed';
import "../css/TypeformEmbedded.css";

// Launches Embedded Typeform for User to complete initial sign up
class TypeformEmbedded extends Component {
  componentDidMount(){
    const embedElement = document.querySelector('.embedded-typeform'); // NOTE: `.target-dom-node` is the target DOM element from your website or web app
//    const mentortflink = 'https://prospela.typeform.com/to/A84jY2?fname='+this.props.fname+'&uid='+this.props.id;
//    const studenttflink = 'https://prospela.typeform.com/to/XF3Fus?fname='+this.props.fname+'&uid='+this.props.id;
    const tflink = this.props.tflink;

    typeformEmbed.makeWidget(
      embedElement,
      tflink,
      {
        hideFooter: false,
        hideHeaders: true,
        opacity: 0,
        hideScrollbars: true,
        onSubmit: function () {
          alert('Typeform submitted!');
        }
      }
    )
  }

  render(){
    return(
      <div>
        Typeform is displayed here
      </div>
    )
  }
}

export default TypeformEmbedded;
