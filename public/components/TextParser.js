// Dex last merged this code on 10th August 2019

import React, { Component } from "react";

class TextParser extends Component {
  render() {
      let text = this.props.text,
          parsed, parsedURL, parsedTwice, regex, paragraphs;

      regex = {
        paragraph: /(\r\n|\r|\n)/g,
        formatting: /(_.*?_)|(\*.*?\*)/g,
        links: /((?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$]))/igm,
      }

      let applyFormatting = (text) => {
        return text.split(regex.formatting).filter(n => n).map((str) => {
          let parsedTwice = str[0] == '_' // Checks for _italics
            ? (<em>{applyFormatting(str.substr(1, str.length - 2))}</em>)
            : str[0] == '*' // Checks for *bold
            ? (<b>{applyFormatting(str.substr(1, str.length - 2))}</b>)
            : str.split(regex.links).map((str) => { // Checks for URLs
              let parsedURL = regex.links.test(str)
                ? (<a rel='external noopener noreferrer' target="_blank" href={(str.includes("http://") || str.includes("https://")) ? str : ("https://" + str)}>{str}</a>)
                : str
              return parsedURL
            });
          return parsedTwice;
        });

      };

      var x = 0
      // Checks for \n line breaks
      paragraphs = text.split(regex.paragraph) || []
      paragraphs = paragraphs.map((text)=> {
        const key = x++
        return (
          <p className="" key={key}>
            { applyFormatting(text) }
          </p>
        )
      })

      return (
        <div>{paragraphs}</div>
      )
    }
}

export default TextParser;
