// Dex last merged this code on 12th Dec 2019
/*
import React, { Component } from "react";
import ReactDOM from "react-dom";

import {lookupUKSchUnis} from './UserDetail.js';

class VerifyStudentProps extends React.Component {
  constructor () {
    super();
    this.state = {
      isLoading: true,
      userEduName: ''
    }
  }

  componentDidMount() {
    const {eetStatus} = this.props;

    const userEduName = eetStatus === 'sch'
      ? this.handleSchNameText()
      : eetStatus === 'uni'
        ? this.handleUniNameText()
        : ''

    console.log("userEduName: "+userEduName);
  }

  handleSchNameText() {
    const {eetStatus, schName, schNameFreeText, country} = this.props;
    const userSch = (country === 'GBR'
      ? schName != ''
        ? lookupUKSchUnis(schName, 'label', eetStatus)
        : schNameFreeText
      : schNameFreeText, () => {
        this.setState({
          isLoading: false,
          userEduName: userSch
        });
        console.log("loadingstateOFSCH: "+this.state.isLoading);
    });
  }

  handleUniNameText() {
    const {eetStatus, uniName, uniNameFreeText, country} = this.props;
    const userUni = (country === 'GBR'
      ? uniName != ''
        ? lookupUKSchUnis(uniName, 'label', eetStatus)
        : uniNameFreeText
      : uniNameFreeText, () => {
        this.setState({
          isLoading: false,
          userEduName: userUni
        });
        console.log("loadingstateOFUNI: "+this.state.isLoading);
    });
  }

  render() {
    const {isLoading, userEduName} = this.state;
    const {eetStatus} = this.props;

    let confirmStudentProps = {};

    switch (eetStatus) {
      case 'sch':
        confirmStudentProps = {
          subheader: 'Tell us your personal ' + userEduName + ' email address so we can send you a verification code',
          title: 'Verify your account',
          fullWidth: false,
        }
        return confirmStudentProps;
      case 'uni':
        confirmStudentProps = {
          subheader: 'Tell us your personal ' + userEduName + ' email address so we can send you a verification code',
          title: 'Verify your account',
          fullWidth: false,
        }
        return confirmStudentProps;
      case 'job':
      case 'train':
      case 'none':
        return 'EM & DEX TO DECIDE WHAT TO REQUEST FROM JOB/TRAIN/NONE PEOPLE';
    }
  }
}

export default VerifyStudentProps;*/
