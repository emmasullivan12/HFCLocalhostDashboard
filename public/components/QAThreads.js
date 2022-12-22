// Dex last merged this code on 14th dec 022

import React, { Component } from "react";

import AddCommentModalContent from './AddCommentModalContent.js';
import DeleteContentModalContent from './DeleteContentModalContent.js';
import FullPageModal from './FullPageModal.js';
import MenteeProfileContent from './MenteeProfileContent.js';
import MentorProfileContent from './MentorProfileContent.js';
import Modal from './Modal';
import TextParser from './TextParser.js';
import {LoadingSpinner, DateCalc, TimeCalc} from './GeneralFunctions.js';

const MenteeProfileUsrNameModalProps = {
  ariaLabel: 'View Mentee Profile',
  usedFor: 'mentee-profile-qaItem',
  backBtn: 'arrow'
}

const MentorProfileUsrNameModalProps = {
  ariaLabel: 'View Mentor Profile',
  usedFor: 'mentor-profile-qaItem',
  backBtn: 'arrow'
}

const AddCommentModalProps = {
  ariaLabel: 'Add a comment',
  triggerText: 'Add a comment',
  usedFor: 'addComment',
}

const DeleteContentModalProps = {
  ariaLabel: 'Confirm content deletion',
  triggerText: 'Delete',
  usedFor: 'deleteQ',
}


class QAThreads extends Component {
  constructor () {
    super();
    this.state = {
      isLoading: false,
    }
  }

  componentDidMount() {
    const {comments} = this.props

    comments.map((comment) => {
      return this.countVotes(comment.cid, comment.upvotes)
    });
  }

  toggleUpvote = (postId) => {
    const currentState = this.state[postId+"-userUpvoted"];

    this.setState(prevState => {
      let newVotes, newIsUpvoted
      if (currentState == false || currentState == undefined) {
        newVotes = prevState[postId+'-votes'] + 1
        newIsUpvoted = true
      } else {
        newVotes = prevState[postId+'-votes'] - 1
        newIsUpvoted = false
      }

      return {
        [postId+"-userUpvoted"]: newIsUpvoted,
        [postId+'-votes']: newVotes
      }
    })
  }

  countVotes = (cid, votes) => {
    const myID = '123'; //223456
    this.setState({
      [cid+'-votes']: votes.length,
      [cid+'-userUpvoted']: votes.includes(myID)
    })
  }

  render() {
    const {isLoading} = this.state
    const {comments, originalPostAuthorID, isQ, originalPostIsAnon} = this.props
    const myID = '234'
    const isPrUser = false
    let isOriginalPostAuthor, aIsMe

    let commentsSorted = comments && comments.sort((a, b) => {
      return new Date(a.datecreated) - new Date(b.datecreated);
    });

    /*comments: [
      {cid: '6', text: 'comment 6', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', Uid: '', datecreated: '234345345', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''}
    ], */

    return (
      <React.Fragment>
        {isLoading == true ? (
          <div className="padding25 marginTop20">
            <LoadingSpinner />
          </div>
        ) : (
          <ul className={"marginTop20 marginBottom20 borderTop borderGrey noBulletList noPaddingL" + (isQ == true ? "marginLeft20" : "")}>
            {commentsSorted.map((comment, i) => {
              isOriginalPostAuthor = originalPostAuthorID == comment.uid
              aIsMe = comment.uid == myID

              // Only show first 5 comments
              if (i < 5) {
                return (
                  <li key={comment.cid} id={comment.cid} className="gridContainer borderBtm borderGrey">
                    <div className="commentActions">
                      <div className="commentScore">
                        {this.state[comment.cid+'-votes']}
                      </div>
                      {(aIsMe == false || isPrUser == true) && (
                        <div className={"commentVoting fontSize28 " + (this.state[comment.cid+"-userUpvoted"] == true ? "electricPurpleText" : "lightGreyText")}>
                          <button type="button" className={"button-unstyled " + (this.state[comment.cid+"-userUpvoted"] == true ? "opacity1" : "")} aria-label="Upvote comment" title="Upvote this comment" onClick={() => this.toggleUpvote(comment.cid)}>
                            <svg aria-hidden="true" width="26" height="26" viewBox="0 0 26 26">
                              <path d="M1 12h16L9 4l-8 8Z"/>
                            </svg>
                          </button>
                        </div>
                      )}
                      <div className="commentFlagging fontSize28 lightGreyText">
                        <button type="button" className="button-unstyled" aria-label="Flag comment" title="Flag this comment for serious problems or moderator attention">
                          <svg aria-hidden="true" width="26" height="26" viewBox="0 0 26 26">
                            <path d="M3 2v14h2v-6h3.6l.4 1h6V3H9.5L9 2H3Z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="commentText fontSize14">
                      <TextParser text={comment.text} showInline />
                      <span className="fontSize12 paddingL2">
                        <span> &#8212; </span>
                        {comment.u18 != true && (isOriginalPostAuthor != true || (isOriginalPostAuthor == true && originalPostIsAnon != true)) && (
                          <span className={isOriginalPostAuthor == true ? "multiple value paddingR grey fontSize12 paddingTop0 paddingBtm0 marginRight0" : ""}>
                            {comment.userroleofauthor == 'mentee' ? (
                                <FullPageModal {...MenteeProfileUsrNameModalProps} triggerText={comment.fname + " " + comment.lname}>
                                  <MenteeProfileContent />
                                </FullPageModal>
                                )
                              : (
                                <FullPageModal {...MentorProfileUsrNameModalProps} triggerText={comment.fname + " " + comment.lname}>
                                  <MentorProfileContent />
                                </FullPageModal>
                              )
                            }
                          </span>
                        )}
                        {((originalPostIsAnon == true && isOriginalPostAuthor == true) || comment.u18 == true) && (
                          <span className={isOriginalPostAuthor == true ? "multiple value paddingR grey fontSize12 paddingTop0 paddingBtm0 marginRight0" : ""}>
                            <strong>{(originalPostIsAnon == true && isOriginalPostAuthor == true) ? "Anonymous" : comment.fname}</strong>
                          </span>
                        )}
                        <span className="greyText fontSize12 paddingL2"> <DateCalc time={comment.datecreated} showPureDate /> at <TimeCalc time={comment.datecreated} /></span>
                      </span>
                      {(aIsMe == true || isPrUser == true) && (
                        <span className="greyText fontSize12 paddingL">
                          <Modal {...DeleteContentModalProps}>
                            <DeleteContentModalContent />
                          </Modal>
                        </span>
                      )}
                    </div>
                  </li>
                )
              }
            })}
            <div className="displayFlex greyText fontSize12 qActionsBox marginRight paddingBtm20">
              <Modal {...AddCommentModalProps}>
                <AddCommentModalContent />
              </Modal>
              <span> &#124;	</span>
              {comments.length > 5 && (
                <div>Show {(comments.length - 5)} more {((comments.length - 5) > 1) ? 'comments' : 'comment'}</div>
              )}
            </div>

          </ul>
        )}
      </React.Fragment>
    );
  }
}

export default QAThreads;
