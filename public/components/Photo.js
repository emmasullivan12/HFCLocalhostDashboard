import React, { Component } from "react";
import ReactDOM from "react-dom";

import '../css/Photo.css';

const Photo = (props) => (
  <div className="photoOutput">
    <img id="photo" alt="Take snapshot" />
  </div>
);

export default Photo;
