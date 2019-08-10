// Dex last merged this code on 10th Aug 2019

import React, { Component } from "react";
import "../css/Carousel.css";

class Carousel extends Component {
  render() {
    // const className = this.props.PassedOnMentor ? 'UserCardContainer-passed' : 'UserCardContainer';
    const {children} = this.props;
    return (
      <div className="carousel-container">
        <div className="carousel">
          <input className='carousel__activator' type="radio" name="carousel" id="carousel-slide-activator-1" checked="checked"/>
          <input className='carousel__activator' type="radio" name="carousel" id="carousel-slide-activator-2"/>
          <input className='carousel__activator' type="radio" name="carousel" id="carousel-slide-activator-3"/>
          <div className='carousel__controls'>
            <label className='carousel__control carousel__control--forward' htmlFor="carousel-slide-activator-2">
              fwd
            </label>
          </div>
          <div className='carousel__controls'>
            <label className='carousel__control carousel__control--backward' htmlFor="carousel-slide-activator-1">
              back
            </label>
            <label className='carousel__control carousel__control--forward' htmlFor="carousel-slide-activator-3">
              fwd
            </label>
          </div>
          <div className='carousel__controls'>
            <label className='carousel__control carousel__control--backward' htmlFor="carousel-slide-activator-2">
              back
            </label>
          </div>
          <div className="carousel__screen">
            <div className="carousel__track">
              <div className="carousel__item carousel__item--mobile-in-1 carousel__item--tablet-in-2 carousel__item--desktop-in-3">
                <div className="demo-content">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
