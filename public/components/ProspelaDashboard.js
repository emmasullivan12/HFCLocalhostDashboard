// Dex last merged this code on 27th Aug 2019

import React, { Component} from "react";
/*import { connect } from "react-redux";
import PropTypes from 'prop-types';*/
import "../css/App.css";
import "../css/General.css";
import {
  Route,
  NavLink,
  BrowserRouter,
  Redirect,
  Switch
} from "react-router-dom";
/*import store from "../store/configureStore";
import { usersFetchData } from "../actions/Users";*/

import ChatMenu from "./ChatMenu";
import MenuModal from "./MenuModal";
import Modal from "./Modal";
import NotFound from "./NotFound";
import ProspelaBot from "./ProspelaBot";
import SendNotifModalContent from './SendNotifModalContent.js';
import SubmitMatchContent from './SubmitMatchContent.js';
import ProspelaMenuContent from "./ProspelaMenuContent";
import ProtectedChats from "./ProtectedChats";
import ProtectedRoute from "./ProtectedRoute";

const MenuModalContent = (
  <ProspelaMenuContent />
)

//This is for Prospela team to send notification to all or some users
const SendNotifModalProps = {
  ariaLabel: 'Popup for Prospela to send notifications to users',
  triggerText: 'Send Notification',
  usedFor: 'PrSendNotif'
}

//This includes props and title to be passed to RequestChatModal
const SubmitMatchModalProps = {
  ariaLabel: 'Popup for Prospela to submit mentor matches',
  triggerText: 'Submit new match',
  usedFor: 'SubmitMatch'
}

// This includes all content to appear below Modal's title for the RequestChatModal
const SubmitMatchModalContent = (
  <SubmitMatchContent />
)

class ProspelaDashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      scrollerBeingDragged: false,
      normalizedPosition: 0,
      contentPosition: 0
    }
    this.scrollBarRef = React.createRef();
    this.calculateScrollerHeight = this.calculateScrollerHeight.bind(this);
    this.createScroller = this.createScroller.bind(this);
  }

  componentDidMount() {
    this.createScroller();
    window.addEventListener('resize', this.createScroller);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.createScroller);
  }

  moveScroller = (e) => {
    var scrollContentWrapper = document.querySelector('.c-scrollbar .c-scrollbar__hider');
    var scrollContainer = document.querySelector('.c-scrollbar');
    var scroller = document.querySelector('.c-scrollbar__bar');

    var scrollPercentage = e.target.scrollTop / scrollContentWrapper.scrollHeight;
    let topPosition;

    topPosition = scrollPercentage * (scrollContainer.offsetHeight - 5); // 5px arbitrary offset so scroll bar doesn't move too far beyond content wrapper bounding box
    scroller.style.transform = 'translateY(' + topPosition + 'px)';
  }

  startDrag = (e) => {
    var scrollContentWrapper = document.querySelector('.c-scrollbar .c-scrollbar__hider');
  //  contentPosition =  scrollContentWrapper.scrollTop;
    this.setState({
      scrollerBeingDragged: true,
      normalizedPosition: e.pageY,
      contentPosition: scrollContentWrapper.scrollTop
    });
    window.addEventListener('mouseup', this.stopDrag);
    window.addEventListener('mousemove', this.scrollBarScroll);
  }

  stopDrag = (e) => {
    this.setState({
      scrollerBeingDragged: false,
    });
    window.removeEventListener('mouseup', this.stopDrag);
    window.removeEventListener('mousemove', this.scrollBarScroll);
  }

  scrollBarScroll = (e) => {
    var scrollContentWrapper = document.querySelector('.c-scrollbar .c-scrollbar__hider');
    var scrollContainer = document.querySelector('.c-scrollbar');
    if (this.state.scrollerBeingDragged === true) {
      var mouseDifferential = e.pageY - this.state.normalizedPosition;
      var scrollEquivalent = mouseDifferential * (scrollContentWrapper.scrollHeight / scrollContainer.offsetHeight);
      scrollContentWrapper.scrollTop = this.state.contentPosition + scrollEquivalent;
    }
  }

  calculateScrollerHeight() {
    var scrollContentWrapper = document.querySelector('.c-scrollbar .c-scrollbar__hider');
    var scrollContainer = document.querySelector('.c-scrollbar');
    var visibleRatio = scrollContainer.offsetHeight / scrollContentWrapper.scrollHeight;
    return visibleRatio * scrollContainer.offsetHeight;
  }

  createScroller() {
    var scrollContainer = document.querySelector('.c-scrollbar');
    var scrollTrack = document.querySelector('.c-scrollbar__track');
    var scroller = document.querySelector('.c-scrollbar__bar');

    // determine how big scroller should be based on content
    var scrollerHeight =  this.calculateScrollerHeight();

    if (scrollerHeight / scrollContainer.offsetHeight < 1){
      // *If there is a need to have scroll bar based on content size
      scroller.style.height = scrollerHeight + 'px';

      // show scroll path divot
      scrollTrack.style.visibility = 'visible';

      // attach related draggable listeners
      scroller.addEventListener('mousedown', this.startDrag);
    } else {
      scrollTrack.style.visibility = 'hidden';
      scroller.removeEventListener('mousedown', this.startDrag);
    }
  }

  render(){
    const userRole = this.props.userRole;
    const {moveScroller, startDrag} = this;
    return(
      <BrowserRouter>
        <div className="clientUI">
          <div className="clientContainer">
            <div className="clientMenuContainer">
              <MenuModal>{MenuModalContent}</MenuModal>
              <div className="c-scrollbar">
                <div className="c-scrollbar__hider" ref={this.scrollBarRef} onScroll={moveScroller}>
                  <div className="menuContainer">
                    <Modal {...SendNotifModalProps}>
                      <SendNotifModalContent />
                    </Modal>
                    <Modal {...SubmitMatchModalProps}>
                      <SubmitMatchContent />
                    </Modal>
                    <ChatMenu chats={DUMMY_CHAT_LIST} userRole={userRole} chatGroup='Prospela DMs'/>
                    <ChatMenu chats={DUMMY_CHAT_LIST} userRole={userRole} chatGroup='U18 Chats to Monitor'/>
                    <ChatMenu chats={DUMMY_CHAT_LIST} userRole={userRole} chatGroup='18+ Chats to Monitor'/>
                    <div className="menuBreak"/>
                    <div className="prLogoArea">
                      <div className="prLogoContainer">
                        <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/03/Prospela-Logo.png" />
                      </div>
                    </div>
                  </div>
                </div>
              {/*  <div className="scroller"/>*/}
                <div className="c-scrollbar__track">
                  <div className="c-scrollbar__bar"/>
                </div>
              </div>
            </div>
            <div className="clientWindowContainer">
              <Switch>
                <Redirect exact from="/" to="/prospelaBotHomepage" />,
                <Route path="/messages/Prospela" component={ProspelaBot}/>
                <ProtectedChats chats={DUMMY_CHAT_LIST} />
                <Route component={NotFound}/>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

// Dummy chat list data (this will eventually come from Postgres)
const DUMMY_CHAT_LIST = [
  {chatID: '10000', studentId: '12345', mentor: 'Dexter', matchedTimestamp: '20181219', status: 'Prospela'},
  {chatID: '10001', studentId: '12345', mentor: 'David', matchedTimestamp: '20181219', status: 'ended'},
  {chatID: '10002', studentId: '12345', mentor: 'Emily', matchedTimestamp: '20181219', status: 'ended'},
];

export default ProspelaDashboard;
