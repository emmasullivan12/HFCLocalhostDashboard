// Dex last merged this code on 9th sept 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";

import '../css/Photo.css';

const Photo = (props) => (
  <div className={"photoOutput " + (props.pictureTaken === true ? "photoShareContainer" : null)} >
    <img className="photoShare" id="photoShare" alt="Uploaded" src="https://prospela.com/wp-content/uploads/2020/10/416-4161690_empty-profile-picture-blank-avatar-image-circle.jpg" />
  </div>

);

export default Photo;
