// Dex last merged this code on 10th Sept 2019

import React, { Component } from "react";
import "../css/MentorCard.css";
import "../css/General.css";
import Carousel from './Carousel.js';
import Modal from './Modal.js';
import RequestChatContent from './RequestChatContent.js';
import PassMentorContent from './PassMentorContent.js';
import FullPageModal from './FullPageModal.js';
import MentorProfileContent from './MentorProfileContent.js';

// Cards must show different contents if waiting for match vs prospela already matched
// Cards must have different:- Mentor names / ID / content / button does different action

//This includes props and title to be passed to RequestChatModal
const RequestChatModalProps = {
  ariaLabel: 'Popup to request chat with matched E-Mentor',
  triggerText: 'Start Chatting',
  usedFor: 'RequestChat'
}

// This includes props and title to be passed to PassMentorModal
const PassModalProps = {
  ariaLabel: 'Pass on matched E-Mentor',
  triggerText: 'Pass',
  usedFor: 'PassBtn'
}

const MentorProfileModalProps = {
  ariaLabel: 'View Mentor Profile',
  triggerText: 'See full profile',
  usedFor: 'card-mentor-profile',
  backBtn: 'arrow'
}

// Content for MentorCards using props passed from database
class MentorCardContent extends Component {
  constructor () {
    super();
    this.state = {
      isOverflow: false
    }
    this.openOverflow = this.openOverflow.bind(this);
//    this.checkOverflow = this.checkOverflow.bind(this);
  }

/*  checkOverflow = () => {
    const matchReason = document.querySelector(".pr-match-reason");
    console.log('matchReason.offsetHeight: '+matchReason.offsetHeight);
    console.log('matchReason.scrollHeight: '+matchReason.scrollHeight);
    const checkOverflow = matchReason.offsetHeight < matchReason.scrollHeight;
    console.log('isOverflow: '+checkOverflow);
    this.setState({ isOverflow: checkOverflow });
  }
*/
  openOverflow(e) {
    e.currentTarget.previousSibling.style.height = '150px';
    e.currentTarget.parentNode.style.height = '500px';
    e.currentTarget.innerHTML = '';
  }

