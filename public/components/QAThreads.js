// Dex last merged this code on 11th apr 2023

import React, { Component } from "react";

import AddCommentModalContent from './AddCommentModalContent.js';
import DeleteContentModalContent from './DeleteContentModalContent.js';
import FlagCommentModalContent from './FlagCommentModalContent.js';
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
  changeInitFocus: true,
  wider: true
}

const DeleteContentModalProps = {
  ariaLabel: 'Confirm content deletion',
  triggerText: 'Delete',
  usedFor: 'deleteQ',
  changeInitFocus: true,
}

const FlagCommentModalProps = {
  ariaLabel: 'Flag comment',
  triggerText: 'Flag comment',
  usedFor: 'flagComment',
//  hideTrigger: true,
}

class QAThreads extends Component {
  constructor () {
    super();
    this.state = {
      isLoading: false,
      showMoreComments: false,
      arrToShow: [],
      moreCommentsArr: [],
    //  showFlagCommentModal: false
    }
  }

  componentDidMount() {
    const {comments} = this.props

    comments.map((comment) => {
      return this.countVotes(comment.cid, comment.upvotes)
    });

    this.setCommentsArr(comments)
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.showMoreComments != prevState.showMoreComments && this.state.showMoreComments == true){
      this.setCommentsArr(this.props.comments);
    }
  }

  closeModal = (modalType) => {
    this.setState({
      ["show"+modalType+"Modal"]: false,
    });
  }

  setCommentsArr = (comments) => {
    const {isInModal, type} = this.props

    let first5CommentsArr, moreCommentsArr, arrToShow

    let commentsSorted = comments && comments.sort((a, b) => {
      return new Date(a.datecreated) - new Date(b.datecreated);
    });

    if (type == 'g' && isInModal) {
      arrToShow = commentsSorted
    } else {
      first5CommentsArr = commentsSorted.splice(0,Math.min(5,commentsSorted.length))
      moreCommentsArr = commentsSorted.splice(0,5)

      const showMoreComments = this.state.showMoreComments

      arrToShow = (type == 'g' && isInModal) ? commentsSorted : (showMoreComments == true ? first5CommentsArr.concat(moreCommentsArr) : first5CommentsArr);
    }

    this.setState({
      arrToShow: arrToShow,
      moreCommentsArr: moreCommentsArr
    })

  }

