import React, { Component } from "react";
/*import { connect } from "react-redux";
import PropTypes from 'prop-types';*/

//import * as typeformEmbed from '@typeform/embed';
//import MentorMatches from './MentorMatches';
//import TypeformSignUp from './TypeformSignUp.js';
//import TypeformTrainingLaunch from './TypeformTraining.js';
import LatestAdvice from './LatestAdvice.js';
import MentorHomePage from './MentorHomePage.js';

// Depending on whether user has completed Full Sign Up, will display option to complete full sign up or Mentor Matches
//const didFullSignUp = true;


// Launches Full page Typeform Modal to complete full sign up (will need to copy our Typeform URL below)
/*class TypeformTrainingLaunch extends Component {
  componentDidMount(){
    const mentortflink = 'https://prospela.typeform.com/to/A84jY2?fname='+this.props.fname+'&uid='+this.props.id;
    const studenttflink = 'https://prospela.typeform.com/to/XF3Fus?fname='+this.props.fname+'&uid='+this.props.id;
    const tflink = (this.props.userRole === 'mentee') ? studenttflink : mentortflink;

    typeformEmbed.makeWidget(
      embedElement,
      tflink,
      {
        hideFooter: true,
        hideHeaders: true,
        opacity: 0,
        hideScrollbars: true,
        onSubmit: function () {
          alert('Typeform submitted!');
        }
      }
    )
  }

  componentDidMount(){
    const FullSignUpTypeformPopup = typeformEmbed.makePopup(
      'https://prospela.typeform.com/to/zJT4BF',
      {
        mode: 'popup',
        autoOpen: false,
        autoClose: 350,
        hideFooter: true,
        hideHeaders: true,
        hideScrollbars: true,
        onSubmit: function () {
          console.log('Typeform successfully submitted')
        }
      }
    )
    document.getElementById('typeform-popup').addEventListener('click',function(){
      FullSignUpTypeformPopup.open();
    });
  }

  render(){
    return(
      <div>
        <button type="button" id="typeform-popup" className="launch-typeform-btn">
          Complete Full Sign Up &gt;&gt;
        </button>
      </div>
    )
  }
}
*/
// Will prompt user to complete full sign up (if not completed), otherwise  shows MentorMatch status (i.e. waiting or matches made)
class Home extends Component {
  render() {
    const userRole = 'mentor';
    return (
      <div>
        {{
          ['mentee']: <LatestAdvice />,
          ['mentor']: <MentorHomePage />,
        }[userRole]}
      </div>
    );
  }
}

/*Home.propTypes = {
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};*/
export default Home;
