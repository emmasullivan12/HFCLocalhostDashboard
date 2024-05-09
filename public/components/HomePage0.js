// Last merged this code on 28th mar 2024
/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Carousel from './Carousel.js';
import FeedHeader from './FeedHeader.js';

class HomePage extends React.Component {

  render() {
    const {isLoggedIn, browser, usersCoursesDetail} = this.props
//cid: '1', lessonsCompleted: ['2','3'], startDate:
    return (
      <React.Fragment>
        <div className="tabWindow paddingL30 paddingR30 overflowYHidden displayFlex flexDirColumn" id="homepageContainer">
          <FeedHeader isLoggedIn={isLoggedIn} browser={browser} isHomePage/>
          <div className="marginTop20">
            <div role="main">
              {usersCoursesDetail && usersCoursesDetail.length > 0 && (
                <div>
                  <div className="courseSubHeader">My Courses</div>
                  <Carousel cardHeight="250px">
                    <div className="dataCard card height250px green" data-target="card" id="card-0" onBlur={() => this.handleBlur("tooltip-share-comm-link-0")}>
                      <div className="padding10 paddingR0">
                        <div className="paddingR displayFlex">
                          <div className="displayInlineBlock marginRight3"><span role="img" aria-label="green-heart emoji">💚</span> </div>
                          <div className="dataCardTitle displayInlineBlock"><strong>Active companies</strong></div>
                        </div>
                      </div>
                    </div>
                    <div className="dataCard card height250px" data-target="card" id="card-1" onBlur={this.handleBlur("tooltip-share-comm-link-1")}>
                      <div>Img goes here</div>

                    </div>
                  </Carousel>
                  <div>{usersCoursesDetail[0].cid}</div>
                </div>
              )}
              <div>
                <div className="courseSubHeader">Other TheSwiftExit.com Courses & Products</div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
