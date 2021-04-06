// Dex last merged this code on 10th August 2019

import React, { Component } from "react";

import {cdn} from './CDN.js';
import BarChart from './BarChart.js';
import {DateCalc} from './GeneralFunctions.js';
import LineChart from './LineChart.js';

class GroupDashOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentorsData: [
        {
          "time": '2020-01-01T00:00:00.000Z',
          "value": 1
        },
        {
          "time": '2020-02-01T00:00:00.000Z',
          "value": 35
        },
        {
          "time": '2020-03-01T00:00:00.000Z',
          "value": 68
        },
        {
          "time": '2020-04-01T00:00:00.000Z',
          "value": 96
        },
        {
          "time": '2020-05-01T00:00:00.000Z',
          "value": 122
        },
        {
          "time": '2020-06-01T00:00:00.000Z',
          "value": 160
        },
        {
          "time": '2020-07-01T00:00:00.000Z',
          "value": 223
        },
        {
          "time": '2020-08-01T00:00:00.000Z',
          "value": 250
        },
        {
          "time": '2020-09-01T00:00:00.000Z',
          "value": 309
        },
        {
          "time": '2020-10-01T00:00:00.000Z',
          "value": 346
        },
        {
          "time": '2020-11-01T00:00:00.000Z',
          "value": 400
        },
        {
          "time": '2020-12-01T00:00:00.000Z',
          "value": 451
        },
      ],
      menteesData: [
        {
          "time": '2020-01-01T00:00:00.000Z',
          "value": 1
        },
        {
          "time": '2020-02-01T00:00:00.000Z',
          "value": 56
        },
        {
          "time": '2020-03-01T00:00:00.000Z',
          "value": 104
        },
        {
          "time": '2020-04-01T00:00:00.000Z',
          "value": 151
        },
        {
          "time": '2020-05-01T00:00:00.000Z',
          "value": 221
        },
        {
          "time": '2020-06-01T00:00:00.000Z',
          "value": 297
        },
        {
          "time": '2020-07-01T00:00:00.000Z',
          "value": 307
        },
        {
          "time": '2020-08-01T00:00:00.000Z',
          "value": 309
        },
        {
          "time": '2020-09-01T00:00:00.000Z',
          "value": 499
        },
        {
          "time": '2020-10-01T00:00:00.000Z',
          "value": 548
        },
        {
          "time": '2020-11-01T00:00:00.000Z',
          "value": 612
        },
        {
          "time": '2020-12-01T00:00:00.000Z',
          "value": 667
        },
      ],
      menteesTopRolesDemand: [
        {
          "label": '2D Animator',
          "value": 100
        },
        {
          "label": 'Character Animator',
          "value": 76
        },
        {
          "label": 'Compositor',
          "value": 66
        },
        {
          "label": '3D Animator',
          "value": 51
        },
        {
          "label": 'Director',
          "value": 35
        },
      ],
      menteesTopRolesSupply: [
        {
          "label": '2D Animator',
          "value": 10
        },
        {
          "label": 'Character Animator',
          "value": 7
        },
        {
          "label": 'Compositor',
          "value": 23
        },
        {
          "label": '3D Animator',
          "value": 10
        },
        {
          "label": 'Director',
          "value": 3
        },
      ]
    }
  }

  render() {
    const {menteesData, mentorsData, menteesTopRolesDemand, menteesTopRolesSupply} = this.state;
    const adminUser = {
      fname: 'Simon'
    }
    const group = [{
      newSignUps: 62,
      matched: 1067,
      datecreated: '2020-01-01T14:46:14.209Z',
      members: [
        {membersince: '2021-02-04T14:46:14.209Z', matchstatus: '4'},
        {membersince: '2021-02-04T14:46:14.209Z', matchstatus: '4'},
        {membersince: '2021-02-04T14:46:14.209Z', matchstatus: '7'},
        {membersince: '2021-03-04T14:46:14.209Z', matchstatus: '7'},
        {membersince: '2021-03-04T14:46:14.209Z', matchstatus: '7'},
        {membersince: '2021-03-04T14:46:14.209Z', matchstatus: '7'},
      ]
    }]
    const pendingMatches = [
      {matchid: '123'},
      {matchid: '123'},
      {matchid: '123'},
      {matchid: '123'},
      {matchid: '123'},
      {matchid: '123'},
      {matchid: '123'},
      {matchid: '123'},
      {matchid: '123'},
    ]

/*
    - 1 Willing to wait (#1 matchstatus)
- 2 VIP (#1 matchstatus)
- 3 Vocal (#1 matchstatus)
- 4 Has no match (#1 matchstatus)
- 5 Only has bad match (#1 matchstatus)
- 6 Wants another (#1 matchstatus)
- 7 Matched (#7 matchstatus)
- 8 not relevant to group, don't bother matching (#1 matchstatus)
-   {value: '9', label: 'Unavailable', priority: 'L'},
*/
    const totalMembers = group[0].members.length
    const totalMembersPcChg = 0.012 // need to filter by those matched in last month
    const numMatchedMentees = group[0].members.length // need to filter by matchstatus & role
    const numMatchedMentors = group[0].members.length // need to filter by matchstatus & roles
    const matchedPcChgMentees = 0.021567678 // need to filter by those matched in last month
    const matchedPcChgMentors = -0.00 // need to filter by those matched in last month
    const numPendingMentees = group[0].members.length // need to filter by matchstatus & role
    const numPendingMentors = group[0].members.length // need to filter by matchstatus & role
    const numNoMatchMentees = group[0].members.length // need to filter by matchstatus & role
    const numNoMatchMentors = group[0].members.length // need to filter by matchstatus & role

    return (
      <div>
        <div className="dash-welcomeContainer">
          <div className="col-7">
            <div className="dash-welcomeHeader"><strong>Welcome back, {adminUser.fname}!</strong></div>
            {group[0].newSignUps > 0 ? (
              <div>
                Your mentoring community is growing nicely! You’ve got <strong>+{group[0].newSignUps} new sign ups</strong> since last month
              </div>
              )
            : (
              <div>
                Your mentoring community is humming along nicely!
              </div>
            )}
          </div>
          <div className="col-5">
            <div className="dash-welcomeImg-container">
              <img
                className="groupDashImg"
                alt="Team meeting"
                srcSet={cdn+"/images/Dashboard-Community%20Managers_Sml.png 235w, "+cdn+"/images/Dashboard-Community%20Managers.png 1039w"}
                sizes="(min-width: 859px) 1039px, 235px"
                src={cdn+"/images/Dashboard-Community%20Managers_Sml.png"}
              />
            </div>
          </div>
        </div>
        <div className="dash-row">
          <div className="mainBox">
            <div className="mainBox-headerText">
              <div><strong>Your Members</strong></div>
              <div className="mainBox-numLarge">{totalMembers}</div>
              <span className={"percentageChg"+(totalMembersPcChg >= 0 ? ' positive' : ' negative')}>{(totalMembersPcChg >= 0 ? '+' : '') + ((totalMembersPcChg * 100).toFixed(1)) + "%"}</span>
              <div className="blueText">Mentees</div>
              <div className="purpleText">E-Mentors</div>
            </div>
            <div className="chartDesc-text">Since launch</div>
            <LineChart
              dataset1={menteesData}
              dataset1Title="Mentees"
              dataset1Colour="#00B0F0"
              dataset1Fill='gradient'
              dataset1gradientColour1="0,176,240,1"
              dataset1gradientColour2="255,255,255,1"
              dataset1gradientColour3="255,255,255,1"
              dataset2={mentorsData}
              dataset2Title="E-Mentors"
              dataset2Colour="#4E4ED6"
              dataset2Fill='gradient'
              dataset2gradientColour1="78,78,214,1"
              dataset2gradientColour2="255,255,255,1"
              dataset2gradientColour3="255,255,255,1"
              showLegend={false}
            />
          </div>
          <div className="miniBox-container">
            <div className="miniBox first">
              <span className="miniBox-emoji" role="img" aria-label="clockEmoji">🔗</span>
              <div className="miniBox-title"><strong>Matched</strong></div>
              <div className="miniBox-text"><i>Mentees</i></div>
              <div className="miniBox-numLarge">
                <strong>{numMatchedMentees}</strong>
              </div>
              <span className={"percentageChg"+(matchedPcChgMentees >= 0 ? ' positive' : ' negative')}>{(matchedPcChgMentees >= 0 ? '+' : '') + ((matchedPcChgMentees * 100).toFixed(1)) + "%"}</span>
              <div className="miniBox-text"><i>Mentors</i></div>
              <div className="miniBox-numLarge">
                <strong>{numMatchedMentors}</strong>
              </div>
              <span className={"percentageChg"+(matchedPcChgMentors >= 0 ? ' positive' : ' negative')}>{(matchedPcChgMentors >= 0 ? '+' : '') + ((matchedPcChgMentors * 100).toFixed(1)) + "%"}</span>
            </div>
            <div className="miniBox second">
              <span className="miniBox-emoji" role="img" aria-label="clockEmoji">⏱️</span>
              <div className="miniBox-title"><strong>In Progress</strong></div>
              <div className="miniBox-text"><i>Mentees</i></div>
              <div className="miniBox-numLarge"><strong>{numPendingMentees}</strong></div>
              <div className="miniBox-text"><i>Mentors</i></div>
              <div className="miniBox-numLarge"><strong>{numPendingMentors}</strong></div>
            </div>
            <div className="miniBox third">
              <span className="miniBox-emoji" role="img" aria-label="clockEmoji">❌</span>
              <div className="miniBox-title"><strong>No Match</strong></div>
              <div className="miniBox-text"><i>Mentees</i></div>
              <div className="miniBox-numLarge"><strong>{numNoMatchMentees}</strong></div>
              <div className="miniBox-text"><i>Mentors</i></div>
              <div className="miniBox-numLarge"><strong>{numNoMatchMentors}</strong></div>
            </div>
          </div>
        </div>
        <div className="dash-row">
          <div className="col-6">
            <div>
              <strong><span className="blueText">Mentees</span> waiting for a match:</strong>
              <i>Most in-demand roles vs. Supply</i>
            </div>
            <BarChart
              dataset1={menteesTopRolesDemand}
              dataset1Title="Mentees"
              dataset1Colour="#00B0F0"
              dataset1Fill="rgba(0,176,240,.2)"
              //dataset1gradientColour1="0,176,240,1"
              //dataset1gradientColour2="255,255,255,1"
              //dataset1gradientColour3="255,255,255,1"
              dataset2={menteesTopRolesSupply}
              dataset2Title="E-Mentors"
              dataset2Colour="#d0d0d0"
              dataset2Fill="#d0d0d0"
              //dataset2gradientColour1="78,78,214,1"
              //dataset2gradientColour2="255,255,255,1"
              //dataset2gradientColour3="255,255,255,1"
              showLegend={false}
            />
          </div>
          <div className="col-6">
            <div>
              <strong><span className="purpleText">E-Mentors</span> waiting for a match:</strong>
              <i>Most supplied roles vs. Demand</i>
            </div>
            BAR CHART HERE
          </div>
        </div>
      </div>
    );
  }
}

export default GroupDashOverview;
