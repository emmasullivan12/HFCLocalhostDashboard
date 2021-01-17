// Dex last merged this code on 16th Aug 2020

import React from "react";
import ReactDOM from "react-dom";

import MenuNav from "./MenuNav.js";
import UserToReview from "./UserToReview.js";
import "../css/ReviewSignups.css";

class ReviewSignups extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const signups = [
      {
        uid: '1af91b81-e8b6-44ba-ac16-c4142be48293',
        email: 'samgrivens@gmail.com',
        eduemail: null,
        profemail: null,
        emailverif: 1,
        eduemailverif: null,
        profemailverif: null,
        activerole: 'mentee',
        mentorsustep: null,
        menteesustep: 'joinedProg',
        reviewreason: 'no edu email',
        currsitu: 'dfgdfgdfgdfgdfgdfgdfgdfgdfg',
        profprofileurl: '',
        progcode: '',
        lastupdated: '2021-01-06T16:54:25.084Z',
        fname: 'Sam',
        lname: 'Grivens',
        country: 'GBR',
        birthday: '1995-01-01T00:00:00.000Z',
        source: 'intogames',
        eetstatus: 'sch',
        rolesexp: null,
        rolesexpfreetext: null,
        schname: '0',
        schnamefreetext: '',
        uniname: '',
        uninamefreetext: '',
        currco: '',
        currrole: '',
        currtrainingprovider: '',
        currtraining: '',
      },
      {
        uid: '2af91b81-e8b6-44ba-ac16-c4142be48293',
        email: 'samgrivens@gmail.com',
        eduemail: 'sam.grivens@villiers.org',
        profemail: null,
        emailverif: null,
        eduemailverif: 1,
        profemailverif: null,
        activerole: 'mentee',
        mentorsustep: null,
        menteesustep: 'joinedProg',
        reviewreason: 'edu email doesnt match',
        currsitu: 'dfgdfgdfgdfgdfgdfgdfgdfgdfg',
        profprofileurl: '',
        progcode: '',
        lastupdated: '2021-01-06T16:54:25.084Z',
        fname: 'Bob',
        lname: 'Thebuilder',
        country: 'BZE',
        birthday: '1995-01-01T00:00:00.000Z',
        source: '',
        eetstatus: 'uni',
        rolesexp: null,
        rolesexpfreetext: null,
        schname: '',
        schnamefreetext: '',
        uniname: '',
        uninamefreetext: 'Freetext Uni',
        currco: '',
        currrole: '',
        currtrainingprovider: '',
        currtraining: '',
      },
      {
        uid: '3af91b81-e8b6-44ba-ac16-c4142be48293',
        email: 'samgrivens@gmail.com',
        eduemail: null,
        profemail: 'sam@company.com',
        emailverif: null,
        eduemailverif: null,
        profemailverif: 1,
        activerole: 'mentee',
        mentorsustep: null,
        menteesustep: 'joinedProg',
        reviewreason: 'no edu email',
        currsitu: 'dfgdfgdfgdfgdfgdfgdfgdfgdfg',
        profprofileurl: '',
        progcode: '',
        lastupdated: '2021-01-06T16:54:25.084Z',
        fname: 'Dave',
        lname: 'Jones',
        country: 'CAN',
        birthday: '1995-01-01T00:00:00.000Z',
        source: 'avfx',
        eetstatus: 'job',
        rolesexp: null,
        rolesexpfreetext: null,
        schname: '',
        schnamefreetext: '',
        uniname: '',
        uninamefreetext: '',
        currco: 'Company Name',
        currrole: 'Amazing Role',
        currtrainingprovider: '',
        currtraining: '',
      },
      {
        uid: '4af91b81-e8b6-44ba-ac16-c4142be48293',
        email: 'samgrivens@gmail.com',
        eduemail: null,
        profemail: null,
        emailverif: null,
        eduemailverif: null,
        profemailverif: null,
        activerole: 'mentee',
        mentorsustep: null,
        menteesustep: 'joinedProg',
        reviewreason: 'no edu email',
        currsitu: 'dfgdfgdfgdfgdfgdfgdfgdfgdfg',
        profprofileurl: '',
        progcode: '',
        lastupdated: '2021-01-06T16:54:25.084Z',
        fname: 'Dwayne',
        lname: 'Johnson',
        country: 'USA',
        birthday: '1995-01-01T00:00:00.000Z',
        source: 'aw',
        eetstatus: 'train',
        rolesexp: null,
        rolesexpfreetext: null,
        schname: '',
        schnamefreetext: '',
        uniname: '',
        uninamefreetext: '',
        currco: '',
        currrole: '',
        currtrainingprovider: 'Training Company',
        currtraining: 'Sick Training',
      }
    ]
    let signupsNoVerif, signupsHasVerif;

    signupsNoVerif = signups.filter(signup => {
      // Hasn't verified any email
      if (signup['emailverif'] == null && signup['eduemailverif'] == null && signup['profemailverif'] == null) {
        return true
      } else return false
    })
    signupsHasVerif = signups.filter(signup => {
      // Has verified an email already
      if (signup['emailverif'] != null || signup['eduemailverif'] != null || signup['profemailverif'] != null) {
        return true
      } else return false
    })

    return (
      <React.Fragment>
        <div className="chat-container">
          <div className="chat-content-container">
            <div className="page-header chat">
              <MenuNav />
              <div className="page-detail-container overflow-ellipsis">
                <div className="chat-title-container overflow-ellipsis">
                  <span className="chat-title">
                    Review Signups
                  </span>
                </div>
                <div className="chat-detail overflow-ellipsis">
                  Check user details before sign up approval or rejection
                </div>
              </div>
            </div>
            <div className="page-container">
              <div className="toBeReviewed-container">
                <div className="paddingBtm">
                  To be reviewed
                </div>
                {signupsHasVerif.map((signup, index) => {
                  return (
                    <UserToReview
                      signup={signup}
                      key={signup.uid}
                    />
                  )
                })}
              </div>
              <div className="dontReviewYet-container">
                <div className="exclamation-icon-container grey">
                  <i className="fas fa-exclamation-circle" />
                  <span> Not yet verified email</span>
                </div>
                {signupsNoVerif.map((signup, index) => {
                  return (
                    <UserToReview
                      signup={signup}
                      key={signup.uid}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ReviewSignups;
