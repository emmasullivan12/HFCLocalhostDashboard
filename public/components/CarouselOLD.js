// Dex last merged this code on 20th nov 2023

import React, { Component } from "react";
import "../css/Carousel.css";

class Carousel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      offset: 0,
      atEnd: false
    }
    this.carouselWidth = this.carouselWidth.bind(this);
    this.cardWidth = this.cardWidth.bind(this);
    this.cardMarginRight = this.cardMarginRight.bind(this);
    this.cardsShown = this.cardsShown.bind(this);
    this.handleCardLeft = this.handleCardLeft.bind(this);
    this.handleCardRight = this.handleCardRight.bind(this);
  }

  carouselWidth = () => {
    const carousel = document.querySelector("[data-target='carousel']");
    const carouselWidth = carousel.offsetWidth;
    return carouselWidth;
  }

  cardWidth = () => {
    const carousel = document.querySelector("[data-target='carousel']");
    const card = carousel.querySelector("[data-target='card']");
    const cardStyle = card.currentStyle || window.getComputedStyle(card)
    const cardWidth = Number(cardStyle.width.match(/\d+/g)[0]);
    return cardWidth;
  }

  cardMarginRight = () => {
    const carousel = document.querySelector("[data-target='carousel']");
    const card = carousel.querySelector("[data-target='card']");
    const cardStyle = card.currentStyle || window.getComputedStyle(card)
    const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
    return cardMarginRight;
  }

  cardsShown = () => {
    const cardsShown = this.carouselWidth()/(this.cardWidth()+this.cardMarginRight());
    return cardsShown;
  }

  handleCardLeft = () => {
    const {offset} = this.state
    const currentState = offset;
    if (currentState === 0) {
      return;
    } else {
      const carousel = document.querySelector("[data-target='carousel']");
      this.setState({ atEnd: false });
      this.setState({ offset: currentState + this.cardWidth() + this.cardMarginRight() }, () => {
        carousel.style.transform = `translateX(${currentState}px)`;
      });
    }
  }

  handleCardRight = () => {
    const {offset} = this.state
    const currentState = offset;
    const carousel = document.querySelector("[data-target='carousel']");
    const cardCount = carousel.querySelectorAll("[data-target='card']").length;
    const maxX = -((cardCount / this.cardsShown()) * this.carouselWidth() +
                   (this.cardMarginRight() * (cardCount / this.cardsShown())) -
                   this.carouselWidth() - this.cardMarginRight());
    console.log("maxX: "+maxX)
    console.log("currentState: "+currentState)
    if (currentState <= maxX) {
      console.log("atend")
      this.setState({ atEnd: true });
    } else {
      console.log("move caruousel right")
      this.setState({ offset: currentState - this.cardWidth() - this.cardMarginRight() }, () => {
        carousel.style.transform = `translateX(${currentState}px)`;
      });
    }
  }

  render() {
    const {children} = this.props;
    const {offset, atEnd} = this.state;
    const {handleCardLeft, handleCardRight} = this;

    return (
      <div className="wrapper">
        <ul className="carousel" data-target="carousel">
          {children}
        </ul>
        <div>
          {offset !== 0 && (
            <button type="button" className="arrowBtn left" id="slideLeft" data-action="slideLeft" onClick={this.handleCardLeft}>
              <span><i className="fas fa-arrow-left"/></span>
            </button>
          )}
          {atEnd != true && (
            <button type="button" className="arrowBtn right" id="slideRight" data-action="slideRight" onClick={this.handleCardRight}>
              <span><i className="fas fa-arrow-right"/></span>
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Carousel;
