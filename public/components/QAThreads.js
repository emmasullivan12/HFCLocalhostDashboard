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
    const {comments, originalPostAuthorID} = this.props

    let commentsSorted = comments && comments.sort((a, b) => {
      return new Date(b.lastupdated) - new Date(a.lastupdated);
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
          <div className="marginTop20 marginBottom20 qActionsContainer">
            {commentsSorted.map((comment, i) => {
              let isOriginalPostAuthor

              isOriginalPostAuthor = originalPostAuthorID == comment.uid

              // Only show first 5 comments
              if (i < 5) {
                return (
                  <div key={comment.cid} id={comment.cid} className="gridContainer borderBtm borderGrey paddingBtm marginBottom20">
                    <div className="gridLeftColumn paddingR20">
                      <div className="displayFlex flexDirColumn alignCenter">
                        <div className={"fontSize28 marginBottom5 " + (this.state[comment.cid+"-userUpvoted"] == true ? "electricPurpleText" : "darkGreyText")}>
                          <button type="button" className={"button-unstyled " + (this.state[comment.cid+"-userUpvoted"] == true ? "opacity1" : "")} onClick={() => this.toggleUpvote(comment.cid)}>
                            <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36">
                              <path d="M2 25h32L18 9 2 25Z"/>
                            </svg>
                          </button>
                        </div>
                        {this.state[comment.cid+'-votes']}
                      </div>
                    </div>
                    <div className="gridRightColumn">
                      <div className="qDetailContainer marginBottom20">
                        <TextParser text={comment.text} />
                      </div>
                      <div className="marginTop20 marginBottom20 qActionsContainer">
                        <div className="credentialSuperContainer">
                          <div className="credentialPreviewContainer">
                            <div className="gridContainer marginTop10">
                              <div className="gridRightColumn textLeft whiteSpace fontSize12">
                                <span> - </span>
                                {comment.authorinsttype != 'sch' && (
                                  <div className={isOriginalPostAuthor == true ? "multiple value paddingR" : ""}>
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
                                  </div>
                                )}
                                {(comment.authorinsttype == 'sch') && (
                                  <div>
                                    <strong>{comment.fname}</strong>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="textLeft greyText fontSize12"> <DateCalc time={comment.datecreated} showPureDate /> at <TimeCalc time={comment.datecreated} /></div>
                            <div className="displayFlex greyText fontSize12 qActionsBox marginRight paddingBtm20">
                              /* {aIsMe == 'isMe' && (
                                <Modal {...DeleteContentModalProps}>
                                  <DeleteContentModalContent />
                                </Modal>
                              )} */
                              Delete
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
            <div className="displayFlex greyText fontSize12 qActionsBox marginRight paddingBtm20"> */}
              <Modal {...AddCommentModalProps}>
                <AddCommentModalContent />
              </Modal>
              <span> &#124;	</span>
              {comments.length > 5 && (
                <div>Show {(comments.length - 5)} more {((comments.length - 5) > 1) ? 'comments' : 'comment'}</div>
              )}
            </div>

          </div>
        )}
      </React.Fragment>
    );
  }
}

export default QAThreads;
