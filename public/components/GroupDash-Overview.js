// Dex last merged this code on 14th apr 2021

import React, { Component } from "react";

import {cdn} from './CDN.js';
import BarChart from './BarChart.js';
import {DateCalc} from './GeneralFunctions.js';
import ChoroplethMap from './ChoroplethMap.js';
import DoughnutChart from './DoughnutChart.js';
import LineChart from './LineChart.js';
import {userFlagEmoji} from './UserDetail.js';
//import WordCloud from './WordCloud.js';

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
      menteesTopRolesDemand: [ // Only for unmatched mentees
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
      menteesTopRolesSupply: [ // Only for unmatched E-Mentors
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
      mentorsTopRolesDemand: [ // Only for unmatched E-Mentors
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
      mentorsTopRolesSupply: [ // Only for unmatched mentees
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
      menteeRoleSplit1: [ // must be in same order as mentorRoleSplits
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
      mentorRoleSplit1: [ // must be in same order as mentorRoleSplits
        {
          "label": '2D',
          "value": .3
        }
      ],
      mentorRoleSplit2: [
        {
          "label": '3D',
          "value": .3
        }
      ],
      mentorRoleSplit3: [
        {
          "label": 'Art / Animation',
          "value": .2
        }
      ],
      mentorRoleSplit4: [
        {
          "label": 'Technical',
          "value": .15
        }
      ],
      mentorRoleSplit5: [
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
      mentorGender: [ // must be in same order as menteeGender
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
      mentorEthnicity: [ // must be in same order as menteeEthnicity
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
      menteesByAge: [
        {
          "label": '13-15 years',
          "value": 10
        },
        {
          "label": '16-18 years',
          "value": 30
        },
        {
          "label": '19-25 years',
          "value": 76
        },
        {
          "label": '26-30 years',
          "value": 50
        },
        {
          "label": '31-40 years',
          "value": 20
        },
        {
          "label": '41-50 years',
          "value": 15
        },
        {
          "label": '51-65 years',
          "value": 5
        },
        {
          "label": '65+ years',
          "value": 1
        },
      ],
      mentorsByAge: [
        {
          "label": '13-15 years',
          "value": 0
        },
        {
          "label": '16-18 years',
          "value": 0
        },
        {
          "label": '19-25 years',
          "value": 40
        },
        {
          "label": '26-30 years',
          "value": 45
        },
        {
          "label": '31-40 years',
          "value": 60
        },
        {
          "label": '41-50 years',
          "value": 30
        },
        {
          "label": '51-65 years',
          "value": 20
        },
        {
          "label": '65+ years',
          "value": 5
        },
      ],
      menteeTopRoles: [ // All mentees
        {
          "label": '2D Animator',
          "value": .25
        },
        {
          "label": 'Character Animator',
          "value": .21
        },
        {
          "label": 'Compositor',
          "value": .17
        },
        {
          "label": '3D Animator',
          "value": .05
        },
        {
          "label": 'Director',
          "value": .02
        },
      ],
      mentorTopRoles: [ // All mentees
        {
          "label": '2D Animator',
          "value": .25
        },
        {
          "label": 'Character Animator',
          "value": .11
        },
        {
          "label": 'Compositor',
          "value": .07
        },
        {
          "label": '3D Animator',
          "value": .05
        },
        {
          "label": 'Director',
          "value": .02
        },
      ],
      menteeTopEdu: [ // All mentees
        {
          "label": 'University of Bath',
          "value": .25
        },
        {
          "label": 'Escape Studios (Pearson)',
          "value": .21
        },
        {
          "label": 'Villiers High School',
          "value": .17
        },
        {
          "label": 'Bournemouth University',
          "value": .05
        },
        {
          "label": 'Berkhamsted',
          "value": .02
        },
      ],
      mentorTopCos: [ // All mentors
        {
          "label": 'Framestore',
          "value": .25
        },
        {
          "label": 'DNEG',
          "value": .21
        },
        {
          "label": 'ILM',
          "value": .17
        },
        {
          "label": 'Atari',
          "value": .05
        },
        {
          "label": 'Jellyfish',
          "value": .02
        },
      ],
      heardAboutFrom: [
        { key: 'word', value: 10 },
        { key: 'words', value: 8 },
        { key: 'sprite', value: 7 },
        { key: 'placed', value: 5 },
        { key: 'layout', value: 4 },
        { key: 'algorithm', value: 4 },
        { key: 'area', value: 4 },
        { key: 'without', value: 3 },
        { key: 'step', value: 1 },
        { key: 'bounding', value: 1 },
        { key: 'retrieve', value: 1 },
      ],
    }
  }

  renderStackedBars = (data, mainColour) => {
    var topRoleValue = data[0].value

    return (
      <div className="stackedBar-outerContainer">
        {data.map((role, index) => {
          return (
            <div className="stackedBar-container small" key={index}>
              <BarChart
                dataset1={[{"label": role.label, "value": role.value}]}
                dataset1Title={role.label}
                dataset1Colour={mainColour == 'yellow' ? "rgb(252,225,0,1)" : '#3f3f3f'}
                dataset1Fill={mainColour == 'yellow' ? "rgb(252,225,0,1)" : '#3f3f3f'}
                dataset2={[{"label": 'Rest', "value": (topRoleValue - role.value)}]}
                dataset2Title="Rest"
                dataset2Colour="#bdbdbd" // grey
                dataset2Fill="#d0d0d0" // grey
                showHorizontal
                showLegend={false}
                showTitle={false}
                showTooltip={false}
                stacked
                showTitleAndPercentLabels
                barLabelFont='12px Helvetica Neue, Helvetica, Arial, sans-serif'
              />
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const {heardAboutFrom, menteeTopEdu, mentorTopCos, menteeTopRoles, mentorTopRoles, menteesByAge, mentorsByAge, menteeEthnicity, mentorEthnicity, mentorGender, menteeGender, menteeRoleSplit1, menteeRoleSplit2, menteeRoleSplit3, menteeRoleSplit4, menteeRoleSplit5, mentorRoleSplit1, mentorRoleSplit2, mentorRoleSplit3, mentorRoleSplit4, mentorRoleSplit5, menteesData, mentorsData, menteesTopRolesDemand, menteesTopRolesSupply, mentorsTopRolesDemand, mentorsTopRolesSupply} = this.state;
    const adminUser = {
      fname: 'Simon'
    }
    const group = [{
      newSignUps: 62,
      matched: 1067,
      datecreated: '2020-01-01T14:46:14.209Z',
      countries: ['gbr', 'usa', 'can', 'nzl', 'aus'],
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
    const canDataMentees = [
      ["AB", 5],
      ["SK", 15],
    ]
    const canDataMentors = [
      ["AB", 5],
      ["SK", 15],
    ]
    const usaDataMentees = [
      ["AZ", 5],
      ["CO", 5],
      ["DE", 32],
      ["FL", 29],
      ["GA", 32],
      ["HI", 32],
      ["ID", 32],
      ["IL", 32],
      ["IN", 11],
      ["IA", 11],
      ["KS", 32],
      ["KY", 32],
      ["LA", 32],
      ["MD", 32],
      ["ME", 32],
      ["MA", 32],
      ["MN", 32],
      ["MI", 32],
      ["MS", 32],
      ["MO", 13],
      ["MT", 32],
      ["NC", 32],
      ["NE", 32],
      ["NV", 0],
      ["NH", 32],
      ["NJ", 32],
      ["NY", 32],
      ["ND", 32],
      ["NM", 0],
      ["OH", 32],
      ["OK", 32],
      ["OR", 0],
      ["PA", 32],
      ["RI", 32],
      ["SC", 32],
      ["SD", 32],
      ["TN", 32],
      ["TX", 0],
      ["UT", 32],
      ["WI", 32],
      ["VA", 32],
      ["VT", 32],
      ["WA", 32],
      ["WV", 32],
      ["WY", 32],
      ["CA", 0],
      ["CT", 32],
      ["AK", 32],
      ["AR", 32],
      ["AL", 0],
    ]
    const usaDataMentors = [
      ["AZ", 5],
      ["CO", 5],
      ["DE", 32],
      ["FL", 29],
      ["GA", 32],
      ["HI", 32],
      ["ID", 32],
      ["IL", 32],
      ["IN", 11],
      ["IA", 11],
      ["KS", 32],
      ["KY", 32],
      ["LA", 32],
      ["MD", 32],
      ["ME", 32],
      ["MA", 32],
      ["MN", 32],
      ["MI", 32],
      ["MS", 32],
      ["MO", 13],
      ["MT", 32],
      ["NC", 32],
      ["NE", 32],
      ["NV", 0],
      ["NH", 32],
      ["NJ", 32],
      ["NY", 32],
      ["ND", 32],
      ["NM", 0],
      ["OH", 32],
      ["OK", 32],
      ["OR", 0],
      ["PA", 32],
      ["RI", 32],
      ["SC", 32],
      ["SD", 32],
      ["TN", 32],
      ["TX", 0],
      ["UT", 32],
      ["WI", 32],
      ["VA", 32],
      ["VT", 32],
      ["WA", 32],
      ["WV", 32],
      ["WY", 32],
      ["CA", 0],
      ["CT", 32],
      ["AK", 32],
      ["AR", 32],
      ["AL", 0],
    ]
    const gbrData = [
      ["BU", 75], ["CM", 43], ["CO", 50], ["DS", 88], ["ES", 150],
    ]

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
              <strong><span className="miniBox-emoji" role="img" aria-label="clockEmoji">⏱️</span> <span className="blueText"><strong>Mentees</strong></span> waiting for a match</strong>
              <div><i>Sorted by most in-demand roles vs. Supply</i></div>
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
              <strong><span className="miniBox-emoji" role="img" aria-label="clockEmoji">⏱️</span> <span className="purpleText"><strong>E-Mentors</strong></span> waiting for a match</strong>
              <div><i>Sorted by most supplied roles vs. Demand</i></div>
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
        <div className="dash-row fullHeight">
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
                showTooltip
                stacked
                showDataLabelsOnBar
//                datasetToShowBarLabel="all" // "all" or e.g. "Mentees" or "E-Mentors"
//                barLabelToShow='data' // "data" i.e. take the value or 'text string' or '🔥' (html emoji)
              />
            </div>
            <div>
              <DoughnutChart
                dataset1={menteeGender}
                dataset1Title={menteeGender[0].label}
                data1Colour="rgb(249,123,171,1)"
                data2Colour="rgb(249,123,171,.8)"
                data3Colour="rgb(249,123,171,.6)"
                data4Colour="rgb(249,123,171,.4)"
                showLegend
                showTitle
                titleText='by Gender 🧑‍🤝‍🧑'
                showDataLabelsOnSegment
              //  showTooltip={false}
              />
            </div>
            <div>
              <DoughnutChart
                dataset1={menteeEthnicity}
                dataset1Title={menteeEthnicity[0].label}
                data1Colour="rgb(78,78,214,1)"
                data2Colour="rgb(78,78,214,.8)"
                data3Colour="rgb(78,78,214,.6)"
                data4Colour="rgb(78,78,214,.4)"
                data5Colour="rgb(21,205,148,1)"
                data6Colour="rgb(21,205,148,.8)"
                data7Colour="rgb(21,205,148,.6)"
                data8Colour="rgb(21,205,148,.4)"
                data9Colour="rgb(252,225,0,1)"
                data10Colour="rgb(252,225,0,.8)"
                data11Colour="rgb(252,225,0,.6)"
                data12Colour="rgb(252,225,0,.4)"
                showLegend
                showTitle
                titleText='by Ethnicity 🌍'
                showDataLabelsOnSegment
              //  showTooltip={false}
              />
            </div>
          </div>
          <div className="col-6 mainBox whiteBox">
            <div className="dash-boxTitle absolute">
              <strong><span className="purpleText">E-Mentors</span></strong>
              <div><i>% split</i></div>
            </div>
            <div className="stackedBar-container">
              <BarChart
                dataset1={mentorRoleSplit1}
                dataset1Title={mentorRoleSplit1[0].label}
                dataset1Colour="#4E4ED6"
                dataset1Fill="rgba(78,78,214,.3)"
                dataset1HoverFill="rgba(78,78,214,1)"
                dataset2={mentorRoleSplit2}
                dataset2Title={mentorRoleSplit2[0].label}
                dataset2Colour="#15CD94"
                dataset2Fill="rgba(21,205,148,.3)"
                dataset2HoverFill="rgba(21,205,148,1)"
                dataset3={mentorRoleSplit3}
                dataset3Title={mentorRoleSplit3[0].label}
                dataset3Colour="#F97BAB"
                dataset3Fill="rgba(249,123,171,.3)"
                dataset3HoverFill="rgba(249,123,171,1)"
                dataset4={mentorRoleSplit4}
                dataset4Title={mentorRoleSplit4[0].label}
                dataset4Colour="#00B0F0"
                dataset4Fill="rgba(0,176,240,.3)"
                dataset4HoverFill="rgba(0,176,240,1)"
                dataset5={mentorRoleSplit5}
                dataset5Title={mentorRoleSplit5[0].label}
                dataset5Colour="#fce100"
                dataset5Fill="rgba(252,225,0,.3)"
                dataset5HoverFill="rgba(252,225,0,1)"
                showHorizontal
                showLegend
                showTitle
                titleText="by Role type 💼"
                showTooltip
                stacked
                showDataLabelsOnBar
              />
            </div>
            <div>
              <DoughnutChart
                dataset1={mentorGender}
                dataset1Title={mentorGender[0].label}
                data1Colour="rgb(249,123,171,1)"
                data2Colour="rgb(249,123,171,.8)"
                data3Colour="rgb(249,123,171,.6)"
                data4Colour="rgb(249,123,171,.4)"
                showLegend
                showTitle
                titleText='by Gender 🧑‍🤝‍🧑'
                showDataLabelsOnSegment
              />
            </div>
            <div>
              <DoughnutChart
                dataset1={mentorEthnicity}
                dataset1Title={mentorEthnicity[0].label}
                data1Colour="rgb(78,78,214,1)"
                data2Colour="rgb(78,78,214,.8)"
                data3Colour="rgb(78,78,214,.6)"
                data4Colour="rgb(78,78,214,.4)"
                data5Colour="rgb(21,205,148,1)"
                data6Colour="rgb(21,205,148,.8)"
                data7Colour="rgb(21,205,148,.6)"
                data8Colour="rgb(21,205,148,.4)"
                data9Colour="rgb(252,225,0,1)"
                data10Colour="rgb(252,225,0,.8)"
                data11Colour="rgb(252,225,0,.6)"
                data12Colour="rgb(252,225,0,.4)"
                showLegend
                showTitle
                titleText='by Ethnicity 🌍'
                showDataLabelsOnSegment
              />
            </div>
          </div>
        </div>
        <div className="dash-row fullHeight">
          <div className="col-6 flexBox-Chart">
            <div className="dash-boxTitle">
              <strong><span className="miniBox-emoji" role="img" aria-label="calendarEmoji">📅</span> Split by Age:</strong>
              <div><i><span className="blueText"><strong>Mentees</strong></span> and <span className="purpleText"><strong>E-Mentors</strong></span></i></div>
            </div>
            <BarChart
              dataset1={menteesByAge}
              dataset1Title="Mentees"
              dataset1Colour="#00B0F0"
              dataset1Fill="rgba(0,176,240,.2)"
              dataset1HoverFill="rgba(0,176,240,.95)"
              dataset2={mentorsByAge}
              dataset2Title="E-Mentors"
              dataset2Colour="#4E4ED6"
              dataset2Fill="rgba(78,78,214,.2)"
              dataset2HoverFill="rgba(78,78,214,.9)"
              showLegend={false}
              showTitle={false}
              showTooltip
              datasetToShowBarLabel="all" // "all" or e.g. "Mentees" or "E-Mentors"
              barLabelToShow='data' // "data" i.e. take the value or 'text string' or '🔥' (html emoji)
              barLabelFont='12px Helvetica Neue, Helvetica, Arial, sans-serif' // useful to make emojis bigger
            />
          </div>
          <div className="mainBox whiteBox">
            <div className="dash-boxTitle">
              <span className="miniBox-emoji" role="img" aria-label="fireEmoji">🔥</span> Top Roles <span className="blueText"><strong>Mentees</strong></span> want
              <hr className="lightLineBreak"/>
            </div>
            { this.renderStackedBars(menteeTopRoles, "yellow") }
          </div>
          <div className="mainBox whiteBox">
            <div className="dash-boxTitle">
              <span className="miniBox-emoji" role="img" aria-label="briefcaseEmoji">💼</span> Top <span className="purpleText"><strong>E-Mentor</strong></span> Roles
              <hr className="lightLineBreak"/>
            </div>
            { this.renderStackedBars(mentorTopRoles, "black") }
          </div>
        </div>
        <div className="dash-row fullHeight">
          <div className="col-6 mainBox">
            <div className="dash-boxTitle absolute">
              <span className="miniBox-emoji" role="img" aria-label="locationPinEmoji">📌</span> <strong><span className="blueText">Mentee</span> Footprint</strong>
            </div>
            {group[0].countries.includes('usa') && (
              <div className="choropleth-outerContainer">
                <div className="dash-boxTitle absolute mapCountry"><span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji('USA')}/></span> United States</div>
                <ChoroplethMap
                  country="usa"
                  data={usaDataMentees}
                  name='USAMapMentees'
                  countLabel="Mentees"
                  colourScheme="#00B0F0" // "#4E4ED6" is purple and "#00B0F0" is blue
                  hoverBorderColour="#95d9f3" // '#bbbbff' is light purple and "#95d9f3" is light blue
                />
              </div>
            )}
            {group[0].countries.includes('can') && (
              <div className="choropleth-outerContainer">
                <div className="dash-boxTitle absolute mapCountry"><span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji('CAN')}/></span> Canada</div>
                <ChoroplethMap
                //  country="gbr"
                //  data={gbrData}
                  country="canada"
                  data={canDataMentees}
                  name='CanadaMapMentees'
                  countLabel="Mentees"
                  colourScheme="#00B0F0" // "#4E4ED6" is purple and "#00B0F0" is blue
                  hoverBorderColour="#95d9f3" // '#bbbbff' is light purple and "#95d9f3" is light blue
                />
              </div>
            )}
          </div>
          <div className="col-6 mainBox">
            <div className="dash-boxTitle absolute">
              <span className="miniBox-emoji" role="img" aria-label="locationPinEmoji">📌</span> <strong><span className="purpleText">E-Mentor</span> Footprint</strong>
            </div>
            {group[0].countries.includes('usa') && (
              <div className="choropleth-outerContainer">
                <div className="dash-boxTitle absolute mapCountry"><span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji('USA')}/></span> United States</div>
                <ChoroplethMap
                  country="usa"
                  data={usaDataMentors}
                  name='USAMapMentors'
                  countLabel="E-Mentors"
                  colourScheme="#4E4ED6" // "#4E4ED6" is purple and "#00B0F0" is blue
                  hoverBorderColour="#bbbbff" // '#bbbbff' is light purple and "#95d9f3" is light blue
                />
              </div>
            )}
            {group[0].countries.includes('can') && (
              <div className="choropleth-outerContainer">
                <div className="dash-boxTitle absolute mapCountry"><span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji('CAN')}/></span> Canada</div>
                <ChoroplethMap
                  country="canada"
                  data={canDataMentors}
                  name='CanadaMapMentors'
                  countLabel="E-Mentors"
                  colourScheme="#4E4ED6" // "#4E4ED6" is purple and "#00B0F0" is blue
                  hoverBorderColour="#bbbbff" // '#bbbbff' is light purple and "#95d9f3" is light blue
                />
              </div>
            )}
          </div>
        </div>
        <div className="dash-row fullHeight">
          <div className="mainBox whiteBox">
            <div className="dash-boxTitle">
              <span className="miniBox-emoji" role="img" aria-label="schoolEmoji">🏫</span> Top <span className="blueText"><strong>Mentee</strong></span> School / Unis
              <hr className="lightLineBreak"/>
            </div>
            { this.renderStackedBars(menteeTopEdu, "yellow") }
          </div>
          <div className="mainBox whiteBox">
            <div className="dash-boxTitle">
              <span className="miniBox-emoji" role="img" aria-label="officeEmoji">🏢</span> Top <span className="purpleText"><strong>E-Mentor</strong></span> Companies
              <hr className="lightLineBreak"/>
            </div>
            { this.renderStackedBars(mentorTopCos, "black") }
          </div>
          <div className="col-6 flexBox-Chart">
            <div className="dash-boxTitle">
              <strong><span className="miniBox-emoji" role="img" aria-label="heartArrowEmoji">💘</span> How Users heard about you:</strong>
            </div>
          {/*  <WordCloud
              words={heardAboutFrom}
            />*/}
          </div>
        </div>
        <div className="dash-row fullHeight">
          <div className="bottomCTA">
            <span className="miniBox-emoji" role="img" aria-label="waveEmoji">👋</span> <span className="purpleText"><strong>Have a nice day!</strong></span>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupDashOverview;
