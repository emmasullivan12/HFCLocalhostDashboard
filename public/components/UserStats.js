import React, { Component } from "react";
/*import { connect } from "react-redux";
//import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import { userStatsFetchData } from "../actions/UserStats";*/


class UserStats extends Component {
    render() {

        return (
            <div>
                {this.props.userStats.map((userStats) => (
                  <div key={userStats.badge}>
                    {userStats.badge}
                    {userStats.score}
                  </div>
                ))}
            </div>
        );
    }
}

UserStats.propTypes = {
    fetchData: PropTypes.func.isRequired,
    userStats: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    userStats: state.userStats,
    hasErrored: state.userStatsHasErrored,
    isLoading: state.userStatsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(userStatsFetchData())
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(UserStats);
