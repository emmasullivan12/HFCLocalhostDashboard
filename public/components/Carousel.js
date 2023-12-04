// Dex last merged this code on 1st dec 2023
import React, { Component, useState } from 'react';
import { scrollIntoView } from "seamless-scroll-polyfill"; // To make scrollintoview work on safari/iOS
import {isiOS, whichBrowser} from "./GeneralFunctions.js"
import "../css/Carousel.css";

class Carousel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      index: 0,
      atStart: true,
      atEnd: false,
      cardCount: 0,
      cardWidth: 0,
      cardMarginRight: 0,
      cardsShown: 0,
    }
  }

  componentDidMount() {
    const {cardHeight} = this.props
    window.addEventListener('resize', this.countCardsShown);
    const wrapper = document.querySelector("[data-target='carousel-wrapper']");
    const carousel = document.querySelector("[data-target='carousel']");
    const cards = carousel.querySelectorAll("[data-target='card']")
    const cardCount = cards.length;
    const card = carousel.querySelector("[data-target='card']");

    // Check for iOS / safari
    this.setState({
      isSafariiOS: isiOS() || whichBrowser() == 'safari'
    })

    // Set card custom height
    cards.forEach(el => {
      el.style.height = cardHeight
    })
    wrapper.style.minHeight = cardHeight

    // Get card width
    const cardStyle = card.currentStyle || window.getComputedStyle(card)
    const cardWidth = Number(cardStyle.width.match(/\d+/g)[0]);
    const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
    const carouselWidth = carousel.offsetWidth
    const cardsShown = carouselWidth/(cardWidth+cardMarginRight);

    this.setState({
      allCardsShown: Math.floor(cardsShown) == cardCount,
      cardsShown: cardsShown,
      cardCount: cardCount,
      cardWidth: cardWidth,
      cardMarginRight: cardMarginRight,
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.countCardsShown);
  }

  countCardsShown = () => {
    const {cardWidth, cardMarginRight, cardCount} = this.state
    const carousel = document.querySelector("[data-target='carousel']");
    const carouselWidth = carousel.offsetWidth
    const cardsShown = carouselWidth/(cardWidth+cardMarginRight);

    this.setState({
      cardsShown: cardsShown,
      allCardsShown: Math.floor(cardsShown) == cardCount,
    })
  }

  handleCardRight = () => {
    const {index, atEnd, cardCount, cardWidth, cardMarginRight, cardsShown, isSafariiOS} = this.state
    const carousel = document.querySelector("[data-target='carousel']");
    const currentScrollPos = carousel.scrollLeft;
    const currentIndex = index
    let additionalScroll

    if (!atEnd) {

      var cardToGet = ((currentIndex < (Math.floor(cardsShown) - 1)) ? (currentIndex + Math.floor(cardsShown)) : (currentIndex + 1))
      var cardID = ("card-"+cardToGet)
      var el = carousel.querySelector("#" + cardID)

      // Remove (and reinstate) scroll on boxes as scrollbar was playing with scrollintoview function)
      var elHadScroll = el.style.overflowY = "auto"
      if (elHadScroll) {
        el.style.overflowY = "hidden"
      }

      // polyfill for safari iOS
      if (isSafariiOS) {
        scrollIntoView(el, { behavior: "smooth", block: "nearest"});
      } else {
        el.scrollIntoView({ behavior: "smooth", block: 'nearest'})
      }

      if (elHadScroll) {
        el.style.overflowY = "auto"
      }

      this.setState({
        atStart: false,
        index: cardToGet
      }, () => {
        if (this.state.index == (cardCount - 1)) {
          carousel.scrollLeft = carousel.scrollWidth // Hack to account for border width i.e. moves to very end
          this.setState({
            atEnd: true
          })
        }
      })
    } else {
      return
    }
  };

  handleCardLeft = () => {
    const {index, cardsShown, atStart, cardCount, cardWidth, cardMarginRight, isSafariiOS} = this.state
    const carousel = document.querySelector("[data-target='carousel']");
    const currentScrollPos = carousel.scrollLeft;
    const currentIndex = index
    let additionalScroll

    if (!atStart) {
      var cardToGet = ((currentIndex > Math.floor(cardsShown) - 1) ? (currentIndex - Math.floor(cardsShown)) : (currentIndex - 1))
      var cardID = ("card-"+cardToGet)
      var el = carousel.querySelector("#" + cardID)

      // Remove (and reinstate) scroll on boxes as scrollbar was playing with scrollintoview function)
      var elHadScroll = el.style.overflowY = "auto"
      if (elHadScroll) {
        el.style.overflowY = "hidden"
      }

      // polyfill for safari iOS
      if (isSafariiOS) {
        scrollIntoView(el, { behavior: "smooth", block: "nearest"});
      } else {
        el.scrollIntoView({ behavior: "smooth", block: 'nearest'})
      }

      if (elHadScroll) {
        el.style.overflowY = "auto"
      }

      this.setState({
        atEnd: false,
        index: cardToGet
      }, () => {
        if (this.state.index == 0) {
          carousel.scrollLeft = 0 // Hack to account for border width i.e. moves to very beginning
          this.setState({
            atStart: true
          })
        }
      })
    } else {
      return
    }

  }

  render() {
    const {children} = this.props;
    const {atStart, atEnd, allCardsShown} = this.state;
    const {handleCardLeft, handleCardRight} = this;

    return (
      <div className="wrapper" data-target="carousel-wrapper">
        <ul className="carousel" data-target="carousel">
          {children}
        </ul>
        <div>
          {(atStart != true && allCardsShown != true) && (
            <button type="button" className="arrowBtn left" id="slideLeft" data-action="slideLeft" onClick={this.handleCardLeft}>
              <span><i className="fas fa-arrow-left"/></span>
            </button>
          )}
          {(atEnd != true && allCardsShown != true) && (
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
