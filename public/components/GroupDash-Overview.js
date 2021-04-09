// Dex last merged this code on 10th August 2019

import React, { Component } from "react";

import {cdn} from './CDN.js';
import BarChart from './BarChart.js';
import {DateCalc} from './GeneralFunctions.js';
import DoughnutChart from './DoughnutChart.js';
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
      ],
      mentorsTopRolesDemand: [
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
      mentorsTopRolesSupply: [
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
      ],
      menteeRoleSplit1: [
        {
          "label": '2D',
          "value": .3
        }
      ],
      menteeRoleSplit2: [
        {
          "label": '3D',
          "value": .3
        }
      ],
      menteeRoleSplit3: [
        {
          "label": 'Art / Animation',
          "value": .2
        }
      ],
      menteeRoleSplit4: [
        {
          "label": 'Technical',
          "value": .15
        }
      ],
      menteeRoleSplit5: [
        {
          "label": 'Other',
          "value": .05
        },
      ],
      menteeGender: [
        {
          "label": 'Male',
          "value": .4
        },
        {
          "label": 'Female',
          "value": .35
        },
        {
          "label": 'Other',
          "value": .05
        },
        {
          "label": 'Prefer not to say',
          "value": .2
        },
      ],
      mentorGender: [
        {
          "label": 'Male',
          "value": .4
        },
        {
          "label": 'Female',
          "value": .35
        },
        {
          "label": 'Other',
          "value": .05
        },
        {
          "label": 'Prefer not to say',
          "value": .2
        },
      ],
      menteeEthnicity: [
        {
          "label": 'Aboriginal Australian',
          "value": .025
        },
        {
          "label": 'Asian',
          "value": .2
        },
        {
          "label": 'Arab',
          "value": .025
        },
        {
          "label": 'Black / African / Caribbean',
          "value": .1
        },
        {
          "label": 'Hispanic / Latinx',
          "value": .1
        },
        {
          "label": 'Indian / Pakistani',
          "value": .1
        },
        {
          "label": 'Mixed / Multiple Ethnic Groups',
          "value": .025
        },
        {
          "label": 'Maori',
          "value": .025
        },
        {
          "label": 'Pacific Islander',
          "value": 0.1
        },
        {
          "label": 'White',
          "value": .2
        },
        {
          "label": 'Other',
          "value": .05
        },
        {
          "label": 'Prefer not to say',
          "value": .05
        },
      ],
      mentorEthnicity: [
        {
          "label": 'Aboriginal Australian',
          "value": .025
        },
        {
          "label": 'Asian',
          "value": .2
        },
        {
          "label": 'Arab',
          "value": .025
        },
        {
          "label": 'Black / African / Caribbean',
          "value": .1
        },
        {
          "label": 'Hispanic / Latinx',
          "value": .1
        },
        {
          "label": 'Indian / Pakistani',
          "value": .1
        },
        {
          "label": 'Mixed / Multiple Ethnic Groups',
          "value": .025
        },
        {
          "label": 'Maori',
          "value": .025
        },
        {
          "label": 'Pacific Islander',
          "value": 0.1
        },
        {
          "label": 'White',
          "value": .2
        },
        {
          "label": 'Other',
          "value": .05
        },
        {
          "label": 'Prefer not to say',
          "value": .05
        },
      ],
    }
  }

  render() {
    const {menteeEthnicity, mentorEthnicity, mentorGender, menteeGender, menteeRoleSplit1, menteeRoleSplit2, menteeRoleSplit3, menteeRoleSplit4, menteeRoleSplit5, menteeRoleSplit, menteesData, mentorsData, menteesTopRolesDemand, menteesTopRolesSupply, mentorsTopRolesDemand, mentorsTopRolesSupply} = this.state;
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
          <div className="mainBox whiteBox">
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
            <div className="miniBox first whiteBox">
              <span className="miniBox-emoji" role="img" aria-label="linkEmoji">🔗</span>
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
            <div className="miniBox second whiteBox">
              <span className="miniBox-emoji" role="img" aria-label="clockEmoji">⏱️</span>
              <div className="miniBox-title"><strong>In Progress</strong></div>
              <div className="miniBox-text"><i>Mentees</i></div>
              <div className="miniBox-numLarge"><strong>{numPendingMentees}</strong></div>
              <div className="miniBox-text"><i>Mentors</i></div>
              <div className="miniBox-numLarge"><strong>{numPendingMentors}</strong></div>
            </div>
            <div className="miniBox third whiteBox">
              <span className="miniBox-emoji" role="img" aria-label="crossEmoji">❌</span>
              <div className="miniBox-title"><strong>No Match</strong></div>
              <div className="miniBox-text"><i>Mentees</i></div>
              <div className="miniBox-numLarge"><strong>{numNoMatchMentees}</strong></div>
              <div className="miniBox-text"><i>Mentors</i></div>
              <div className="miniBox-numLarge"><strong>{numNoMatchMentors}</strong></div>
            </div>
          </div>
        </div>
        <div className="dash-row tall">
          <div className="col-6 flexBox-Chart">
            <div className="dash-boxTitle">
              <strong><span className="miniBox-emoji" role="img" aria-label="fireEmoji">🔥</span> Most in-demand roles by Mentees:</strong>
              <div><i><span className="blueText"><strong>Mentees</strong></span> waiting for a match vs. Supply</i></div>
            </div>
            <BarChart
              dataset1={menteesTopRolesDemand}
              dataset1Title="Mentees"
              dataset1Colour="#00B0F0"
              dataset1Fill="rgba(0,176,240,.2)"
              dataset1HoverFill="rgba(0,176,240,.95)"
              dataset2={menteesTopRolesSupply}
              dataset2Title="E-Mentors"
              dataset2Colour="#bdbdbd"
              dataset2Fill="#d0d0d0"
              dataset2HoverFill="#7f7f7f"
              showLegend={false}
              showTitle={false}
              showTooltip
              datasetToShowBarLabel="all" // "all" or e.g. "Mentees" or "E-Mentors"
              barLabelToShow='data' // "data" i.e. take the value or 'text string' or '🔥' (html emoji)
              barLabelFont='12px Helvetica Neue, Helvetica, Arial, sans-serif' // useful to make emojis bigger
            />
          </div>
          <div className="col-6 flexBox-Chart">
            <div className="dash-boxTitle">
              <strong><span className="miniBox-emoji" role="img" aria-label="clockEmoji">⏱️</span> Most supplied roles by E-Mentors:</strong>
              <div><i><span className="purpleText"><strong>E-Mentors</strong></span> waiting for a match vs. Demand</i></div>
            </div>
            <BarChart
              dataset1={mentorsTopRolesDemand}
              dataset1Title="E-Mentors"
              dataset1Colour="#4E4ED6"
              dataset1Fill="rgba(78,78,214,.2)"
              dataset1HoverFill="rgba(78,78,214,.9)"
              dataset2={mentorsTopRolesSupply}
              dataset2Title="Mentees"
              dataset2Colour="#bdbdbd"
              dataset2Fill="#d0d0d0"
              dataset2HoverFill="#7f7f7f"
              showLegend={false}
              showTitle={false}
              showTooltip
              datasetToShowBarLabel="all" // "all" or e.g. "Mentees" or "E-Mentors"
              barLabelToShow='data' // "data" i.e. take the value or 'text string' or '🔥' (html emoji)
              barLabelFont='12px Helvetica Neue, Helvetica, Arial, sans-serif' // useful to make emojis bigger
            />
          </div>
        </div>
        <div className="dash-row">
          <div className="col-6 mainBox whiteBox">
            <div className="dash-boxTitle absolute">
              <strong><span className="blueText">Mentees</span></strong>
              <div><i>% split</i></div>
            </div>
            <div className="stackedBar-container">
              <BarChart
                dataset1={menteeRoleSplit1}
                dataset1Title={menteeRoleSplit1[0].label}
                dataset1Colour="#4E4ED6"
                dataset1Fill="rgba(78,78,214,.3)"
                dataset1HoverFill="rgba(78,78,214,1)"
                dataset2={menteeRoleSplit2}
                dataset2Title={menteeRoleSplit2[0].label}
                dataset2Colour="#15CD94"
                dataset2Fill="rgba(21,205,148,.3)"
                dataset2HoverFill="rgba(21,205,148,1)"
                dataset3={menteeRoleSplit3}
                dataset3Title={menteeRoleSplit3[0].label}
                dataset3Colour="#F97BAB"
                dataset3Fill="rgba(249,123,171,.3)"
                dataset3HoverFill="rgba(249,123,171,1)"
                dataset4={menteeRoleSplit4}
                dataset4Title={menteeRoleSplit4[0].label}
                dataset4Colour="#00B0F0"
                dataset4Fill="rgba(0,176,240,.3)"
                dataset4HoverFill="rgba(0,176,240,1)"
                dataset5={menteeRoleSplit5}
                dataset5Title={menteeRoleSplit5[0].label}
                dataset5Colour="#fce100"
                dataset5Fill="rgba(252,225,0,.3)"
                dataset5HoverFill="rgba(252,225,0,1)"
                showHorizontal
                showLegend
                showTitle
                titleText="by Role type 💼"
                showTooltip={false}
                stacked
                showDataLabelsOnBar
//                datasetToShowBarLabel="all" // "all" or e.g. "Mentees" or "E-Mentors"
//                barLabelToShow='data' // "data" i.e. take the value or 'text string' or '🔥' (html emoji)
              />
            </div>
            <div>
              <div className="col-6">
                <DoughnutChart
                  dataset1={menteeGender}
                  dataset1Title={menteeGender[0].label}
                  data1Colour="rgb(249,123,171,1)"
                  data2Colour="rgb(249,123,171,.8)"
                  data3Colour="rgb(249,123,171,.6)"
                  data4Colour="rgb(249,123,171,.4)"
                  showLegend={false}
                  showTitle
                  titleText='by Gender 🧑‍🤝‍🧑'
                  showDataLabelsOnBar
                //  showTooltip={false}
                />
              </div>
              <div className="col-6">
                <DoughnutChart
                  dataset1={menteeEthnicity}
                  dataset1Title={menteeEthnicity[0].label}
                  data1Colour="rgb(249,123,171,1)"
                  data2Colour="rgb(249,123,171,.8)"
                  data3Colour="rgb(249,123,171,.6)"
                  data4Colour="rgb(249,123,171,.4)"
                  showLegend={false}
                  showTitle
                  titleText='by Ethnicity 🌍'
                  showDataLabelsOnBar
                //  showTooltip={false}
                />
              </div>
            </div>
          </div>
          <div className="col-6 mainBox whiteBox">
            <div className="dash-boxTitle">
              <strong><span className="purpleText">E-Mentors</span></strong>
              <div><i>% split</i></div>
            </div>
            STACKED BAR HERE
            PIE CHART HERE
            SECOND PIE CHART HERE
          </div>
        </div>
      </div>
    );
  }
}

export default GroupDashOverview;
