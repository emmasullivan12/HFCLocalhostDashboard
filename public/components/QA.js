// Dex last merged this code on 10th August 2019

import React, { Component } from "react";

import AddHighlightModalContent from "./AddHighlightModalContent";
import Avatar from './Avatar.js';
import {Check, ChevronUp, DateCalc, TimeCalc} from './GeneralFunctions.js';
import DeleteContentModalContent from './DeleteContentModalContent.js';
import DisplayMsgFile from './DisplayMsgFile.js';
import Modal from './Modal';
import {getIndustryDeets, convertHashtags, getCredText, timeSince} from './UserDetail.js';

import "../css/QA.css";

const AddHighlightModalProps = {
  ariaLabel: 'Ask a Question',
  triggerText: 'Ask Question',
  usedFor: 'addHighlightQApage',
  changeInitFocus: true,
  wider: true
}
const AddAnswerModalProps = {
  ariaLabel: 'Add Answer',
  triggerText: 'Add Answer',
  usedFor: 'addAnswerQApage',
  changeInitFocus: true,
  wider: true
}

const DeleteContentModalProps = {
  ariaLabel: 'Confirm content deletion',
  triggerText: 'Delete',
  usedFor: 'deleteQ',
}

class QA extends Component {
  constructor () {
    super();
    this.state = {
      //votes: this.props.qaItem.votes,
      //votes: 10,
    }
  }

