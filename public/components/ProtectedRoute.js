// Dex last merged this code on 16th May 2019

import React, { Component} from "react";
/*import { connect } from "react-redux";
import PropTypes from 'prop-types';*/
import {
  Route,
  Redirect
} from "react-router-dom";

class ProtectedRoute extends Component {
  render() {
    const userRole = this.props.userRole;
    const step = this.props.step;
    const roleAllowed = this.props.roleAllowed;
    const isAllowed = (userRole === roleAllowed) ? true : false;
    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => (
          isAllowed ?
            <Component {...props} /> :
            <Redirect to={{pathname: '/',state: { from: props.location }}} />
        )}
      />
    )
  }
}

/*ProtectedRoute.propTypes = {
    users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};
*/
export default ProtectedRoute;