  render() {
    const mentor = this.props.mentor;
    const {isOverflow} = this.state;

    return(
      <React.Fragment>
        <div className="UserCardContainer" data-target="card">
          {mentor.pr_top_match==='t' && (
            <div className="recd-match">
              Top match for you
              </div>
          )}
          <div className={"user-card-header user-card-header-" + mentor.pr_top_match}>
            <div className="match-time-left">
              7 days left
            </div>
            <div className="match-avatar-container">
              <img
                className="match-thumb img-circle"
                src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000"
                alt={mentor.mentorName}
              />
            </div>
          </div>
          <div className="UserCardName" >
            {mentor.mentorName}
          </div>
          <div className="UserCardRole" >
            {mentor.role} &#64; {mentor.company}
          </div>
          <FullPageModal {...MentorProfileModalProps}>
            <MentorProfileContent />
          </FullPageModal>
          <div className="how-mtchd-container">
            {(mentor.role_vs_role_desired==='t' || mentor.industry_pref==='t') && (
              <div className="match-reason-li">
                <div className="tickIconContainer">
                  <i className="fas fa-check" />
                </div>
                <div className="match-reason">
                  In the role / industry you want
                </div>
              </div>
            )}
            {mentor.hobbies_and_interests==='t' && (
              <div className="match-reason-li">
                <div className="tickIconContainer">
                  <i className="fas fa-check" />
                </div>
                <div className="match-reason">
                  Similar hobbies and interests
                </div>
              </div>
            )}
            {(mentor.skills_want_to_develop==='t' || mentor.latest_actions_on_student_todo_list==='t') && (
              <div className="match-reason-li">
                <div className="tickIconContainer">
                  <i className="fas fa-check" />
                </div>
                <div className="match-reason">
                  Has skills you want to develop
                </div>
              </div>
            )}
          </div>
          <div className="pr-match-msg-container">
            <div className="msgIconContainer">
              <i className="far fa-comment-dots" />
            </div>
            <div className="pr-match-msg-title">
              Message from Prospela:
            </div>
          </div>
          <div className="pr-match-reason">
            {mentor.prospela_match_comments}
          </div>
          {mentor.prospela_match_comments.length >  150 && (
            <button type="button" className="multilineOverflowBtn" onClick={this.openOverflow}>
              See more...
            </button>
          )}
          <div className="ModalButtons">
            <Modal {...RequestChatModalProps}>
              <RequestChatContent mentorName={mentor.mentorName}/>
            </Modal>
            <Modal {...PassModalProps}>
              <PassMentorContent />
            </Modal>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

// Template for User Profile Card's (i.e. extra children can be passed into it)
class MentorCard extends Component {
  render() {
    const cards = [];

    this.props.mentors.forEach((mentor) => {
      cards.push(
        <MentorCardContent
          mentor={mentor}
          key={mentor.id}
        />
      );
    });

    return (
      <React.Fragment>
        {cards}
      </React.Fragment>
    );
  }
}

// Renders content for UserCards, incl. container which is overlaid if Student passes on matched mentor

class MentorCardMatches extends Component {
  render() {
    // const className = this.props.PassedOnMentor ? 'UserCardContainer-passed' : 'UserCardContainer';
    return (
      // <div className={className}>
      <div className="landingCTA-container">
        <div className="choose-match-title-container">
          <div className="exclamation-icon-container">
            <i className="fas fa-exclamation-circle" />
          </div>
          <div className="choose-match-title">
            Choose your real employee match
          </div>
          <div className="choose-match-detail">
            Build your network & get personalised insider insights for 3 months (& beyond!)
          </div>
        </div>
        <div className="cards-container">
          <Carousel>
            <MentorCard mentors={DUMMY_MENTOR_DATA} />
          </Carousel>
        </div>
      </div>
    );
  }
}


// Dummy mentor data (this will eventually come from Postgres)
const DUMMY_MENTOR_DATA = [
  {
    mentorName: "Theresa May",
    id: "12345",
    skills: "Committment to getting the job done",
    interests: "Politics, Remaining",
    role: "Prime Minister",
    company: "UK Government",
    learning: "Employee retention, negotiating skills e.g. BATNA",
    pr_top_match: 't',
    role_vs_role_desired: 't',
    hobbies_and_interests: 't',
    skills_want_to_develop: 't',
    industry_pref: 't',
    latest_actions_on_student_todo_list: 't',
    prospela_match_comments: "Hi soandso, Theresa is a great match for you because of XYZ. They've also had experience working with and give presentations regularly to senior clients!"
  },
  {
    mentorName: "Sally Sausage",
    id: "34567",
    skills: "Making a fool of myself, speaking with a plum in my mouth",
    interests: "Undermining people, Being the class clown, becoming PM",
    role: "Finance Marketing Manager",
    company: "Pladis",
    learning: "I'm not cut out for the job",
    pr_top_match: '',
    role_vs_role_desired: 't',
    hobbies_and_interests: '',
    skills_want_to_develop: 't',
    industry_pref: '',
    latest_actions_on_student_todo_list: 't',
    prospela_match_comments: "Hi soandso, Boris is a great match for you because of XYZ. I wanted to send a really long personal message here to emphasize how good a match they really are especially because you said you loved ABC!!"
  },
  {
    mentorName: "Sally Sausage",
    id: "34569",
    skills: "Making a fool of myself, speaking with a plum in my mouth",
    interests: "Undermining people, Being the class clown, becoming PM",
    role: "Finance Marketing Manager",
    company: "Pladis",
    learning: "I'm not cut out for the job",
    pr_top_match: '',
    role_vs_role_desired: 't',
    hobbies_and_interests: '',
    skills_want_to_develop: 't',
    industry_pref: '',
    latest_actions_on_student_todo_list: 't',
    prospela_match_comments: "Hi soandso, Boris is a great match for you because of XYZ."
  },
  {
    mentorName: "Sally Sausage",
    id: "34455",
    skills: "Making a fool of myself, speaking with a plum in my mouth",
    interests: "Undermining people, Being the class clown, becoming PM",
    role: "Finance Marketing Manager",
    company: "Pladis",
    learning: "I'm not cut out for the job",
    pr_top_match: '',
    role_vs_role_desired: 't',
    hobbies_and_interests: '',
    skills_want_to_develop: 't',
    industry_pref: '',
    latest_actions_on_student_todo_list: 't',
    prospela_match_comments: "Hi soandso, Boris is a great match for you because of XYZ. I wanted to send a really long personal message here to "
  },
  {
    mentorName: "Sally Sausage",
    id: "34456",
    skills: "Making a fool of myself, speaking with a plum in my mouth",
    interests: "Undermining people, Being the class clown, becoming PM",
    role: "Finance Marketing Manager",
    company: "Pladis",
    learning: "I'm not cut out for the job",
    pr_top_match: '',
    role_vs_role_desired: 't',
    hobbies_and_interests: '',
    skills_want_to_develop: 't',
    industry_pref: '',
    latest_actions_on_student_todo_list: 't',
    prospela_match_comments: "Hi soandso, Boris is a great match for you because of XYZ. I wanted to send a really long personal message here to "
  },
  {
    mentorName: "Sally Sausage",
    id: "34457",
    skills: "Making a fool of myself, speaking with a plum in my mouth",
    interests: "Undermining people, Being the class clown, becoming PM",
    role: "Finance Marketing Manager",
    company: "Pladis",
    learning: "I'm not cut out for the job",
    pr_top_match: '',
    role_vs_role_desired: 't',
    hobbies_and_interests: '',
    skills_want_to_develop: 't',
    industry_pref: '',
    latest_actions_on_student_todo_list: 't',
    prospela_match_comments: "Hi soandso, Boris is a great match for you because of XYZ. I wanted to send a really long personal message here to "
  },
  {
    mentorName: "Sally Sausage",
    id: "34458",
    skills: "Making a fool of myself, speaking with a plum in my mouth",
    interests: "Undermining people, Being the class clown, becoming PM",
    role: "Finance Marketing Manager",
    company: "Pladis",
    learning: "I'm not cut out for the job",
    pr_top_match: '',
    role_vs_role_desired: 't',
    hobbies_and_interests: '',
    skills_want_to_develop: 't',
    industry_pref: '',
    latest_actions_on_student_todo_list: 't',
    prospela_match_comments: "Hi soandso, Boris is a great match for you because of XYZ. I wanted to send a really long personal message here to "
  },
  {
    mentorName: "Sally Sausage",
    id: "34459",
    skills: "Making a fool of myself, speaking with a plum in my mouth",
    interests: "Undermining people, Being the class clown, becoming PM",
    role: "Finance Marketing Manager",
    company: "Pladis",
    learning: "I'm not cut out for the job",
    pr_top_match: '',
    role_vs_role_desired: 't',
    hobbies_and_interests: '',
    skills_want_to_develop: 't',
    industry_pref: '',
    latest_actions_on_student_todo_list: 't',
    prospela_match_comments: "Hi soandso, Boris is a great match for you because of XYZ. I wanted to send a really long personal message here to "
  }
]

/*  {
    mentorName: "Jacob Rees-Mogg",
    id: "54321",
    skills: "Debating, Mysogynism",
    interests: "Ousting our PM, Becoming PM, No-deal Brexit",
    role: "MP & Head of ERG",
    company: "UK Government",
    learning: "Mysogyny is bad, teamwork is key",
    pr_top_match: '',
    role_vs_role_desired: 't',
    hobbies_and_interests: 't',
    skills_want_to_develop: '',
    industry_pref: 't',
    latest_actions_on_student_todo_list: '',
    prospela_match_comments: "Hi soandso, Jacob is a great match for you because of XYZ. You mentioned you wanted to learn 3D Animation, and he has a lot of recent experience in it."
  }
  */

export default MentorCardMatches;
