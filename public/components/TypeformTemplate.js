// Dex last merged this code on 16th May 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/TypeformTemplate.css";

// SignUpPageContent provides all of the Content within Typeform Sign Up Pages
const TypeformPageContent = ({
  content,
  subheader,
  title
}) => {
  return (
    <div className="typeform-overlay">
      <div className="typeform-container">
        <div className="typeform-header">
          <div className="typeform-title">
            {title}
          </div>
        </div>
        <div className="typeform-subheader">
          <div className="subheader">
            {subheader}
          </div>
        </div>
        <div className="typeform-content">
          {content}
        </div>
      </div>
    </div>
  );
}

// Typeform Sign Up pages template for use with both mentors / student
class TypeformTemplate extends React.Component {
  render() {
    const {children, subheader, title} = this.props;
    return (
      <TypeformPageContent
        content={children}
        subheader={subheader}
        title={title}
      />
    );
  }
}

export default TypeformTemplate;
