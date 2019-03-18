import React, { Component } from "react";
import "../css/UserMenuContent.css";

class UserMenuContent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="menuModal-scrollArea">
          <div className="userMenuContainer">
            <div>
              Menu Item 1
            </div>
            <div>
              Menu Item 2
            </div>
            <div>
              Menu Item 3
            </div>
            <div>
              Menu Item 4
            </div>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default UserMenuContent;
