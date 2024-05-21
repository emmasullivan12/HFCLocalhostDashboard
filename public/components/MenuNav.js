// Dex last merged this code on 21st may 2024

import React, { Component } from "react";

import "../css/HomePage.css";

class MenuNav extends Component {
  constructor () {
    super();
    this.openMenu = this.openMenu.bind(this);
  }

  openMenu() {
    document.getElementById("clientMenu").style.left = "0";
    document.getElementById("clientMenu").style.zIndex = "2000";
  }

  render() {
    const isNotif = 1

    return (
      <React.Fragment>
        <button type="button" id="nav-mainMenu" className="viewMenu button-unstyled" aria-label="View Menu" onClick={this.openMenu}>
          <svg width="24" height="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="rgba(0, 0, 0, .88)"/>
          </svg>
          {isNotif === 1 && (
            <div className="isNotif-navMenu img-circle"/>
          )}
        </button>
      </React.Fragment>
    )
  }
}

export default MenuNav;
