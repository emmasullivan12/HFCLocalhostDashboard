// Dex last merged this code on 26th aug 2021

import React, { Component } from "react";
import {usercdn, userAvatarsFolder} from './CDN.js';
import SelectBox from './Select.js';
import {LoadingSpinner} from './GeneralFunctions.js';

// Content for Requesting chat with mentor Modal (incl. only allowing to submit once completed form giving reason why passing)
class EditPlanningUniContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      updateSuccess: false,
      planninguni: this.props.planningUni,
    };
  }

  handleChange = (userInput) => {
    this.setState({
      planninguni: userInput
    });
  }

  handleSubmit = (evt) => {
    this.setState({ isSubmitting: true });
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    this.setState({ updateSuccess: true })
  }

  canBeSubmitted() {
    const {planninguni} = this.state;
    const { planningUni } = this.props;
    return (
      planninguni != ''
      && (planninguni != planningUni) // Checks user has actually changed somethingcurrTrainingProvider == ''

    );
  }

  render() {
    const { isSubmitting, updateSuccess, planninguni } = this.state;
    const { modalTitle, planningUni } = this.props;
    const isEnabled = this.canBeSubmitted();

    const planningUniOptions = [
      {value: '0', label: 'Yes'},
      {value: '1', label: 'No'},
      {value: '2', label: 'I\'m Undecided'},
    ];

    function getPlanningUniTxt(planningUni, options) {

      const planningUniFromList = options
        .filter(plan => plan.value == planningUni)

      const planningUniLabel = planningUniFromList.map(value => value.label)

      return planningUniLabel
    }

    if(updateSuccess == false) {
      return (
        <React.Fragment>
        <div className="modal-title">
          {modalTitle}
        </div>
        <form className="paddingR20 paddingL20 marginBottom50">
          <label className="descriptor alignLeft reqAsterisk" htmlFor="selectBox-eetStatus">Are you <strong>planning to go</strong> on to Further Education / University?</label>
          <SelectBox
            options={planningUniOptions}
            name='planninguni'
            handleChange={this.handleChange}
            focusOnLoad
            valueToShow='label' // This is the attribute of the array/object to be displayed to user
            placeholder={(planningUni != null || planningUni != '') ? getPlanningUniTxt(planningUni, planningUniOptions) : 'Select option:'}
            placeholderIsDefaultValueIfNot='Select option:' // Changes font from grey to purple if is actually a default value
            required
          />
          <button type="button" disabled={isSubmitting == true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth">
            {isSubmitting == true && (
              <LoadingSpinner />
            )}
            {isSubmitting != true && (
              <span>Update</span>
            )}
          </button>
        </form>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="modal-title">
            <div className="ideas-icon-container">
              <span role="img" aria-label="ok emoji">👌</span>
            </div>
            University plans updated
          </div>
        </React.Fragment>
      )
    }
  }
}

export default EditPlanningUniContent;
