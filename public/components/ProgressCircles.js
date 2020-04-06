// Dex last merged this code on 12th Dec 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";

class ProgressCircles extends React.Component {
  render() {
    const {currentStep, totalSteps} = this.props;
    var circles = [];
    for (var i = 0; i < totalSteps; i++) {
      circles.push(
        <div className={(i < currentStep) ? "completedStep" : "nextStep"} key={i}>
          <i className="fas fa-circle" />
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className='progress-circles-container'>
          {circles}
        </div>
      </React.Fragment>
    );
  }
}

export default ProgressCircles;