/*  showFlagCommentModal = (cid) => {
    this.setState({
      showFlagCommentModal: true,
      commentIDToFlag: cid
    })
  } */

  handleToggle = (postId, requireLogin, allowedPermissions) => {
    const {checkHasAccess, noAccessHandler} = this.props

    // If there is an access requirement
    if (checkHasAccess) {
      checkHasAccess(requireLogin, allowedPermissions ? allowedPermissions : null, (hasAccess) => {
        if (hasAccess == false) {
        //  e.preventDefault();
          return noAccessHandler ? noAccessHandler(null, "comment-upvote") : null
        } else {
          return this.toggleUpvote(postId)
        }
      })

    // There was na ccess requirement
    } else {
      this.toggleUpvote(postId)
    }
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

  showMoreComments = () => {
    this.setState({
      showMoreComments: true
    })
  }

  displayComment = (comment) => {
    const {originalPostAuthorID, originalPostIsAnon, type, isInModal, maxViewsReached, checkHasAccess, noAccessHandler} = this.props
  //  const {showFlagCommentModal, commentIDToFlag} = this.state
    let isOriginalPostAuthor, aIsMe
    const myID = '123'
    const isPrUser = false

    isOriginalPostAuthor = originalPostAuthorID == comment.uid
    aIsMe = comment.uid == myID

    return (
      <li key={comment.cid} id={comment.cid} className={type != 'g' ? "gridContainer borderBtm borderGrey" : "gridContainer"}>
        <div className="commentActions">
          <div className={"commentScore" + (maxViewsReached == true ? " blurryText" : "")}>
            {this.state[comment.cid+'-votes'] == 0 ? "" : this.state[comment.cid+'-votes']}
          </div>
          {(aIsMe == false || isPrUser == true) && (
            <React.Fragment>
              <div className={"commentVoting fontSize28 " + (this.state[comment.cid+"-userUpvoted"] == true ? "electricPurpleText" : "lightGreyText")}>
                <button type="button" className={"button-unstyled " + (this.state[comment.cid+"-userUpvoted"] == true ? "opacity1" : "")} aria-label="Upvote comment" title="Upvote this comment" onClick={() => this.handleToggle(comment.cid, true)}>
                  <svg aria-hidden="true" width="26" height="26" viewBox="0 0 26 26">
                    <path d="M1 12h16L9 4l-8 8Z"/>
                  </svg>
                </button>
              </div>
              <div className="commentFlagging fontSize28 lightGreyText">
                <Modal {...FlagCommentModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler}>
                  <FlagCommentModalContent cid={comment.cid}/>
                </Modal>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className={"commentText fontSize14" + (aIsMe == true ? " marginLeft20" : "")} >
    {/*      {(isOnFeed == true || (type == 'g' && isInModal)) && (
            <span className="paddingR5">
              {comment.u18 != true && (isOriginalPostAuthor != true || (isOriginalPostAuthor == true && originalPostIsAnon != true)) && (
                <span className={isOriginalPostAuthor == true ? "onFeedOriginalAuthor fontSize14 multiple value paddingR grey fontSize12 paddingTop0 paddingBtm0 marginRight0" : ""}>
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
                <span className={isOriginalPostAuthor == true ? "onFeedOriginalAuthor fontSize14 multiple value paddingR grey fontSize12 paddingTop0 paddingBtm0 marginRight0" : ""}>
                  <strong>{(originalPostIsAnon == true && isOriginalPostAuthor == true) ? "Anonymous" : comment.fname}</strong>
                </span>
              )}
            </span>
          )} */}
          <span className={maxViewsReached == true ? "blurryText" : ""} >
            <TextParser text={comment.text} showInline />
          </span>
          <span className="fontSize12 paddingL2">
            <span> &#8212; </span>
            {comment.u18 != true && (isOriginalPostAuthor != true || (isOriginalPostAuthor == true && originalPostIsAnon != true)) && (
              <span className={isOriginalPostAuthor == true ? "multiple value paddingR grey fontSize12 paddingTop0 paddingBtm0 marginRight0 marginBottomMinus5" : ""}>
                {comment.userroleofauthor == 'mentee' ? (
                    <FullPageModal {...MenteeProfileUsrNameModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler} triggerText={comment.fname + " " + comment.lname}>
                      <MenteeProfileContent />
                    </FullPageModal>
                    )
                  : (
                    <FullPageModal {...MentorProfileUsrNameModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler} triggerText={comment.fname + " " + comment.lname}>
                      <MentorProfileContent />
                    </FullPageModal>
                  )
                }
              </span>
            )}
            {((originalPostIsAnon == true && isOriginalPostAuthor == true) || comment.u18 == true) && (
              <span className={isOriginalPostAuthor == true ? "multiple value paddingR grey fontSize12 paddingTop0 paddingBtm0 marginRight0 marginBottomMinus5" : ""}>
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
      {/*  {showFlagCommentModal == true && (
          <Modal {...FlagCommentModalProps} handleLocalStateOnClose={() => this.closeModal("FlagComment")}>
            <FlagCommentModalContent cid={commentIDToFlag}/>
          </Modal>
        )} */}
      </li>
    )
  }

  render() {
    const {isLoading, showMoreComments, arrToShow, moreCommentsArr} = this.state
    const {comments, type, originalPostID, originalPostIsAnon, originalPostAuthorID, checkHasAccess, noAccessHandler} = this.props

    let isThisUserOriginalPostAuthor
    const myID = '1234'

    isThisUserOriginalPostAuthor = originalPostAuthorID == myID

    /*comments: [
      {cid: '6', u18: 0, text: 'comment 6', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', Uid: '', datecreated: '234345345', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''}
    ], */

    return (
      <React.Fragment>
        {isLoading == true ? (
          <div className="padding25 marginTop20">
            <LoadingSpinner />
          </div>
        ) : (
          <ul className={"marginTop20 marginBottom20 noBulletList" + (arrToShow.length == 0 ? " noPaddingL" : (type != 'g' ? " borderTop borderGrey" : "")) + ((type == 'a' || type == 'g') ? " noPaddingL" : "")}>
            {arrToShow && arrToShow.map((comment) => {
              return this.displayComment(comment)
            })}
            {type != 'g' && (
              <div className="purpleText fontSize12 paddingBtm20 marginTop5 displayInlineFlex">
                <Modal {...AddCommentModalProps} checkHasAccess={checkHasAccess} requireLogin noAccessHandler={noAccessHandler}>
                  <AddCommentModalContent
                    type={type} //i.e. general/answer/question
                    qid={type == 'q' ? originalPostID : null}
                    hid={type == 'q' ? null : originalPostID}
                    showAsAnon={originalPostIsAnon == true && isThisUserOriginalPostAuthor == true}
                    userID={myID}
                    modalID="modal-addComment"
                  />
                </Modal>
                {(moreCommentsArr.length > 0 && showMoreComments != true) && (
                  <span className="fontSize12">
                    <span className="marginLeft5 marginRight5 fontSize15"> &#124;	</span>
                      <button type="button" aria-label="Show more comments" className="button-unstyled purpleText opacity1" onClick={this.showMoreComments}>
                        Show {(moreCommentsArr.length)} more {((moreCommentsArr.length) > 1) ? 'comments' : 'comment'}
                      </button>
                  </span>
                )}
              </div>
            )}
          </ul>
        )}
      </React.Fragment>
    );
  }
}

export default QAThreads;
