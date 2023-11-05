// Last merged this code on 4th apr 2022

import React from "react";
import ReactDOM from "react-dom";

import {metaAdder} from './GeneralFunctions.js';
import AddHighlightModalContent from "./AddHighlightModalContent";
import CommunityOverview from "./CommunityOverview.js";
import CommunityQuestions from "./CommunityQuestions.js";
import CommunityLeaderboard from "./CommunityLeaderboard.js";
import MenuNav from './MenuNav.js';
import Modal from './Modal.js';
import MyContent from "./MyContent.js";
import ShareOptionsBox from './ShareOptionsBox.js';
import {getIndustryDeets, getSkillDeets} from './UserDetail.js';

import '../css/GroupDash.css';

//import {LoadingSpinner, Check} from "./GeneralFunctions";
const AddHighlightModalProps = {
  ariaLabel: 'Add a Post',
  triggerText: 'Post',
  usedFor: 'addHighlightQApage',
  changeInitFocus: true,
  wider: true
}

const AskQModalProps = {
  ariaLabel: 'Ask a Question',
  triggerText: 'Ask Question',
  usedFor: 'addHighlightQApage',
  changeInitFocus: true,
  wider: true
}

class CommunityPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabToView: this.props.initialTabToView ? this.props.initialTabToView : 'overview',
    }
  }

  componentDidMount() {
    const {updateDocumentTitle} = this.props

    const community = {
      cmid: '1234',
    /*  name: 'Houdini',
      type: 'skill',
      typeid: '425',*/
      name: 'Film, TV & VFX',
      type: 'industry',
      typeid: '19',
      experts: ['1','2','3','4'],
      members: ['1','2','3','4','1','2','3','4','1','2','3','4'],
      numUnanswered: 24
    }
    if(community != null){
      updateDocumentTitle(community.name + " community - Prospela.com")
    }
  }

  componentWillUnmount() {
    this.props.updateDocumentTitle("Prospela Dashboard")
  }

  updateTabToView = (e) => {
    let name
    e.persist()
    name = e.target.name ? e.target.name : e.currentTarget.name

    this.setState({
      tabToView: name
    })
  }

  scrollToView = (e) => {
    var el = e.target.name ? e.target : e.currentTarget

    el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  goToUnansweredQs = () => {
    this.setState({
      tabToView: 'questions'
    })
  }

  renderTab = (community) => {
    const {userRole, isLoggedIn, updatePathName} = this.props;
    const {tabToView, goToUnansweredTab} = this.state;

    const contentArr = [ // Answers
      {
        qid: '123456',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: [], // no answers yet
        industriestopostto: ['99999','19','11','3','2'],
        hashtags: ['23'],
        hashtagsfreetext: ['my free text hashtag'],
        type: 'question',
        hasacceptedanswer: false,
        votes: ['123','234','345','456'],
        mentorseen: ['123','234','345','456'],
        menteeseen: ['123'],
        prseen: [],
        uid: '123',
        isanon: 0,
        isPr: 0,
        authorinsttype: 'sch',
        fname: 'Emma',
        lname: 'Sullivan',
        hidden: 1,
        profilepic: '',
        url: "/what-wear-to-interview"
      },
      {
        qid: '123457',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: ['1234','1235'], // 2 answers
        industriestopostto: ['2','19','10','99999'],
        hashtags: ['23','11','30','55','61'],
        hashtagsfreetext: ['my free text hashtag'],
        type: 'question',
        hasacceptedanswer: true,
        votes: [],
        mentorseen: ['123','234'],
        menteeseen: [],
        prseen: [],
        uid: '124',
        isanon: 0,
        isPr: 0,
        authorinsttype: 'uni',
        fname: 'Dexter',
        lname: 'Boyce',
        profilepic: '',
        url: "/what-wear-to-interview-2"
      },
      {
        qid: '123458',
        datecreated: '2020-09-04T13:30:50.667Z',
        title: 'What is the best thing to wear to an interview?',
        textdetail: 'I know we have to be professional, but would like to stand out if possible.',
        hids: ['1234','1235'], // 2 answers
        industriestopostto: ['2','19'],
        hashtags: ['23','11','30'],
        hashtagsfreetext: ['my free text hashtag'],
        type: 'question',
        hasacceptedanswer: false,
        votes: [],
        mentorseen: ['123','234','345','456'],
        menteeseen: [],
        prseen: [],
        uid: '124',
        isanon: 1,
        isPr: 0,
        authorinsttype: 'job',
        fname: 'John',
        lname: 'Smith',
        profilepic: '',
        url: "/what-wear-to-interview-3"
      },
      {
        hid: '1234',
        uid: '123',
        fname: 'Emma',
        lname: 'Sullivan',
        isPr: 0,
        title: 'What is the best thing to wear to an interview?',
        industriestopostto: ['99999','19'],
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
        text: '~This <b>is</b>~ ~This <b>is</b>~ _This <b>is</b>_ ** *bold* **bold* ***bold* ****bold* ~~ ~~~ ~~~~ ~yo~ ~~yo~ ~~~yo~ ~~~~yo~ my_profile my__profile my___profile my____profile _italics_ and ~*script* _emmas_ *message*~ \n- \n-></script> \n \nhttps://www.pr~ospel~a.com/myprofil_enumbe_r89__linesarebeforethis or https://www.prospela.com/myprofil_enumbe_r89__linsebefore https://prospela.com/my*profile* https://prospela.com/my~profile~yeah https://prospela.com/my~~profile~yeah',
        isanon: 0,
        votes: [],
        isacceptedanswer: false,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: '/what-wear-to-interview/#firstanswer',
        type: 'answer',
        relatedqid: '123',
        selectedFiles: [
          {fileid: '123', name: 'My image', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
          {fileid: '124', name: 'My PDF', type: 'application/pdf'},
          {fileid: '125', name: 'MyExcelspreadsheet.xls', type: 'application/vnd.ms-excel'},
          {fileid: '126', name: 'MyWorddocfilename.word', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
          {fileid: '127', name: 'MyPOWERPOINTBABY!', type: 'application/vnd-mspowerpoint'},
          {fileid: '128', name: 'My other doc format', type: 'other'}
        ],
      },
      {
        hid: '1235',
        uid: '124',
        fname: 'Dave',
        lname: 'Petrie',
        isPr: 0,
        title: 'What is it like working at Pladis?',
        industriestopostto: ['99999','19'],
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
        text: 'second answer sfgh sldfkj ghlskjdf hglkjsd fhgkjls dhflkjg hsdlfkj ghlksdjfh glkjsd fhgkljsdh fgkjlh sdlfkj ghlskdjf ghlkjsdfh gkljsdfh glkjsdfh gkljsdh fgkjlhds flkgjh sdlkfj ghslkdjf ghlksjdf glksjdfh glsjkdf gkljsdf hglkjsd fhglkjsdfh glksjdfh glskjdfh glkjsdfh glkjsdfh gkljsdfh glkjsdfh gkjlsd fhgkljsdh fklgjhs dflkjgh slkdfj ghskldjf ghslkdfjgh lskdjf ghlskdjfgh slkdjf ghlksdfjgh',
        isanon: 1,
        votes: ['12','23'],
        isacceptedanswer: true,
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        url: '/what-wear-to-interview/#secondanswer',
        type: 'answer',
        relatedqid: '124'
      },
      {
        hid: '1236',
        uid: '125',
        fname: 'Dexter',
        lname: 'Boyce',
        isPr: 0,
        title: 'When should I apply to grad schemes (what time of year)?',
        industriestopostto: ['99999','19'],
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
        url: '/what-wear-to-interview/#thirdanswer',
        type: 'answer',
        relatedqid: '125',
        selectedFiles: [
          {fileid: '123', name: 'My image', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
          {fileid: '123', name: 'My image 1', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
          {fileid: '123', name: 'My image 2', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
        ],
      },
      {
        hid: '1237',
        uid: '126',
        fname: 'Dexter',
        lname: 'Boyce',
        isPr: 0,
        industriestopostto: ['99999','19'],
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
        text: 'This is a general post about the news today. Wanted to talk about how the war in Ukraine is affecting VFX industry - there is so much inspiration for future content! SDFGKLJH SDLFJKH GSLKJDF GJK Hlkjh xdljfh gslkjdh fgkjls hdfglkj hsdfkljh gslkdfjglksjdh gjh skgsh kdhgksdfkldlfjhskfhgljdfhg jdfh gsjdhfkjshdgjhdfgkjshfglhsdflkghdfjh dkfjh g',
        isanon: 0,
        votes: ['123','20'],
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        type: 'general',
        wasDefaultRole: true,
        selectedFiles: [
          {fileid: '123', name: 'My image', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
          {fileid: '123', name: 'My image 1', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
          {fileid: '123', name: 'My image 2', type: 'image/png', imgurl: '/1600724559100-acddf6dd-8c00-4cf4-bd8f-d26513ffd827.png'},
        ],
        postComments: [
          {cid: '1', u18: 1, text: 'what happens when i chat a lot and it goes over into *another* line is it messy af? Id love to know!', userroleofauthor: 'mentor', fname: 'Emma', lname: 'Sullivan', uid: '234', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['123','12345','23435'], relatedqid: '', relatedhid: ''},
          {cid: '2', u18: 0, text: 'heres my thoughts on that blah blue bler blum', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', uid: '126', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''},
          {cid: '3', u18: 1, text: 'what happens when i chat a lot and it goes over into *another* line is it messy af? Id love to know!', userroleofauthor: 'mentor', fname: 'Emma', lname: 'Sullivan', uid: '123', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['123','12345','23435'], relatedqid: '', relatedhid: ''},
          {cid: '4', u18: 0, text: 'heres my thoughts on that blah blue bler blum', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', uid: '126', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''},
          {cid: '5', u18: 1, text: 'what happens when i chat a lot and it goes over into *another* line is it messy af? Id love to know!', userroleofauthor: 'mentor', fname: 'Emma', lname: 'Sullivan', uid: '123', datecreated: '2020-09-04T13:30:50.667Z', upvotes: [], relatedqid: '', relatedhid: ''},
          {cid: '6', u18: 0, text: 'heres my thoughts on that blah blue bler blum', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', uid: '126', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''},
          {cid: '7', u18: 1, text: 'what happens when i chat a lot and it goes over into *another* line is it messy af? Id love to know!', userroleofauthor: 'mentor', fname: 'Emma', lname: 'Sullivan', uid: '123', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['123','12345','23435'], relatedqid: '', relatedhid: ''},
          {cid: '8', u18: 0, text: 'heres my thoughts on that blah blue bler blum', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', uid: '126', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''},
        ],
      },
      {
        hid: '1238',
        uid: '125',
        fname: 'Dexter',
        lname: 'Boyce',
        isPr: 0,
        industriestopostto: ['99999','19'],
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
        text: 'This is a general post about the news today. Wanted to talk about how the war in Ukraine is affecting VFX industry - there is so much inspiration for future content!',
        isanon: 0,
        votes: ['123','20'],
        hashtags: ['23','20','1','2','0',],
        hashtagsfreetext: ['my free text hashtag','blah','blu','ble','blum'],
        type: 'general',
        selectedFiles: [],
        postComments: [
          {cid: '1', u18: 1, text: 'what happens when i chat a lot and it goes over into *another* line is it messy af? Id love to know!', userroleofauthor: 'mentor', fname: 'Emma', lname: 'Sullivan', uid: '125', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['123','12345','23435'], relatedqid: '', relatedhid: ''},
          {cid: '2', u18: 0, text: 'heres my thoughts on that blah blue bler blum', userroleofauthor: 'mentee', fname: 'Emma', lname: 'Sullivan', uid: '234', datecreated: '2020-09-04T13:30:50.667Z', upvotes: ['12345','23435'], relatedqid: '', relatedhid: ''},
        ],
      }
    ]

    switch (tabToView) {
      case 'overview':
        return <CommunityOverview isLoggedIn={isLoggedIn} userRole={userRole} community={community} goToUnansweredQs={this.goToUnansweredQs} contentArr={contentArr}/>
      case 'questions':
        return <CommunityQuestions contentArr={contentArr} />
      case 'leaderboard':
        return <CommunityLeaderboard />
    }
  }

  render() {
    const {tabToView} = this.state
    const {userRole, isLoggedIn} = this.props;
    const community = {
      cmid: '1234',
    /*  name: 'Houdini',
      type: 'skill',
      typeid: '425',*/
      name: 'Film, TV & VFX',
      type: 'industry',
      typeid: '19',
      experts: ['1','2','3','4'],
      members: ['1','2','3','4','1','2','3','4','1','2','3','4'],
      numUnanswered: 24
    }

    let urlText, commItem

    if (community.type == 'industry') {
      commItem = getIndustryDeets(community.typeid)
      urlText = commItem.urlText
    } else if (community.type == 'skill') {
      commItem = getSkillDeets(community.typeid)
      urlText = commItem.urlText
    } else {
      //get role details here
      //commItem = getRoleDeets(community.typeid)
      //urlText = commItem.urlText
    }

    const commURL = "https://app.prospela.com/community/" + community.type + (community.type == 'skill' ? 's/' : '/') + urlText

    // Add meta tags
    metaAdder('property="og:type"', "website")
    metaAdder('property="og:title"', community.name + " community - Prospela.com")
    metaAdder('name="title"', community.name + " community - Prospela.com")
    metaAdder('property="og:url"', commURL)
    metaAdder('property="og:image"', "https://files.prospela.com/images/AskAQ_Icon.png") // this meta tag required for LinkedIn sharing
    metaAdder('property="og:site_name"', "Prospela.com")

    //Add link tags to head
    var linkTag = document.getElementById('canonicalLink')
    if(!linkTag && commURL != "https://app.prospela.com/community/falsefalse") {
      var link = document.createElement('link');
      link.id = 'canonicalLink'
      link.rel = 'canonical';
      link.href = commURL
      document.head.appendChild(link);
    }

    return (
      <React.Fragment>
        <div className="tabWindow">
          <div className="title-blankPage marginBottom20">
            <MenuNav />
            <div className="greyText fontSize12 marginBottom20 noBold">
              <i className="fas fa-home" /> &gt; Communities &gt; {community.type == 'skill' ? 'Skills' : (community.type == 'industry' ? 'Industries' : 'Roles')} &gt; {community.name}
            </div>
            <div className="paddingBtm marginBottom20">
              <div className="chatItemFlexContainer qTitle qaPage">
                <div>
                  <span className="marginBottom20 breakWord"><strong>{community.name} <span className="mediumGreyText">community</span></strong></span>
                  <div className="qDetail normalLineheight fontSize13 noBold marginBottom20 breakWord">
                    {userRole == 'mentor' ? ('Support aspiring ' + community.name + ' learners from all walks of life, alongside other compassionate experts') : ('Discover ' + community.name + ': learn directly from real employees, alongside like-minded peers')}
                  </div>
                  <button type="button" className="button-unstyled qDetail fontSize14 marginBottom20 breakWord noBold" name="leaderboard" onClick={(e) => this.updateTabToView(e)} >
                    <i className="fas fa-user-friends" /> {community.members.length} members
                    <svg viewBox="0 0 24 24" className="prCertifiedBadge marginRight0 marginLeft20">
                      <g>
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                      </g>
                    </svg><span> {community.experts.length} employee experts</span>
                  </button>
                </div>
                <span className="qCTA qaPage commPage">
                  <ShareOptionsBox
                    id={community.cmid}
                    qURL={commURL}
                    contentType={community.type}
                    authorinsttype={null}
                    authorinstfreetext={null}
                    authorinst={null}
                    buttonToShow="linkEmojiInviteText"
                    fromCommunityPage
                    commName={community.name}
                  />
                  {userRole == 'mentee' && (
                    <Modal {...AskQModalProps}>
                      <AddHighlightModalContent modalID="modal-addHighlightQApage" userRole='mentee' fromCommunityPage commType={community.type} commName={community.name}/>
                    </Modal>
                  )}
                  {userRole == 'mentor' && (
                    <Modal {...AddHighlightModalProps}>
                      <AddHighlightModalContent modalID="modal-addHighlight" userRole='mentor' fromCommunityPage commType={community.type} commName={community.name} updatePathName={this.props.updatePathName} handleCommPageChange={this.updateTabToView}/>
                    </Modal>
                  )}
                  {!isLoggedIn && (
                    <React.Fragment>
                      <div className="signUpPrompt-header isOnQAPage fontSize16">
                        <a className="button link Submit-btn signUpPrompt" href={"https://app.prospela.com/signup?origin=" + community.type + "&communityid=" + community.typeid}>
                          Join
                        </a>
                      </div>
                    </React.Fragment>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="groupdash-menuBar borderBtm borderGrey commPage">
            <button type="button" name="overview" onClick={(e) => {this.updateTabToView(e), this.scrollToView(e)}} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'overview' ? ' tabActive' : '')}>Overview</button>
            <button type="button" name="questions" onClick={(e) => {this.updateTabToView(e), this.scrollToView(e)}} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'questions' ? ' tabActive' : '')}>Questions</button>
            <button type="button" name="leaderboard" onClick={(e) => {this.updateTabToView(e), this.scrollToView(e)}} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'leaderboard' ? ' tabActive' : '')}><i className="fas fa-crown" /> Leaderboard</button>
          </div>
          { this.renderTab(community) }
        </div>
      </React.Fragment>
    );
  }
}

export default CommunityPage;
