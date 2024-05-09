// Last merged this code on 28th mar 2024
/* eslint-disable no-shadow, arrow-spacing */
import React, { Component } from "react";
import { Emoji } from 'emoji-mart'

class TextParser extends Component {

  render() {
    const {text, showInline, dontAllowClick} = this.props
    let parsed, regex, paragraphs;

    regex = {
      paragraph: /(\r\n|\r|\n)(?!-|>)/g,
      formatting: /((\b)_[^_ ].*?_(?=\n| |\.|~|\*))|(\*[^* ].*?\*(?=\n| |\.|~|_))|(\n-.*?)|(\n>.*?)|(~[^~ ].*?~(?=\n| |\.|\*|_))/g, // Should not include "_" or " " directly after first match, and last match should either be a new line or " "
      links: /((?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$]))/igm,
    }

    let applyFormatting = (text) => {
    /* eslint-disable no-shadow */
      return text.split(regex.formatting).filter(n => n).map((str, i) => {
          if (str.substring(0,2).includes("^")) {
            console.log(str)
            console.log(str.substring(0,2))
          }
        let parsedTwice = str[0] == '_' && str[str.length - 1] == '_'// Checks for _italics_
          ? (<em>{applyFormatting(str.substr(1, str.length - 2))}</em>)
          : str[0] == '*' && str[str.length - 1] == '*'// Checks for *bold*
          ? (<b>{applyFormatting(str.substr(1, str.length - 2))}</b>)
          : str[0] == '#' // Checks for # bullets
          ? (
            <React.Fragment>
              <ul>
                <li className="bullet">
                  {applyFormatting(str.substr(1, str.length - 2))}
                </li>
              </ul>
            </React.Fragment>
          )
          : str[0] == '^' // Checks for \n- bullets
          ? (
            <React.Fragment>
              <ul className="doubleIndentBulletTopList">
                <li>
                  <ul>
                    <li className="doubleIndentBullet">
                      {applyFormatting(str.substr(1, str.length - 2))}
                    </li>
                  </ul>
                </li>
              </ul>
            </React.Fragment>
          )
          : str[0] == '~' && str[str.length - 1] == '~'// Checks for ~highlight~
          ? (<span className="highlight-titleText">{applyFormatting(str.substr(1, str.length - 2))}</span>)
          : str.split(regex.links).map((str) => { // Checks for URLs
            let parsedURL = regex.links.test(str)
              ? (<a className={"msgText-link" + (dontAllowClick == true ? " noPointerEvents" : "")} rel='external noopener noreferrer' target="_blank" href={(str.includes("http://") || str.includes("https://")) ? str : ("https://" + str)}>{str}</a>)
              : str
            return parsedURL
          });
        return parsedTwice;
      });

    };

    let x = 0
    // Checks for \n line breaks
    paragraphs = text.split(regex.paragraph)
    paragraphs = paragraphs.map((text)=> {
      const key = x++
      if (text == '') {
        return <br />
      } else if (showInline == true) {
        return (
          <span className="textParser-container" key={key}>
            { applyFormatting(text) }
          </span>
        )
      } else {
        return (
          <p className="textParser-container" key={key}>
            { applyFormatting(text) }
          </p>
        )
      }
    })

    if (showInline == true) {
      return (
        <span>{paragraphs}</span>
      )
    } else {
      return (
        <div>{paragraphs}</div>
      )
    }
  }
}

export default TextParser;
