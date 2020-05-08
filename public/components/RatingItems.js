// Dex last merged this code on 16th May 2019

import React, { Component} from "react";
import '../css/RatingItems.css';

class RatingItems extends Component {
  render() {
    const {ratingOutOf, ratingIconImg} = this.props
    var rating = [];

// ratingIconImg prop to decide what type of svg icon to pull e.g. stars or thumbs up etc

    for (var i = 0; i < ratingOutOf; i++) {
      rating.push(
        <label key={i}>
          <input type="radio" />
          <div className="ratingItem">
            <div className="ratingIcon">
              <div className="ratingIconWrapper">
                <i className="fas fa-circle" />
              </div>
            </div>
            <div className="ratingText">{i+1}</div>
          </div>
        </label>
      );
    }

    return (
      <React.Fragment>
        <div className="ratingItemsContainer">
          {rating}
        </div>
      </React.Fragment>
    )
  }
}

export default RatingItems;
