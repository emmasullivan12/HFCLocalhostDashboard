// Dex last merged this code on 26th jan 2024

import React, { Component } from "react";
import SelectBox from './Select.js';
import {LoadingSpinner} from './GeneralFunctions.js';
import {getSkillDeets} from './UserDetail.js';

class JoinSkillsCommModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageFromServer: '',
      isSubmitting: false,
      expOrLearn: null
    };
  }

  handleStatusChange = (userInput) => {
    this.setState({
      expOrLearn: userInput,
    })
  }

  // This will handle Mentor accepting mentee i.e. updating database/Redux will happen here
  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault ();
      return;
    }
    this.setState({ messageFromServer: 'Huddle joined' });
  }


  canBeSubmitted() {
    const { expOrLearn } = this.state;

    return (
      expOrLearn != '' && expOrLearn != null
    )
  }

  render() {
    const { messageFromServer, isSubmitting} = this.state;
    const { skillName, onClick } = this.props
    const isEnabled = this.canBeSubmitted();

    if(messageFromServer == '') {
      return (
        <React.Fragment>
          <div className="modal-title">
            <span className="emoji-icon sparkle-emoji titleLeft" />
            <span>Join the {skillName} huddle</span>
            <span className="emoji-icon sparkle-emoji titleRight" />
          </div>
          <form className="paddingR20 paddingL20">
            <div className="form-group">
              <label className="descriptor alignLeft reqAsterisk" htmlFor="selectExpOrLearn">
                <span>Are you an <strong>expert or learner</strong> of this skill?</span>
              </label>
              <div className="autocompleter">
                <SelectBox
                  options={[
                    {value: '1', label: 'Expert', detail: 'You use this skill at work or have ~2yrs+ experience', checkbox: true, isTitle: false, iconFA: 'fas fa-hashtag'},
                    {value: '2', label: 'Learner', detail: 'You\'re just starting out with this skill', checkbox: true, isTitle: false, iconFA: 'fas fa-hashtag'},
                  ]}
                  name='selectExpOrLearn'
                  placeholder='Select your learning status:'
                  placeholderOnClick='Select your learning status:'
                  handleChange={this.handleStatusChange}
                  focusOnLoad
                  valueToShow='label' // This is the attribute of the array/object to be displayed to user
                  //showIcon
                  //iconToShow='iconFA'
                  showDetail
                  detailToShow='detail'
                //  showCheckbox
                //  defaultChecked={defaultInds}
                />
              </div>
            </div>
            <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={onClick} className="Submit-btn fullWidth" id="Submit-btn-UpdateSkills">
              {isSubmitting == true && (
                <LoadingSpinner />
              )}
              {isSubmitting != true && (
                <span>Join community</span>
              )}
            </button>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="emoji-icon tada-emoji successBox" />
            It&#39;s official!
          </div>
          <div className="success-container">
            <div className="ideas-Title">
              You&#39;re now a new member of {skillName}.
            </div>
            <p className="landingCTADesc">
              You can access all of your communities / huddles from the main menu
            </p>
            <div className="showSkillsCommunitiesPic"/>
          </div>
        </React.Fragment>
      )
    }
  }
}


export default JoinSkillsCommModalContent;