  componentDidMount() {
    const qaItem = {
      qid: '123456',
      uid: '123',
      datecreated: '2020-09-04T13:30:50.667Z',
      lastupdated: '2022-02-02T13:30:50.667Z',
      title: 'What is the best thing to wear to an interview?',
      textdetail: 'I know we have to be professional, but would like to stand out if possible. Is that possible? What do you think? I need to get some good advice on this and hope I\'ve provided enough context to get a good answer',
      //hids: [], // no answers yet
      hids: ['1234','1235'],
      industriesToPostTo: ['2','19'],
      //industriesToPostTo: ['2','19','1','3','4','5','6','7','8','9','10'],
      hashtags: ['23','20','1','2','0',],
      hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
      isanon: 0,
      authorinst: '',
      authorinstfreetext: 'Really Long Institution Name',
      authorrole: '',
    //  authorroleishidden: 0,
      authordegree: 'BSc (Hons) Business Administration',
      authortraining: '',
      authorinsttype: 'uni',
      authorstate: 'Bedf',
      authorcountry: 'GBR',
      votes: ['123','234','345','456'],
    //  reactions jsonb
    /*  seen: [
          mentors: [
            {uid: uid, ts: ts}
          ],
          mentees: [
            {uid: uid, ts: ts}
          ]
        ]*/
    //  followers jsonb
    //  deleted jsonb
    //  reported jsonb
    //  reportedstatus jsonb
    }
    const hidsArr = [
      {
        hid: '1234',
        uid: '123',
        fname: 'Emma',
        lname: 'Sullivan',
        authorinst: '',
        authorinstfreetext: 'Really Long Institution Name',
        authorrole: '',
      //  authorroleishidden: 0,
        authordegree: 'BSc (Hons) Business Administration',
        authortraining: '',
        authorinsttype: 'uni',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-05T19:30:50.667Z',
        text: 'first answer',
        isanon: 0,
        votes: ['12','23'],
        isacceptedanswer: false,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: 'google.com/answer/#firstanswer',
      },
      {
        hid: '1235',
        uid: '124',
        fname: 'Dave',
        lname: 'Petrie',
        authorinst: '',
        authorinstfreetext: '',
        authorrole: '',
      //  authorroleishidden: 0,
        authordegree: '',
        authortraining: '',
        authorinsttype: '',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-06T13:30:50.667Z',
        text: 'second answer',
        isanon: 1,
        votes: ['12','23'],
        isacceptedanswer: true,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: 'google.com/answer/#secondanswer',
      },
      {
        hid: '1236',
        uid: '125',
        fname: 'Dexter',
        lname: 'Boyce',
        authorinst: '',
        authorinstfreetext: 'Pladis',
        authorrole: 'Marketing Manager',
      //  authorroleishidden: 0,
        authordegree: '',
        authortraining: '',
        authorinsttype: 'job',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-07T13:30:50.667Z',
        text: 'third answer',
        isanon: 0,
        votes: ['123','20'],
        isacceptedanswer: false,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: 'google.com/answer/#thirdanswer',
      }
    ]
    this.countVotes(qaItem.qid, qaItem.votes)
    hidsArr.map((hid) => {
      this.countVotes(hid.hid, hid.votes)
    });
    /* this.setState({
      [qaItem.qid+"-userUpvoted"]: NEED TO DETECT IF USER HAS UPVOTED??
      [FOR EACH hid.hid+"-userUpvoted"]: NEED TO DETECT IF USER HAS UPVOTED??
    }) */
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

  countVotes = (hid, votes) => {
    const myID = '123'; //223456
    this.setState({
      [hid+'-votes']: votes.length,
      [hid+'-userUpvoted']: votes.includes(myID)
    })
  }

  render() {
    const qaItem = {
      qid: '123456',
      uid: '123',
      datecreated: '2020-09-04T13:30:50.667Z',
      lastupdated: '2022-02-02T13:30:50.667Z',
      title: 'What is the best thing to wear to an interview?',
      textdetail: 'I know we have to be professional, but would like to stand out if possible. Is that possible? What do you think? I need to get some good advice on this and hope I\'ve provided enough context to get a good answer',
      //hids: [], // no answers yet
      hids: ['1234','1235'],
      industriesToPostTo: ['2','19'],
      //industriesToPostTo: ['2','19','1','3','4','5','6','7','8','9','10'],
      hashtags: ['23','20','1','2','0',],
      hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
      isanon: 0,
      authorinst: '',
      authorinstfreetext: 'Villiers High School',
      authorrole: '',
    //  authorroleishidden: 0,
      authordegree: '',
      authortraining: '',
      authorinsttype: 'sch',
      authorstate: 'Bedf',
      authorcountry: 'GBR',
      votes: ['123','234','345','456'],
      urlText: "what-best-wear-to-interview"
    //  reactions jsonb
    /*  seen: [
          mentors: [
            {uid: uid, ts: ts}
          ],
          mentees: [
            {uid: uid, ts: ts}
          ]
        ]*/
    //  followers jsonb
    //  deleted jsonb
    //  reported jsonb
    //  reportedstatus jsonb
    }
    const qAuthor = {uid: '123', fname: 'Emma', lname: 'Sullivan'}
    const myID = '123'; //223456
    const userRole = 'mentor'
  /*  const user = {
      birthday: '2015-02-02T13:30:50.667Z'
    }
    var ts = new Date(user.birthday);
    var today = new Date();
    const age = today.getFullYear() - ts.getFullYear()
    const isU18 = age < 18;*/
    const qIsMe = (qaItem.uid === myID) ? 'isMe' : 'isntMe';
    const hidsArr = [
      {
        hid: '1234',
        uid: '123',
        fname: 'Emma',
        lname: 'Sullivan',
        authorinst: '',
        authorinstfreetext: 'Really Long Institution Name',
        authorrole: '',
      //  authorroleishidden: 0,
        authordegree: 'BSc (Hons) Business Administration',
        authortraining: '',
        authorinsttype: 'uni',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-05T19:30:50.667Z',
        text: 'first answer',
        isanon: 0,
        votes: ['12','23'],
        isacceptedanswer:  true,
        hashtags: ['23','20'],
        hashtagsfreetext: ['my free text hashtag',],
        url: 'google.com/answer/#firstanswer',
        files: [
          {fileid: '123', name: 'My image', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
          {fileid: '124', name: 'My PDF', type: 'application/pdf'},
          {fileid: '125', name: 'MyExcelspreadsheet.xls', type: 'application/vnd.ms-excel'},
          {fileid: '126', name: 'MyWorddocfilename.word', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
          {fileid: '127', name: 'MyPOWERPOINTBABY!', type: 'application/vnd-mspowerpoint'},
          {fileid: '128', name: 'My other doc format', type: 'other'}
        ]
      },
      {
        hid: '1235',
        uid: '124',
        fname: 'Dave',
        lname: 'Petrie',
        authorinst: '',
        authorinstfreetext: '',
        authorrole: '',
      //  authorroleishidden: 0,
        authordegree: '',
        authortraining: '',
        authorinsttype: '',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-06T13:30:50.667Z',
        text: 'second answer',
        isanon: 1,
        votes: ['12','23'],
        isacceptedanswer: false,
        hashtags: [],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: 'google.com/answer/#secondanswer',
      },
      {
        hid: '1236',
        uid: '125',
        fname: 'Dexter',
        lname: 'Boyce',
        authorinst: '',
        authorinstfreetext: 'Pladis',
        authorrole: 'Marketing Manager',
      //  authorroleishidden: 0,
        authordegree: '',
        authortraining: '',
        authorinsttype: 'job',
        authorstate: 'Bedf',
        authorcountry: 'GBR',
        datecreated: '2020-09-04T13:30:50.667Z',
        lastupdated: '2020-09-07T13:30:50.667Z',
        text: 'third answer',
        isanon: 0,
        votes: ['12','23'],
        isacceptedanswer: false,
        hashtags: ['123','20','2'],
        hashtagsfreetext: [],
        url: 'google.com/answer/#thirdanswer',
      }
    ]
    const acceptedAnswer = hidsArr.length > 0 && hidsArr.filter(hid => hid.isacceptedanswer == true)
    const suggestedAnswers = hidsArr.length > 0 && hidsArr.filter(hid => hid.isacceptedanswer != true)
    const suggestedAnswersStructured = suggestedAnswers && suggestedAnswers.map(hid => {
      const answer = {
        "@type": "Answer",
      }

      answer.text = hid.text
      answer.upvoteCount = hid.votes.length
      if (hid.url != '') {
        answer.url = "https://app.prospela.com/questions/" + hid.url
      }

      /*  "author": {
          "@type": "Person",
          "name": "New Baking User"
        },*/

      return answer
    })
    const qaStructuredData = {
      "@context": "https://schema.org",
      "@type": "QAPage",
      "url": "https://app.prospela.com/questions/" + qaItem.qid + "/" + qaItem.urlText,
      "mainEntity": {
        "@type": "Question",
        "name": qaItem.title,
        "text": qaItem.textdetail,
        "answerCount": qaItem.hids.length,
        "upvoteCount": qaItem.votes.length,
      /*  "author": {
          "@type": "Person",
          "name": "New Baking User"
        }, */
        ...(acceptedAnswer.length > 0 && {
          "acceptedAnswer": {
            "@type": "Answer",
            "text": acceptedAnswer[0].text,
          /*  "author": {
              "@type": "Person",
              "name": "New Baking User"
            },*/
            "upvoteCount": acceptedAnswer[0].votes.length,
            ...(acceptedAnswer[0].url != '' && {
              "url": "https://app.prospela.com/questions/" + acceptedAnswer[0].url, // This is not required, but strongly recommended
            })
          },
        }),
        ...(suggestedAnswers.length > 0 && {
          "suggestedAnswer": suggestedAnswersStructured
        })
      }
    }
    const credentialText = getCredText(qaItem.authorinsttype, qaItem.authorrole, qaItem.authorroleishidden, qaItem.authorinst, qaItem.authorinstfreetext, qaItem.authortraining, qaItem.authordegree, qaItem.authorstate, qaItem.authorcountry)
    let activeDatesArr = []

    activeDatesArr.push(qaItem.lastupdated)

   let suggestedAnswersSorted = suggestedAnswers.sort((a, b) => {
     return b.votes.length - a.votes.length || new Date(b.lastupdated) - new Date(a.lastupdated);
   });
   let hidsArrSorted = [
     ...acceptedAnswer,
     ...suggestedAnswersSorted
   ]
    hidsArrSorted.map((hid) => {
      activeDatesArr.push(hid.lastupdated)
    });
    const mostRecentActivityDate = activeDatesArr.sort().slice(-1)
    const indArrToShow = qaItem.industriesToPostTo.length <= 2 ? qaItem.industriesToPostTo : qaItem.industriesToPostTo.slice(0,2)
    const hashtagsCommaString = (qaItem.hashtags.length > 0 || qaItem.hashtagsfreetext.length > 0) ? convertHashtags(qaItem.hashtags, qaItem.hashtagsfreetext) : []
    const hashtagsArray = hashtagsCommaString.length == 0 ? [] : hashtagsCommaString.split(', ')
    let aIsMe
    let aCredentialText

    return (
      <React.Fragment>
        <script type="application/ld+json">
          {JSON.stringify(qaStructuredData)}
        </script>
        <div className="padding25 marginTop20">
          <div className="borderBtm borderGrey paddingBtm marginBottom20">
            <div className="chatItemFlexContainer">
              <span className="qTitle qaPage marginBottom20 breakWord"><strong>{qaItem.title}</strong></span>
              <span className="absolute right20">
                {userRole == 'mentee' && (
                  <Modal {...AddHighlightModalProps}>
                    <AddHighlightModalContent modalID="modal-addHighlightQApage" userRole='mentee'/>
                  </Modal>
                )}
                {userRole == 'mentor' && (
                  <Modal {...AddAnswerModalProps}>
                    <AddHighlightModalContent modalID="modal-addAnswerQApage" userRole='mentor'/>
                  </Modal>
                )}
              </span>
            </div>
            <div className="darkGreyText fontSize13">
              <div>
                Asked {timeSince(qaItem.datecreated)} in <span className="bubbleContainer">
                  {indArrToShow.map((indID) => {
                    let industryItem = getIndustryDeets(indID)
                    let icon = industryItem.fa
                    let indName = industryItem.label
                    return <div className="bubble noBackground" key={indID}><i className={icon} /> {indName}</div>
                  })}
                </span>{qaItem.industriesToPostTo.length > 2 ? 'and other groups' : ''}
              </div>
              <div>Active {timeSince(mostRecentActivityDate)}</div>
            </div>
          </div>
          <div className="mainBar" role="main" aria-label="question and answers">
            <div className="gridContainer">
              <div className="gridLeftColumn paddingR20">
                <div className="displayFlex flexDirColumn alignCenter">
                {/*}  <ChevronUp /> */}
                  <div className={"fontSize28 marginBottom5 " + (this.state[qaItem.qid+"-userUpvoted"] == true ? "electricPurpleText" : "darkGreyText")}>
                    <button type="button" className={"button-unstyled " + (this.state[qaItem.qid+"-userUpvoted"] == true ? "opacity1" : "")} onClick={() => this.toggleUpvote(qaItem.qid)}>
                      <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36">
                        <path d="M2 25h32L18 9 2 25Z"/>
                      </svg>
                    </button>
                  </div>
                  {this.state[qaItem.qid+"-votes"]}
                </div>
              </div>
              <div className="gridRightColumn">
                <div className="qDetailContainer marginBottom20">
                  {qaItem.textdetail}
                </div>
                {hashtagsArray.length > 0 && (
                  <div className="tagsList">
                    {hashtagsArray.map((hashtag) => {
                      return (
                        <span
                          key={hashtag}
                          className="multiple value paddingR"
                          id={hashtag}
                        >
                          {hashtag}
                        </span>
                      )
                    })}
                  </div>
                )}
                <div className="marginTop20 marginBottom20 qActionsContainer">
                  <div className="displayFlex greyText fontSize12 qActionsBox marginRight paddingBtm20">
                  {/*  <div className="marginRight8">Share</div>
                    <div className="marginRight8">Follow</div> */}
                    {qIsMe == 'isMe' && (
                      <Modal {...DeleteContentModalProps}>
                        <DeleteContentModalContent />
                      </Modal>
                    )}
                  {/*  <div className="marginLeft8">Report</div> */}
                  </div>
                  <div className="credentialSuperContainer">
                    <div className="credentialPreviewContainer">
                      <div className="textLeft greyText fontSize12">asked <DateCalc time={qaItem.datecreated} showPureDate /> at <TimeCalc time={qaItem.datecreated} /></div>
                      <div className="gridContainer marginTop10">
                        <div className="gridLeftColumn dispInlineBlock verticalAlignMiddle">
                          <Avatar userID={qaItem.uid} isAnon={qaItem.isanon} userName={qaItem.isanon ? 'Anonymous' : qAuthor.fname} showAsCircle picSize={360}/>
                        </div>
                        <div className="gridRightColumn textLeft whiteSpace fontSize12">
                          <div>
                            <strong>{qaItem.isanon ? "" : (qAuthor.fname + " " + qAuthor.lname)}</strong>
                          </div>
                          <div className="darkGreyText">{credentialText}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div>
              {qaItem.hids.length == 0 ? (
                <div className="qTitle qaPage marginBottom20 breakWord"><strong>Know someone who can answer?</strong> Share a link to this question via email or Twitter.</div>
              ) : (
                <div className="qTitle qaPage marginBottom20 breakWord"><strong>{qaItem.hids.length} Answers</strong></div>
              )}
            </div>
            {hidsArrSorted.map((hid) => {
              const aHashtagsCommaString = (hid.hashtags.length > 0 || hid.hashtagsfreetext.length > 0) ? convertHashtags(hid.hashtags, hid.hashtagsfreetext) : []
              const aHashtagsArray = aHashtagsCommaString.length == 0 ? [] : aHashtagsCommaString.split(', ')

              aIsMe = (hid.uid === myID) ? 'isMe' : 'isntMe';
              aCredentialText = getCredText(hid.authorinsttype, hid.authorrole, hid.authorroleishidden, hid.authorinst, hid.authorinstfreetext, hid.authortraining, hid.authordegree, hid.authorstate, hid.authorcountry)

              return (
                <div key={hid.hid} className="gridContainer borderBtm borderGrey paddingBtm marginBottom20">
                  <div className="gridLeftColumn paddingR20">
                    <div className="displayFlex flexDirColumn alignCenter">
                      <div className={"fontSize28 marginBottom5 " + (this.state[hid.hid+"-userUpvoted"] == true ? "electricPurpleText" : "darkGreyText")}>
                        <button type="button" className={"button-unstyled " + (this.state[hid.hid+"-userUpvoted"] == true ? "opacity1" : "")} onClick={() => this.toggleUpvote(hid.hid)}>
                          <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36">
                            <path d="M2 25h32L18 9 2 25Z"/>
                          </svg>
                        </button>
                      </div>
                      {this.state[hid.hid+'-votes']}
                      {hid.isacceptedanswer == true && (
                        <div className="greenText marginTop10 fontSize25 tooltip">
                          <Check />
                          <span className="tooltiptext acceptedAnswer">
                            Accepted answer
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="gridRightColumn">
                    <div className="qDetailContainer marginBottom20">
                      {hid.text}
                    </div>
                    {hid.files && hid.files.length > 0 && (
                      <div className="answerFilesContainer marginBottom20">
                        {hid.files.map((file, index) => {
                          return (
                            <div className="extra-content-container" key={file.fileid}>
                              <DisplayMsgFile
                                file={file}
                                isQA
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                    {aHashtagsArray.length > 0 && (
                      <div className="tagsList">
                        {aHashtagsArray.map((hashtag) => {
                          return (
                            <span
                              key={hashtag}
                              className="multiple value paddingR"
                              id={hashtag}
                            >
                              {hashtag}
                            </span>
                          )
                        })}
                      </div>
                    )}
                    <div className="marginTop20 marginBottom20 qActionsContainer">
                      <div className="displayFlex greyText fontSize12 qActionsBox marginRight paddingBtm20">
                      {/*  <div className="marginRight8">Share</div>
                        <div className="marginRight8">Follow</div> */}
                        {aIsMe == 'isMe' && (
                          <Modal {...DeleteContentModalProps}>
                            <DeleteContentModalContent />
                          </Modal>
                        )}
                      {/*  <div className="marginLeft8">Report</div> */}
                      </div>
                      <div className="credentialSuperContainer">
                        <div className="credentialPreviewContainer">
                          <div className="textLeft greyText fontSize12">answered <DateCalc time={hid.datecreated} showPureDate /> at <TimeCalc time={hid.datecreated} /></div>
                          <div className="gridContainer marginTop10">
                            <div className="gridLeftColumn dispInlineBlock verticalAlignMiddle">
                              <Avatar userID={hid.uid} isAnon={hid.isanon} userName={hid.isanon ? 'Anonymous' : hid.fname} showAsCircle picSize={360}/>
                            </div>
                            <div className="gridRightColumn textLeft whiteSpace fontSize12">
                              <div>
                                <strong>{hid.isanon ? "" : (hid.fname + " " + hid.lname)}</strong>
                              </div>
                              <div className="darkGreyText">{aCredentialText}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              )
            })}
            <div className="marginBottom50 marginTop20">
              {userRole == 'mentee' && (
                <div>
                  <div className="qTitle marginBottom5"><strong>Not the answer you were looking for?</strong> Ask your own question</div>
                  <Modal {...AddHighlightModalProps}>
                    <AddHighlightModalContent modalID="modal-addHighlightQApage" userRole='mentee'/>
                  </Modal>
                </div>
              )}
              {userRole == 'mentor' && (
                <div>
                  <div className="qTitle marginBottom5"><strong>Got something to add?</strong> The Prospela community would love to hear it!</div>
                  <Modal {...AddAnswerModalProps}>
                    <AddHighlightModalContent modalID="modal-addAnswerQApage" userRole='mentor'/>
                  </Modal>
                </div>
              )}
            </div>
          </div>
          {/*}<div className="sideBar" role="complementary" aria-label="sidebar">
            SIDEBAR PLACEHOLDER
          </div>*/}
        </div>
      </React.Fragment>
    );
  }
}

export default QA;
