// Dex last merged this code on 8th mar 2021

import React, { Component } from "react";
import {getGroupName} from "./UserDetail.js";
import {DateCalc, X, Check} from "./GeneralFunctions";

// This shows the content within an individual row in the ChatMenu
class NullMatch extends Component {

  sortTable = (n) => {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("pendingMatches-table");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  render() {
    const {match, isFirstItem} = this.props;

    const menteename = "Billy Bob";
    const mentorname = "Dilly Dally";
    const menteegroup = getGroupName(match.menteegroups[0], 'short')
    const mentorgroup = getGroupName(match.mentorgroups[0], 'short')

// Matchstatus: 1=profile sent, 2=mentee timed out, 3=mentee accepted, 4=menteerejected, 5=mentor timed out, 6=mentor accepted, 7=mentor rejected

    return(
      <React.Fragment>
        {isFirstItem && (
          <thead>
            <tr>
              <th className="userToMatch-name" onClick={() => this.sortTable(0)}>Mentee <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-group alignCenter">Mentee Group</th>
              <th className="userToMatch-name" onClick={() => this.sortTable(1)}>E-Mentor <span className="greyText"><i className="fas fa-sort"/></span></th>
              <th className="userToMatch-group alignCenter">E-Mentor Group</th>
              <th className="userToMatch-dates alignCenter">Sent Profile to Mentee</th>
              <th className="userToMatch-dates alignCenter">Mentee Chaser 1</th>
              <th className="userToMatch-dates alignCenter">Mentee Chaser 2</th>
              <th colSpan="2" className="userToMatch-userResponse">Mentee Response</th>
              <th className="userToMatch-dates alignCenter">E-Mentor Chaser 1</th>
              <th className="userToMatch-dates alignCenter">E-Mentor Chaser 2</th>
              <th colSpan="2" className="userToMatch-userResponse">E-Mentor Response</th>
            </tr>
          </thead>
        )}
        <tbody>
          <tr>
            <td>{menteename}</td>
            <td className="alignCenter">{menteegroup}</td>
            <td>{mentorname}</td>
            <td className="alignCenter">{mentorgroup}</td>
            <td className="alignCenter">
              <div className="greenText">
                <Check />
              </div>
            </td>
            <td className="alignCenter">
              {match.menteechaser1 != '' ? (
                <div className="positiveReply greenText">
                  <Check />
                  <span className="greyText"><i><DateCalc time={match.menteechaser1} showPureDate /></i></span>

                </div>
              )
              : (
                <div className="greyText">-</div>
              )}
            </td>
            <td className="alignCenter">
              {match.menteechaser2 != '' ? (
                <div className="positiveReply greenText">
                  <Check />
                  <span className="greyText"><i><DateCalc time={match.menteechaser2} showPureDate /></i></span>
                </div>
              )
              : (
                <div className="greyText">-</div>
              )}
            </td>
            <td className="alignCenter">
              {(match.status_of_match == '3' || match.status_of_match > '4') ? (
                <div className="greenText">
                  <Check />
                </div>
              )
              : (match.status_of_match == '2') ? (
                <div className="greyText">
                  <span role="img" aria-label="clockEmoji">⏱️</span>
                </div>
              )
              : (
                <div className="redText">
                  <X />
                </div>
              )}
            </td>
            <td>
              {match.status_of_match == '4' ? (
                <React.Fragment>
                  <div className="redText">
                    <strong>{match.mentee_pass_comments}</strong>
                  </div>
                  <div className="redText">
                    {(match.role_relevance != '' && match.no_similar_interests != '' && match.skills_relevance != '' && match.other != '') && (
                      <span>
                        They told us: {match.role_relevance != '' ? ' Role not relevant,' : ''}{match.no_similar_interests != '' ? ' Mentor had no similar interests,' : ''}{match.skills_relevance != '' ? ' Mentor had no relevant skills,' : ''}
                      </span>
                    )}
                     - <i><DateCalc time={match.mentee_replied_date} showPureDate /></i>
                  </div>
                </React.Fragment>
              )
              : (match.status_of_match == '2') ? (
                <div className="greyText"><i>Timed out - <DateCalc time={match.mentee_to_reply_by} showPureDate /></i></div>
              )
              : (
                <div className="greyText">-</div>
              )}
            </td>
            <td className="alignCenter">
              {match.mentorchaser1 != '' ? (
                <div className="positiveReply greenText">
                  <Check />
                  <span className="greyText"><i><DateCalc time={match.mentorchaser1} showPureDate /></i></span>
                </div>
              )
              : (
                <div className="greyText">-</div>
              )}
            </td>
            <td className="alignCenter">
              {match.mentorchaser2 != '' ? (
                <div className="positiveReply greenText">
                  <Check />
                  <span className="greyText"><i><DateCalc time={match.mentorchaser2} showPureDate /></i></span>
                </div>
              )
              : (
                <div className="greyText">-</div>
              )}
            </td>
            <td className="alignCenter">
              {match.status_of_match == '6' ? (
                <div className="greenText">
                  <Check />
                </div>
              )
              : (match.status_of_match == '5') ? (
                <div className="greyText">
                  <span role="img" aria-label="clockEmoji">⏱️</span>
                </div>
              )
              : (match.status_of_match == '7') ? (
                <div className="redText">
                  <X />
                </div>
              )
              : (
                <div className="greyText">-</div>
              )}
            </td>
            <td>
              {match.status_of_match == '7' ? (
                <React.Fragment>
                  <div className="redText">
                    <strong>{match.mentor_pass_comments}</strong>
                  </div>
                  <div className="redText">
                    {(match.role_relevance != '' && match.no_similar_interests != '' && match.skills_relevance != '' && match.busy != '' && match.other != '') && (
                      <span>
                        They told us: {match.role_relevance != '' ? 'Role not relevant, ' : ''}{match.no_similar_interests != '' ? 'Mentee had no similar interests, ' : ''}{match.skills_relevance != '' ? ' Mentee had no relevant skills, ' : ''}{match.busy != '' ? 'I\'m too busy right now ' : ''}
                      </span>
                    )}
                    - <i><DateCalc time={match.mentor_replied_date} showPureDate /></i>
                  </div>
                </React.Fragment>
              )
              : (match.status_of_match == '5') ? (
                <div className="greyText"><i>Timed out - <DateCalc time={match.mentor_reply_by} showPureDate /></i></div>
              )
              : (
                <div className="greyText">-</div>
              )}
            </td>
          </tr>
        </tbody>
      </React.Fragment>
    )
  }
}

export default NullMatch;
