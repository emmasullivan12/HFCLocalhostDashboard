// Dex last merged this code on 13th oct 2020

import React, { Component } from "react";

import PageHeader from './PageHeader.js';
import "../css/HomePage.css";

const PageHeaderProps = {
  ariaLabel: 'Page Header',
  title: 'Prospela Homepage',
  subHeader: 'This is the Prospela homepage'
}

class ProspelaHomepage extends Component {
  render() {

    return (
      <div className="contentContainer">
        <PageHeader {...PageHeaderProps} />
        <div className="page-panel">
          <div>
            Stuff goes here
          </div>
        </div>
      </div>
    )
  }
}

export default ProspelaHomepage;
