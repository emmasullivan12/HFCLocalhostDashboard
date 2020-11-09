// Dex last merged this code on 9th nov 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";

import '../css/Photo.css';

// **Overview**
  // **Props**
    // - profPicSrc
      //   type: cdn + userAvatarsFolder + /path/to/img + size
      //   Is already adjusted before being passed in. Only relates to user prof pics i.e. is within userAvatarsFolder


const Photo = (props) => (
  <div className={"photoOutput "+props.isProfPic} id="profPic" style={props.isPicSet ? {backgroundImage:"url(" + props.profPicSrc + ")"} : null}>
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
