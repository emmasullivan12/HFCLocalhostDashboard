// Dex last merged this code on 14th sept 2020

import React, { Component } from "react";

import MenuNav from './MenuNav.js';

class PageHeader extends Component {
  render() {
    const {ariaLabel, title, subHeader} = this.props;
    return (
      <div className="page-header">
        <MenuNav />
        <div className="page-detail-container overflow-ellipsis">
          <div className="page-title overflow-ellipsis">
            {title}
          </div>
          <div className="page-detail overflow-ellipsis">
            {subHeader}
          </div>
        </div>
      </div>
    )
  }
}

export default PageHeader;
