// Last merged this code on 4th apr 2022

import React from "react";
import ReactDOM from "react-dom";

import {metaAdder, checkMobile} from './GeneralFunctions.js';
import AddHighlightModalContent from "./AddHighlightModalContent";
import CommunityOverview from "./CommunityOverview.js";
import CommunityQuestions from "./CommunityQuestions.js";
import CommunityLeaderboard from "./CommunityLeaderboard.js";
import MenuNav from './MenuNav.js';
import Modal from './Modal.js';
import MyContent from "./MyContent.js";

import '../css/GroupDash.css';

//import {LoadingSpinner, Check} from "./GeneralFunctions";
const AddHighlightModalProps = {
  ariaLabel: 'Add a Post',
  triggerText: 'Post',
  usedFor: 'addHighlight',
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
      isMobile: checkMobile(),
    }
  }

  componentDidMount() {
    const {updateDocumentTitle} = this.props
    window.addEventListener('resize', this.isMobile);

    const community = {
      gid: '1234',
      name: 'Houdini',
    }
    if(community != null){
      updateDocumentTitle(community.name + " community - Prospela.com")
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.isMobile);
    this.props.updateDocumentTitle("Prospela Dashboard")
  }

  updateTabToView = (e) => {
    this.setState({
      tabToView: e.target.name
    })
  }

  renderTab = () => {
    const {userRole, updatePathName} = this.props;
    const {tabToView} = this.state;

    switch (tabToView) {
      case 'overview':
        return <CommunityOverview />
      case 'questions':
        return <CommunityQuestions />
      case 'leaderboard':
        return <CommunityLeaderboard />
    }
  }

  render() {
    const {tabToView, isMobile} = this.state
    const {userRole, isLoggedIn} = this.props;
    const community = {
      cmid: '1234',
      name: 'Houdini',
      type: 'skill',
      typeid: '425',
      experts: ['1','2','3','4'],
      members: ['1','2','3','4','1','2','3','4','1','2','3','4'],
    }

    return (
      <React.Fragment>
        <div className="tabWindow">
          <div className="title-blankPage">
            <MenuNav />
            <div className="greyText fontSize12 marginBottom20 noBold">
              <i className="fas fa-home" /> &gt; Communities &gt; {community.type == 'skill' ? 'Skills' : (community.type == 'industry' ? 'Industries' : 'Roles')} &gt; {community.name}
            </div>
            <div className="borderBtm borderGrey paddingBtm marginBottom20">
              <div className={isMobile == true ? "" : "chatItemFlexContainer qaPage"}>
                <div>
                  <span className="qTitle qaPage marginBottom20 breakWord"><strong>{community.name} <span className="mediumGreyText">community</span></strong></span>
                  <span className="qDetail marginBottom20 breakWord">
                    {userRole == 'mentor' ? ('Support aspiring ' + community.name + ' learners from all walks of life, alongside other compassionate experts') : ('Discover ' + community.name + ': learn directly from real employees, alongside like-minded peers')}
                  </span>
                  <span className="qDetail marginBottom20 breakWord">
                    <i className="fas fa-user-friends" />{community.members.length} members
                    <svg viewBox="0 0 24 24" className="prCertifiedBadge">
                      <g>
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                      </g>
                    </svg> {community.experts.length} employee experts
                  </span>
                </div>
                <span className="qCTA qaPage">
                  {userRole == 'mentee' && (
                    <Modal {...AskQModalProps}>
                      <AddHighlightModalContent modalID="modal-addHighlightQApage" userRole='mentee'/>
                    </Modal>
                  )}
                  {userRole == 'mentor' && (
                    <Modal {...AddHighlightModalProps}>
                      <AddHighlightModalContent modalID="modal-addHighlight" userRole='mentor' fromCommunityPage commType={community.type} commTypeId={community.typeid} updatePathName={this.props.updatePathName}/>
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
          <div className="groupdash-menuBar borderBtm borderGrey">
            <button type="button" name="overview" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'overview' ? ' tabActive' : '')}>Overview</button>
            <button type="button" name="questions" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'questions' ? ' tabActive' : '')}>Questions</button>
            <button type="button" name="leaderboard" onClick={this.updateTabToView} className={'button-unstyled groupdash-menuBtn' + (tabToView == 'leaderboard' ? ' tabActive' : '')}><i className="fas fa-crown" /> Leaderboard</button>
          </div>
          { this.renderTab() }
        </div>
      </React.Fragment>
    );
  }
}

export default CommunityPage;
