// Dex last merged this code on 7th sept 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";

import '../css/Photo.css';

const Photo = (props) => (
  <div className={"photoOutput "+props.isProfPic} style={props.isPicSet ? {backgroundImage:"url(" + props.profPicSrc + ")"} : null}>
    {props.isProfPic !='isProfPic' ? (
      <img id="photo" alt="Take snapshot" />
      )
  /*  : props.isPicSet ? (
        <img
          id="profPic"
          alt="Take snapshot"
          src={props.profPicSrc}
        />
      )*/
    : !props.isPicSet && (
      <div className={"profile-thumb img-circle noPic "+props.isMe}>
        <div className="userInitial uploadPic">
          {props.userInitial}
        </div>
      </div>
      )
    }
  </div>
);

export default Photo;
