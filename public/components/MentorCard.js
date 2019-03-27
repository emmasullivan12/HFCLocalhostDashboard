import React, { Component } from "react";
import "../css/MentorCard.css";
import Modal from './Modal.js';
import RequestChatContent from './RequestChatContent.js';
import PassMentorContent from './PassMentorContent.js';

// Cards must show different contents if waiting for match vs prospela already matched
// Cards must have different:- Mentor names / ID / content / button does different action

//This includes props and title to be passed to RequestChatModal
const RequestChatModalProps = {
  ariaLabel: 'Popup to request chat with matched E-Mentor',
  mentorName: 'David',
  title: 'Send a chat request to ',
  triggerText: 'Start Chatting',
  usedFor: 'RequestChat'
}

// This includes props and title to be passed to PassMentorModal
const PassModalProps = {
  ariaLabel: 'Pass on matched E-Mentor',
  title: 'Why did you pass? Help us match you better',
  triggerText: 'Pass',
  usedFor: 'PassBtn'
}

// Content for MentorCards using props passed from database
class MentorCardContent extends Component {
  render() {
    const mentor = this.props.mentor;

    return(
      <React.Fragment>
        <div className="UserCardContainer">
          <h1 className="UserCardName" >
            {mentor.mentorName}
          </h1>
          <p className="UserCardID">
            <strong>ID: </strong>{mentor.id}
          </p>
          <ul className="UserCardDetail">
            <li>
              <strong> Skills: </strong>
              <div>{mentor.skills}</div>
            </li>
            <li>
              <strong> Interests: </strong>
              <div>{mentor.interests}</div>
            </li>
            <li>
              <strong> Role: </strong>
              <div>{mentor.role}</div>
            </li>
            <li>
              <strong> Company: </strong>
              <div>{mentor.company}</div>
            </li>
            <li>
              <strong> Learning: </strong>
              <div>{mentor.learning}</div>
            </li>
            <li>
              <strong> Reasons we matched you: </strong>
              <div>{mentor.prospela_match_comments}</div>
            </li>
          </ul>
          <div className="ModalButtons">
            <Modal {...PassModalProps}>
              <PassMentorContent />
            </Modal>
            <Modal {...RequestChatModalProps}>
              <RequestChatContent />
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
      <div>
        {cards}
      </div>
    );
  }
}

// Placeholder User Card for when Student still hasn't been matched
class MentorCardWaiting extends Component {
  render() {
    return (
      <div className='MentorCard-waiting'>
        <h1 className='MentorCardName-waiting'>
          Dexter-SAMPLE
        </h1>
        <h1 className='MentorCardRole-waiting'>
          Marketing Finance-SAMPLE
        </h1>
        <ul>
          <li>Skills: Excel, React, JavaScript</li>
          <li>Interests: Football, Rugby, Bikram Yoga</li>
          <li>Role: Biscuit Taster</li>
          <li>Company: Pladis</li>
          <li>Tabs or Spaces: Tabs</li>
        </ul>
      </div>
    )
  }
}

// Renders content for UserCards, incl. container which is overlaid if Student passes on matched mentor

class MentorCardMatches extends Component {
  render() {
    // const className = this.props.PassedOnMentor ? 'UserCardContainer-passed' : 'UserCardContainer';
    return (
      // <div className={className}>
      <React.Fragment>
        <div>
          <MentorCard mentors={DUMMY_MENTOR_DATA} />
        </div>
      </React.Fragment>
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
    prospela_match_comments: "Hi soandso, Theresa is a great match for you because of XYZ."
  },
  {
    mentorName: "Boris Johnson",
    id: "34567",
    skills: "Making a fool of myself, speaking with a plum in my mouth",
    interests: "Undermining people, Being the class clown, becoming PM",
    role: "MP",
    company: "UK Government",
    learning: "I'm not cut out for the job",
        prospela_match_comments: "Hi soandso, Boris is a great match for you because of XYZ."
  },
  {
    mentorName: "Jacob Rees-Mogg",
    id: "54321",
    skills: "Debating, Mysogynism",
    interests: "Ousting our PM, Becoming PM, No-deal Brexit",
    role: "MP & Head of ERG",
    company: "UK Government",
    learning: "Mysogyny is bad, teamwork is key",
        prospela_match_comments: "Hi soandso, Jacob is a great match for you because of XYZ."
  }
]

export {
  MentorCardWaiting,
  MentorCardMatches
}
