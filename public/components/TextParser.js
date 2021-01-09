// Dex last merged this code on 18th dec 2020

import React, { Component } from "react";

class TextParser extends Component {
  render() {
    let text = this.props.text,
        parsed, regex, paragraphs;

    regex = {
      paragraph: /(\r\n|\r|\n)(?!-|>)/g,
      formatting: /(_.*?_)|(\*.*?\*)|(\n-.*?)|(\n>.*?)|(~.*?~)/g,
//      formatting: /((?<=[\n ]|^)_(?!_)[^\n ]{1,}?_(?!\w))|(\*(?!\*)[^\n ]{1,}?\*)|(\n-.*?)|(\n>.*?)|((?<=[\n ]|^)~(?![~ ]).{1,}?~(?!\w))/g, // But not working on Safari and Firefox as positive lookbehind doesnt work (tried ?: instead but needs fiddling with)
      links: /((?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$]))/igm,
    }

    let applyFormatting = (text) => {
    /* eslint-disable no-shadow */
      return text.split(regex.formatting).filter(n => n).map((str, i) => {
      /*    console.log(str[0])
          console.log(str)
          console.log(str[str.length - 1])*/
        let parsedTwice = str[0] == '_' && str[str.length - 1] == '_'// Checks for _italics_
          ? (<em>{applyFormatting(str.substr(1, str.length - 2))}</em>)
          : str[0] == '*' && str[str.length - 1] == '*'// Checks for *bold*
          ? (<b>{applyFormatting(str.substr(1, str.length - 2))}</b>)
          : str.substring(0,2) == '\n-' // Checks for \n- bullets
          ? (
            <React.Fragment>
              <br/>
              <span>
                &#9679; {applyFormatting(str.substr(2, str.length))}
              </span>
            </React.Fragment>
          )
          : str[0] == '~' && str[str.length - 1] == '~'// Checks for ~highlight~
          ? (<span className="highlight-titleText">{applyFormatting(str.substr(1, str.length - 2))}</span>)
    /*      : str.substring(0,2) == '\n>' // Checks for \n> blockquote
          ? (
            <React.Fragment>
              <br/>
              <span className="blockquote">
                {applyFormatting(str.substr(2, str.length))}
              </span>
            </React.Fragment>
          )*/
          : str.split(regex.links).map((str) => { // Checks for URLs
            let parsedURL = regex.links.test(str)
              ? (<a rel='external noopener noreferrer' target="_blank" href={(str.includes("http://") || str.includes("https://")) ? str : ("https://" + str)}>{str}</a>)
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
      } else {
        return (
          <p className="textParser-container" key={key}>
            { applyFormatting(text) }
          </p>
        )
      }
    })

    return (
      <div>{paragraphs}</div>
    )
  }
}

export default TextParser;
