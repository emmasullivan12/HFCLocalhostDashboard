// Dex last merged this code on 20th apr 2021

import React, { Component } from "react";

import {cdn} from './CDN.js';
import AlertBox from './AlertBox.js';
import BarChart from './BarChart.js';
import {DateCalc, LoadingSpinner} from './GeneralFunctions.js';
import ChoroplethMap from './ChoroplethMap.js';
import DoughnutChart from './DoughnutChart.js';
import LineChart from './LineChart.js';
import {userFlagEmoji} from './UserDetail.js';
import WordCloud from './WordCloud.js';

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
        { text: 'Rich Froning', value: 10 },
        { text: 'Hayley Adams', value: 8 },
        { text: 'LinkedIn', value: 7 },
        { text: 'Event hosted by AVFX', value: 5 },
        { text: 'AVFX Event', value: 4 },
        { text: 'Twitter', value: 4 },
        { text: 'Simon from AVFX', value: 4 },
        { text: 'Simon Devereux', value: 3 },
        { text: 'QVFX Podcast', value: 1 },
        { text: 'Soandso from Framestore', value: 1 },
        { text: 'retrieve', value: 1 },
        { text: 'word', value: 10 },
        { text: 'words', value: 8 },
        { text: 'sprite', value: 7 },
        { text: 'placed', value: 5 },
        { text: 'layout', value: 4 },
        { text: 'algorithm', value: 4 },
        { text: 'area', value: 4 },
        { text: 'without', value: 3 },
        { text: 'step', value: 1 },
        { text: 'bounding', value: 1 },
        { text: 'retrieve', value: 1 },
      ],
      ourGBRDataMentees: [
        ["Brec", 10],
        ["Mont", 10],
        ["Radn", 0],
        ["Caer", 5],
        ["Meri", 10]
      ],
      ourGBRDataMentors: [
        ["Brec", 10],
        ["Mont", 10],
        ["Radn", 0],
        ["Caer", 5],
        ["Meri", 10]
      ],
      totalMembersLineChartLoaded: false,
      menteesWaitingBarChartLoaded: false,
      mentorsWaitingBarChartLoaded: false,
      menteesStackedBarChartLoaded: false,
      menteesGenderChartLoaded: false,
      menteesEthChartLoaded: false,
      mentorsStackedBarChartLoaded: false,
      mentorsGenderChartLoaded: false,
      mentorsEthChartLoaded: false,
      userAgeBarChartLoaded: false,
      menteeTopRolesStackedBarsLoaded: false,
      mentorTopRolesStackedBarsLoaded: false,
      menteeGBRMapLoaded: false,
      menteeUSAMapLoaded: false,
      menteeCANMapLoaded: false,
      menteeAUSMapLoaded: false,
      menteeNZLMapLoaded: false,
      mentorGBRMapLoaded: false,
      mentorUSAMapLoaded: false,
      mentorCANMapLoaded: false,
      mentorAUSMapLoaded: false,
      mentorNZLMapLoaded: false,
      menteeTopEduStackedBarsLoaded: false,
      mentorTopCosStackedBarsLoaded: false,
      wordCloudLoaded: false,
      isGeneralError: false,
      generalErrorMessage: 'Shit went wrong bro! Looks like it was all your fault too'
    }
  }

  renderStackedBars = (data, mainColour, name) => {
    var topRoleValue = data[0].value

    return (
      <div className="stackedBar-outerContainer">
        {this.state[name+'StackedBarsLoaded'] == false ? (
          <LoadingSpinner />
        ) : (
          data.map((role, index) => {
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
          })
        )}
      </div>
    )
  }

  findCounty = (countyCode, role) => {
    const {ourGBRDataMentees, ourGBRDataMentors} = this.state
    var arrToSearch = role == 'mentee' ? ourGBRDataMentees : (role == 'mentor' ? ourGBRDataMentors : null)

    arrToSearch.map((arr, i) => {
      if (arr[0] == countyCode) {
        console.log(arr[0] + ": " + arr[1])
        return arr[1]
      }
    })
  }

  render() {
    const {isGeneralError, generalErrorMessage, ourGBRDataMentees, ourGBRDataMentors, heardAboutFrom, menteeTopEdu, mentorTopCos, menteeTopRoles, mentorTopRoles, menteesByAge, mentorsByAge, menteeEthnicity, mentorEthnicity, mentorGender, menteeGender, menteeRoleSplit1, menteeRoleSplit2, menteeRoleSplit3, menteeRoleSplit4, menteeRoleSplit5, mentorRoleSplit1, mentorRoleSplit2, mentorRoleSplit3, mentorRoleSplit4, mentorRoleSplit5, menteesData, mentorsData, menteesTopRolesDemand, menteesTopRolesSupply, mentorsTopRolesDemand, mentorsTopRolesSupply, totalMembersLineChartLoaded, menteesWaitingBarChartLoaded, mentorsWaitingBarChartLoaded, menteesStackedBarChartLoaded, menteesGenderChartLoaded, menteesEthChartLoaded, mentorsStackedBarChartLoaded, mentorsGenderChartLoaded, mentorsEthChartLoaded, userAgeBarChartLoaded, menteeTopRolesStackedBarsLoaded, mentorTopRolesStackedBarsLoaded, menteeGBRMapLoaded, menteeUSAMapLoaded, menteeCANMapLoaded, menteeAUSMapLoaded, menteeNZLMapLoaded, mentorGBRMapLoaded, mentorUSAMapLoaded, mentorCANMapLoaded, mentorAUSMapLoaded, mentorNZLMapLoaded, menteeTopEduStackedBarsLoaded, mentorTopCosStackedBarsLoaded, wordCloudLoaded} = this.state;
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
      ["MB", 0],
      ["BC", 0],
      ["NU", 0],
      ["NT", 0],
      ["YT", 0],
      ["ON", 5],
      ["QC", 0],
      ["NB", 30],
      ["NS", 0],
      ["NF", 10],
      ["PE", 0],
    ]
    const canDataMentors = [
      ["AB", 5],
      ["SK", 15],
      ["MB", 0],
      ["BC", 0],
      ["NU", 0],
      ["NT", 0],
      ["YT", 0],
      ["ON", 5],
      ["QC", 0],
      ["NB", 30],
      ["NS", 0],
      ["NF", 10],
      ["PE", 0],
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

    /*const gbrDataMentees = [ // PO = our labels 'Brec' + 'Mont + 'Radn' and GD = our labels 'Caer' + 'Meri'
      ["AB", 100],["AG", 95],["AM", 90],["AN", 85],["AR", 80],["AS", 70],["AY", 65],["BA", 60],["BB", 55],["BD", 50],["BE", 40],["BF", 35],["BG", 30],["BH", 25],["BJ", 20],["BK", 15],["BL", 15],["BM", 20],["BN", 30],["BO", 35],["BS", 40],["BU", 45],["BW", 50],["BY", 55],["BZ", 60],["CA", 65],["CC", 70],["CE", 0],["CF", 5],["CH", 10],["CI", 15],["CK", 0],["CL", 5],["CM", 10],["CN", 15],["CO", 20],["CP", 25],["CR", 30],["CS", 35],["CU", 40],["CW", 45],["CY", 50],["DA", 55],["DB", 60],["DE", 65],["DG", 70],["DH", 75],["DI", 80],["DN", 85],["DEVO", 90],["DS", 100],["DU", 105],["DW", 110],["EA", 115],["EB", 120],["ED", 125],["EF", 135],["EG", 145],["EL", 150],["ER", 155],["SUSS", 160],["EX", 165],["EY", 170],["FE", 175],["FI", 180],["FK", 185],["FL", 190],["GC", 195],["GD", 200],["GG", 205],["GR", 210],["HA", 215],["HD", 220],["HE", 225],["HF", 230],["HI", 235],["HK", 240],["HL", 245],["HP", 250],["HR", 255],["HT", 260],["HU", 265],["HV", 270],["HY", 275],["IC", 280],["IT", 285],["IW", 295],["KC", 300],["KE", 305],["KH", 310],["KT", 315],["LA", 320],["LB", 330],["LC", 335],["LD", 340],["LI", 345],["LM", 350],["LR", 355],["LS", 0],["LT", 5],["LU", 10],["LW", 15],["MB", 20],["ME", 25],["MF", 30],["MK", 35],["ML", 40],["MM", 45],["MN", 52],["MO", 100],["MS", 110],["MT", 130],["MW", 135],["MY", 140],["NA", 145],["NB", 150],["ND", 155],["NE", 165],["NF", 170],["NG", 175],["NH", 180],["NL", 185],["NM", 190],["NN", 195],["NO", 200],["NP", 205],["NS", 210],["NT", 215],["NW", 220],["NY", 225],["OM", 230],["OX", 235],["PB", 240],["PE", 245],["PK", 0],["PO", 5],["PS", 10],["RB", 15],["RC", 20],["RF", 25],["RL", 30],["RT", 35],["RU", 40],["SA", 45],["SB", 50],["SF", 55],["SJ", 60],["SL", 65],["SM", 70],["SN", 75],["SO", 80],["SP", 85],["SQ", 90],["SR", 95],["SS", 100],["ST", 105],["SU", 110],["SW", 115],["SY", 120],["TB", 140],["TF", 145],["TH", 150],["TK", 155],["TR", 160],["TW", 165],["VG", 190],["WC", 195],["WD", 200],["WE", 205],["WF", 210],["WH", 215],["WI", 220],["WL", 225],["WM", 230],["WR", 265],["WS", 270],["WT", 275],["WW", 285],["WX", 290],["WY", 295],["XB", 320],["YK", 325],["ZG", 330],["ZH", 335],["ZT", 340],
    ]*/
    const brecMentees = this.findCounty('Brec', 'mentee')
    const montMentees = this.findCounty('Mont', 'mentee')
    const radnMentees = this.findCounty('Radn', 'mentee')
    const caerMentees = this.findCounty('Caer', 'mentee')
    const meriMentees = this.findCounty('Meri', 'mentee')
    const poDataMentees = (brecMentees && montMentees && radnMentees) && (brecMentees + montMentees + radnMentees)
    const gdDataMentees = (caerMentees && meriMentees) && (caerMentees + meriMentees)
    const gbrDataMentees = [
      ["PO", poDataMentees],
      ["GD", gdDataMentees],
      ["Avon", 0],
      ["Bedf", 5],
      ["Berk", 10],
      ["Buck", 15],
      ["Camb", 20],
      ["Ches", 25],
      ["Clev", 30],
      ["Corn", 35],
      ["Cumb", 40],
      ["Derb", 45],
      ["Devo", 50],
      ["Dors", 55],
      ["Durh", 60],
      ["ERYr", 65],
      ["Suss", 70],
      ["Esse", 75],
      ["Glou", 80],
      ["Manc", 85],
      ["Hamp", 90],
      ["Hert", 95],
      ["Here", 100],
      ["IOW", 95],
      ["Kent", 90],
      ["Lanc", 85],
      ["Leic", 80],
      ["Linc", 75],
      ["LdBD", 70],
      ["LdBa", 65],
      ["LdBe", 60],
      ["LdBr", 55],
      ["LdBro", 50],
      ["LdCa", 45],
      ["LdCL", 40],
      ["LdCr", 35],
      ["LdEa", 30],
      ["LdEn", 25],
      ["LdGr", 20],
      ["LdHa", 15],
      ["LdHF", 10],
      ["LdHry", 5],
      ["LdHar", 0],
      ["LdHav", 5],
      ["LdHi", 10],
      ["LdHo", 15],
      ["LdIs", 20],
      ["LdKC", 25],
      ["LdKT", 30],
      ["LdLa", 35],
      ["LdLe", 40],
      ["LdMe", 45],
      ["LdNe", 50],
      ["LdRe", 55],
      ["LdRT", 60],
      ["LdSo", 65],
      ["LdSu", 70],
      ["LdTH", 75],
      ["LdWF", 80],
      ["LdWa", 85],
      ["LdWe", 90],
      ["Mers", 95],
      ["Norf", 100],
      ["Nyor", 95],
      ["Ntha", 90],
      ["Nthu", 85],
      ["Nott", 80],
      ["Oxfo", 75],
      ["Rutl", 70],
      ["Shro", 65],
      ["Some", 60],
      ["Syor", 55],
      ["Staf", 50],
      ["Suff", 45],
      ["Surr", 40],
      ["Tyne", 35],
      ["Warw", 30],
      ["Wmid", 25],
      ["Wsus", 20],
      ["Wyor", 15],
      ["Wilt", 10],
      ["Worc", 5],
      ["Angl", 0],
      ["Blae", 5],
  //    ["Brec", 10],
      ["Brid", 15],
  //    ["Caer", 20],
      ["Cphi", 25],
      ["Card", 30],
      ["Cdgn", 35],
      ["Carm", 40],
      ["Conw", 45],
      ["Denb", 50],
      ["Flin", 55],
      ["Glam", 60],
      ["Neat", 65],
  //    ["Meri", 70],
      ["Mert", 75],
      ["Monm", 80],
    //  ["Mont", 85],
      ["Newp", 90],
      ["Pemb", 95],
    //  ["Radn", 100],
      ["Sgla", 95],
      ["Torf", 90],
      ["Swan", 85],
      ["Wrex", 80],
      ["Aber", 75],
      ["Abds", 70],
      ["Angu", 65],
      ["Argy", 60],
      ["Berw", 55],
      ["Edin", 50],
      ["Clac", 45],
      ["Dumf", 40],
      ["Dund", 35],
      ["Eayr", 30],
      ["Edun", 25],
      ["Elot", 20],
      ["Eren", 15],
      ["Eile", 10],
      ["Falk", 5],
      ["Fife", 0],
      ["Glas", 5],
      ["High", 10],
      ["Inve", 15],
      ["Midl", 20],
      ["Mora", 25],
      ["Nayr", 30],
      ["Nlan", 35],
      ["Orkn", 40],
      ["Pert", 45],
      ["Renf", 50],
      ["Shet", 55],
      ["Sayr", 60],
      ["Slan", 65],
      ["Stir", 70],
      ["Wdun", 75],
      ["Wlot", 80],
      ["Antr", 85],
      ["Arma", 90],
      ["cDow", 95],
      ["Ferm", 100],
      ["CoDe", 105],
      ["Lond", 110],
      ["cTyr", 115],
    ]
  /*  const gbrDataMentors = [ // PO = our labels 'Brec' + 'Mont + 'Radn' and GD = our labels 'Caer' + 'Meri'
      ["AB", 100],["AG", 95],["AM", 90],["AN", 85],["AR", 80],["AS", 70],["AY", 65],["BA", 60],["BB", 55],["BD", 50],["BE", 40],["BF", 35],["BG", 30],["BH", 25],["BJ", 20],["BK", 15],["BL", 15],["BM", 20],["BN", 30],["BO", 35],["BS", 40],["BU", 45],["BW", 50],["BY", 55],["BZ", 60],["CA", 65],["CC", 70],["CE", 0],["CF", 5],["CH", 10],["CI", 15],["CK", 0],["CL", 5],["CM", 10],["CN", 15],["CO", 20],["CP", 25],["CR", 30],["CS", 35],["CU", 40],["CW", 45],["CY", 50],["DA", 55],["DB", 60],["DE", 65],["DG", 70],["DH", 75],["DI", 80],["DN", 85],["Devo", 90],["DS", 100],["DU", 105],["DW", 110],["EA", 115],["EB", 120],["ED", 125],["EF", 135],["EG", 145],["EL", 150],["ER", 155],["SUSS", 160],["EX", 165],["EY", 170],["FE", 175],["FI", 180],["FK", 185],["FL", 190],["GC", 195],["GD", 200],["GG", 205],["GR", 210],["HA", 215],["HD", 220],["HE", 225],["HF", 230],["HI", 235],["HK", 240],["HL", 245],["HP", 250],["HR", 255],["HT", 260],["HU", 265],["HV", 270],["HY", 275],["IC", 280],["IT", 285],["IW", 295],["KC", 300],["KE", 305],["KH", 310],["KT", 315],["LA", 320],["LB", 330],["LC", 335],["LD", 340],["LI", 345],["LM", 350],["LR", 355],["LS", 0],["LT", 5],["LU", 10],["LW", 15],["MB", 20],["ME", 25],["MF", 30],["MK", 35],["ML", 40],["MM", 45],["MN", 52],["MO", 100],["MS", 110],["MT", 130],["MW", 135],["MY", 140],["NA", 145],["NB", 150],["ND", 155],["NE", 165],["NF", 170],["NG", 175],["NH", 180],["NL", 185],["NM", 190],["NN", 195],["NO", 200],["NP", 205],["NS", 210],["NT", 215],["NW", 220],["NY", 225],["OM", 230],["OX", 235],["PB", 240],["PE", 245],["PK", 0],["PO", 5],["PS", 10],["RB", 15],["RC", 20],["RF", 25],["RL", 30],["RT", 35],["RU", 40],["SA", 45],["SB", 50],["SF", 55],["SJ", 60],["SL", 65],["SM", 70],["SN", 75],["SO", 80],["SP", 85],["SQ", 90],["SR", 95],["SS", 100],["ST", 105],["SU", 110],["SW", 115],["SY", 120],["TB", 140],["TF", 145],["TH", 150],["TK", 155],["TR", 160],["TW", 165],["VG", 190],["WC", 195],["WD", 200],["WE", 205],["WF", 210],["WH", 215],["WI", 220],["WL", 225],["WM", 230],["WR", 265],["WS", 270],["WT", 275],["WW", 285],["WX", 290],["WY", 295],["XB", 320],["YK", 325],["ZG", 330],["ZH", 335],["ZT", 340],
    ]*/
    const brecMentors = this.findCounty('Brec', 'mentor')
    const montMentors = this.findCounty('Mont', 'mentor')
    const radnMentors = this.findCounty('Radn', 'mentor')
    const caerMentors = this.findCounty('Caer', 'mentor')
    const meriMentors = this.findCounty('Meri', 'mentor')
    const poDataMentors = (brecMentors && montMentors && radnMentors) && (brecMentors + montMentors + radnMentors)
    const gdDataMentors = (caerMentors && meriMentors) && (caerMentors + meriMentors)
    const gbrDataMentors = [
      ["PO", poDataMentors],
      ["GD", gdDataMentors],
      ["Avon", 0],
      ["Bedf", 5],
      ["Berk", 10],
      ["Buck", 15],
      ["Camb", 20],
      ["Ches", 25],
      ["Clev", 30],
      ["Corn", 35],
      ["Cumb", 40],
      ["Derb", 45],
      ["Devo", 50],
      ["Dors", 55],
      ["Durh", 60],
      ["ERYr", 65],
      ["Suss", 70],
      ["Esse", 75],
      ["Glou", 80],
      ["Manc", 85],
      ["Hamp", 90],
      ["Hert", 95],
      ["Here", 100],
      ["IOW", 95],
      ["Kent", 90],
      ["Lanc", 85],
      ["Leic", 80],
      ["Linc", 75],
      ["LdBD", 70],
      ["LdBa", 65],
      ["LdBe", 60],
      ["LdBr", 55],
      ["LdBro", 50],
      ["LdCa", 45],
      ["LdCL", 40],
      ["LdCr", 35],
      ["LdEa", 30],
      ["LdEn", 25],
      ["LdGr", 20],
      ["LdHa", 15],
      ["LdHF", 10],
      ["LdHry", 5],
      ["LdHar", 0],
      ["LdHav", 5],
      ["LdHi", 10],
      ["LdHo", 15],
      ["LdIs", 20],
      ["LdKC", 25],
      ["LdKT", 30],
      ["LdLa", 35],
      ["LdLe", 40],
      ["LdMe", 45],
      ["LdNe", 50],
      ["LdRe", 55],
      ["LdRT", 60],
      ["LdSo", 65],
      ["LdSu", 70],
      ["LdTH", 75],
      ["LdWF", 80],
      ["LdWa", 85],
      ["LdWe", 90],
      ["Mers", 95],
      ["Norf", 100],
      ["Nyor", 95],
      ["Ntha", 90],
      ["Nthu", 85],
      ["Nott", 80],
      ["Oxfo", 75],
      ["Rutl", 70],
      ["Shro", 65],
      ["Some", 60],
      ["Syor", 55],
      ["Staf", 50],
      ["Suff", 45],
      ["Surr", 40],
      ["Tyne", 35],
      ["Warw", 30],
      ["Wmid", 25],
      ["Wsus", 20],
      ["Wyor", 15],
      ["Wilt", 10],
      ["Worc", 5],
      ["Angl", 0],
      ["Blae", 5],
  //    ["Brec", 10],
      ["Brid", 15],
  //    ["Caer", 20],
      ["Cphi", 25],
      ["Card", 30],
      ["Cdgn", 35],
      ["Carm", 40],
      ["Conw", 45],
      ["Denb", 50],
      ["Flin", 55],
      ["Glam", 60],
      ["Neat", 65],
  //    ["Meri", 70],
      ["Mert", 75],
      ["Monm", 80],
    //  ["Mont", 85],
      ["Newp", 90],
      ["Pemb", 95],
    //  ["Radn", 100],
      ["Sgla", 95],
      ["Torf", 90],
      ["Swan", 85],
      ["Wrex", 80],
      ["Aber", 75],
      ["Abds", 70],
      ["Angu", 65],
      ["Argy", 60],
      ["Berw", 55],
      ["Edin", 50],
      ["Clac", 45],
      ["Dumf", 40],
      ["Dund", 35],
      ["Eayr", 30],
      ["Edun", 25],
      ["Elot", 20],
      ["Eren", 15],
      ["Eile", 10],
      ["Falk", 5],
      ["Fife", 0],
      ["Glas", 5],
      ["High", 10],
      ["Inve", 15],
      ["Midl", 20],
      ["Mora", 25],
      ["Nayr", 30],
      ["Nlan", 35],
      ["Orkn", 40],
      ["Pert", 45],
      ["Renf", 50],
      ["Shet", 55],
      ["Sayr", 60],
      ["Slan", 65],
      ["Stir", 70],
      ["Wdun", 75],
      ["Wlot", 80],
      ["Antr", 85],
      ["Arma", 90],
      ["cDow", 95],
      ["Ferm", 100],
      ["CoDe", 105],
      ["Lond", 110],
      ["cTyr", 115],
    ]

    const ausDataMentees = [
      ["NSW", 10],["QLD", 5],["SAU", 23],["TAS", 7],["VIC", 0],["WAU", 9],["ACT", 31],["JBT", 1],["NTE", 3]
    ]
    const ausDataMentors = [
      ["NSW", 10],["QLD", 5],["SAU", 23],["TAS", 7],["VIC", 0],["WAU", 9],["ACT", 31],["JBT", 1],["NTE", 3]
    ]
    const nzlDataMentees = [
      ["NOR", 100],
      ["Auc", 5],
      ["Wai", 2],
      ["BOP", 56],
      ["GIS", 5],
      ["HAW", 0],
      ["TAR", 0],
      ["MAN", 1],
      ["WEL", 11],
      ["TAS", 22],
      ["NEL", 2],
      ["MAR", 23],
      ["WES", 43],
      ["CAN", 45],
      ["OTA", 14],
      ["SOU", 3],
    ]
    const nzlDataMentors = [
      ["NOR", 100],
      ["Auc", 5],
      ["Wai", 2],
      ["BOP", 56],
      ["GIS", 5],
      ["HAW", 0],
      ["TAR", 0],
      ["MAN", 1],
      ["WEL", 11],
      ["TAS", 22],
      ["NEL", 2],
      ["MAR", 23],
      ["WES", 43],
      ["CAN", 45],
      ["OTA", 14],
      ["SOU", 3],
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
        {(isGeneralError == true || generalErrorMessage != '') && (
          <AlertBox successOrFailure='failure' fadesOut={false}>
            <div>{generalErrorMessage != '' ? generalErrorMessage : 'Hmm, Something went wrong. Please refresh the page and try again'}</div>
          </AlertBox>
        )}
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
            {totalMembersLineChartLoaded == false ? (
              <LoadingSpinner />
            ) : (
              <React.Fragment>
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
              </React.Fragment>
            )}
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
            {menteesWaitingBarChartLoaded == false ? (
              <LoadingSpinner />
            ) : (
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
            )}
          </div>
          <div className="col-6 flexBox-Chart">
            <div className="dash-boxTitle">
              <strong><span className="miniBox-emoji" role="img" aria-label="clockEmoji">⏱️</span> <span className="purpleText"><strong>E-Mentors</strong></span> waiting for a match</strong>
              <div><i>Sorted by most supplied roles vs. Demand</i></div>
            </div>
            {mentorsWaitingBarChartLoaded == false ? (
              <LoadingSpinner />
            ) : (
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
            )}
          </div>
        </div>
        <div className="dash-row fullHeight">
          <div className="col-6 mainBox whiteBox">
            <div className="dash-boxTitle absolute">
              <strong><span className="blueText">Mentees</span></strong>
              <div><i>% split</i></div>
            </div>
            {menteesStackedBarChartLoaded == false ? (
              <LoadingSpinner />
            ) : (
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
            )}
            {menteesGenderChartLoaded == false ? (
              <LoadingSpinner />
            ) : (
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
            )}
            {menteesEthChartLoaded == false ? (
              <LoadingSpinner />
            ) : (
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
            )}
          </div>
          <div className="col-6 mainBox whiteBox">
            <div className="dash-boxTitle absolute">
              <strong><span className="purpleText">E-Mentors</span></strong>
              <div><i>% split</i></div>
            </div>
            {mentorsStackedBarChartLoaded == false ? (
              <LoadingSpinner />
            ) : (
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
            )}
            {mentorsGenderChartLoaded == false ? (
              <LoadingSpinner />
            ) : (
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
            )}
            {mentorsEthChartLoaded == false ? (
              <LoadingSpinner />
            ) : (
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
            )}
          </div>
        </div>
        <div className="dash-row fullHeight">
          <div className="col-6 flexBox-Chart">
            <div className="dash-boxTitle">
              <strong><span className="miniBox-emoji" role="img" aria-label="calendarEmoji">📅</span> Split by Age:</strong>
              <div><i><span className="blueText"><strong>Mentees</strong></span> and <span className="purpleText"><strong>E-Mentors</strong></span></i></div>
            </div>
            {userAgeBarChartLoaded == false ? (
              <LoadingSpinner />
            ) : (
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
            )}
          </div>
          <div className="mainBox whiteBox">
            <div className="dash-boxTitle">
              <span className="miniBox-emoji" role="img" aria-label="fireEmoji">🔥</span> Top Roles <span className="blueText"><strong>Mentees</strong></span> want
              <hr className="lightLineBreak"/>
            </div>
            { this.renderStackedBars(menteeTopRoles, "yellow", 'menteeTopRoles') }
          </div>
          <div className="mainBox whiteBox">
            <div className="dash-boxTitle">
              <span className="miniBox-emoji" role="img" aria-label="briefcaseEmoji">💼</span> Top <span className="purpleText"><strong>E-Mentor</strong></span> Roles
              <hr className="lightLineBreak"/>
            </div>
            { this.renderStackedBars(mentorTopRoles, "black", 'mentorTopRoles') }
          </div>
        </div>
        <div className="dash-row fullHeight">
          <div className="col-6 mainBox">
            <div className="dash-boxTitle absolute">
              <span className="miniBox-emoji" role="img" aria-label="locationPinEmoji">📌</span> <strong><span className="blueText">Mentee</span> Footprint</strong>
            </div>
            {group[0].countries.includes('gbr') && (
              <div>
                <div className="dash-boxTitle absolute mapCountry GBR"><span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji('GBR')}/></span> UK</div>
                {menteeGBRMapLoaded == false ? (
                  <LoadingSpinner />
                ) : (
                  <ChoroplethMap
                    country="gbr"
                    data={gbrDataMentees}
                    name='UKMapMentees'
                    countLabel="Mentees"
                    colourScheme="#00B0F0" // "#4E4ED6" is purple and "#00B0F0" is blue
                    hoverBorderColour="#95d9f3" // '#bbbbff' is light purple and "#95d9f3" is light blue
                  />
                )}
              </div>
            )}
            {group[0].countries.includes('usa') && (
              <div>
                <div className="dash-boxTitle absolute mapCountry"><span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji('USA')}/></span> United States</div>
                {menteeUSAMapLoaded == false ? (
                  <LoadingSpinner />
                ) : (
                  <ChoroplethMap
                    country="usa"
                    data={usaDataMentees}
                    name='USAMapMentees'
                    countLabel="Mentees"
                    colourScheme="#00B0F0" // "#4E4ED6" is purple and "#00B0F0" is blue
                    hoverBorderColour="#95d9f3" // '#bbbbff' is light purple and "#95d9f3" is light blue
                  />
                )}
              </div>
            )}
            {group[0].countries.includes('can') && (
              <div>
                <div className="dash-boxTitle absolute mapCountry"><span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji('CAN')}/></span> Canada</div>
                {menteeCANMapLoaded == false ? (
                  <LoadingSpinner />
                ) : (
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
                )}
              </div>
            )}
            {group[0].countries.includes('aus') && (
              <div>
                <div className="dash-boxTitle absolute mapCountry"><span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji('AUS')}/></span> Australia</div>
                {menteeAUSMapLoaded == false ? (
                  <LoadingSpinner />
                ) : (
                  <ChoroplethMap
                  //  country="gbr"
                  //  data={gbrData}
                    country="aus"
                    data={ausDataMentees}
                    name='AustraliaMapMentees'
                    countLabel="Mentees"
                    colourScheme="#00B0F0" // "#4E4ED6" is purple and "#00B0F0" is blue
                    hoverBorderColour="#95d9f3" // '#bbbbff' is light purple and "#95d9f3" is light blue
                  />
                )}
              </div>
            )}
            {group[0].countries.includes('nzl') && (
              <div>
                <div className="dash-boxTitle absolute mapCountry"><span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji('NZL')}/></span> New Zealand</div>
                {menteeNZLMapLoaded == false ? (
                  <LoadingSpinner />
                ) : (
                  <ChoroplethMap
                  //  country="gbr"
                  //  data={gbrData}
                    country="nzl"
                    data={nzlDataMentees}
                    name='NZLMapMentees'
                    countLabel="Mentees"
                    colourScheme="#00B0F0" // "#4E4ED6" is purple and "#00B0F0" is blue
                    hoverBorderColour="#95d9f3" // '#bbbbff' is light purple and "#95d9f3" is light blue
                  />
                )}
              </div>
            )}
          </div>
          <div className="col-6 mainBox">
            <div className="dash-boxTitle absolute">
              <span className="miniBox-emoji" role="img" aria-label="locationPinEmoji">📌</span> <strong><span className="purpleText">E-Mentor</span> Footprint</strong>
            </div>
            {group[0].countries.includes('gbr') && (
              <div>
                <div className="dash-boxTitle absolute mapCountry GBR"><span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji('GBR')}/></span> UK</div>
                {mentorGBRMapLoaded == false ? (
                  <LoadingSpinner />
                ) : (
                  <ChoroplethMap
                    country="gbr"
                    data={gbrDataMentors}
                    name='UKMapMentors'
                    countLabel="E-Mentors"
                    colourScheme="#4E4ED6" // "#4E4ED6" is purple and "#00B0F0" is blue
                    hoverBorderColour="#bbbbff" // '#bbbbff' is light purple and "#95d9f3" is light blue
                  />
                )}
              </div>
            )}
            {group[0].countries.includes('usa') && (
              <div>
                <div className="dash-boxTitle absolute mapCountry"><span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji('USA')}/></span> United States</div>
                {mentorUSAMapLoaded == false ? (
                  <LoadingSpinner />
                ) : (
                  <ChoroplethMap
                    country="usa"
                    data={usaDataMentors}
                    name='USAMapMentors'
                    countLabel="E-Mentors"
                    colourScheme="#4E4ED6" // "#4E4ED6" is purple and "#00B0F0" is blue
                    hoverBorderColour="#bbbbff" // '#bbbbff' is light purple and "#95d9f3" is light blue
                  />
                )}
              </div>
            )}
            {group[0].countries.includes('can') && (
              <div>
                <div className="dash-boxTitle absolute mapCountry"><span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji('CAN')}/></span> Canada</div>
                {mentorCANMapLoaded == false ? (
                  <LoadingSpinner />
                ) : (
                  <ChoroplethMap
                    country="canada"
                    data={canDataMentors}
                    name='CanadaMapMentors'
                    countLabel="E-Mentors"
                    colourScheme="#4E4ED6" // "#4E4ED6" is purple and "#00B0F0" is blue
                    hoverBorderColour="#bbbbff" // '#bbbbff' is light purple and "#95d9f3" is light blue
                  />
                )}
              </div>
            )}
            {group[0].countries.includes('aus') && (
              <div>
                <div className="dash-boxTitle absolute mapCountry"><span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji('AUS')}/></span> Australia</div>
                {mentorAUSMapLoaded == false ? (
                  <LoadingSpinner />
                ) : (
                  <ChoroplethMap
                    country="aus"
                    data={ausDataMentors}
                    name='AustraliaMapMentors'
                    countLabel="E-Mentors"
                    colourScheme="#4E4ED6" // "#4E4ED6" is purple and "#00B0F0" is blue
                    hoverBorderColour="#bbbbff" // '#bbbbff' is light purple and "#95d9f3" is light blue
                  />
                )}
              </div>
            )}
            {group[0].countries.includes('nzl') && (
              <div>
                <div className="dash-boxTitle absolute mapCountry"><span className="alignVrtl-middle"><i className={"emoji-icon sml " + userFlagEmoji('NZL')}/></span> New Zealand</div>
                {mentorNZLMapLoaded == false ? (
                  <LoadingSpinner />
                ) : (
                  <ChoroplethMap
                  //  country="gbr"
                  //  data={gbrData}
                    country="nzl"
                    data={nzlDataMentors}
                    name='NZLMapMentors'
                    countLabel="E-Mentors"
                    colourScheme="#4E4ED6" // "#4E4ED6" is purple and "#00B0F0" is blue
                    hoverBorderColour="#bbbbff" // '#bbbbff' is light purple and "#95d9f3" is light blue
                  />
                )}
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
            { this.renderStackedBars(menteeTopEdu, "yellow", 'menteeTopEdu') }
          </div>
          <div className="mainBox whiteBox">
            <div className="dash-boxTitle">
              <span className="miniBox-emoji" role="img" aria-label="officeEmoji">🏢</span> Top <span className="purpleText"><strong>E-Mentor</strong></span> Companies
              <hr className="lightLineBreak"/>
            </div>
            { this.renderStackedBars(mentorTopCos, "black", 'mentorTopCos') }
          </div>
          <div className="col-6 flexBox-Chart">
            <div className="dash-boxTitle">
              <strong><span className="miniBox-emoji" role="img" aria-label="heartArrowEmoji">💘</span> How Users heard about you:</strong>
            </div>
            {wordCloudLoaded == false ? (
              <LoadingSpinner />
            ) : (
              <WordCloud
                words={heardAboutFrom}
              />
            )}
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
