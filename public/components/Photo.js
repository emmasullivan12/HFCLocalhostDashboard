// Dex last merged this code on 28th Oct 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";

import '../css/Photo.css';

const Photo = (props) => (
  <div className={"photoOutput "+props.isProfPic}>
    {props.isProfPic !='isProfPic' ? (
      <img id="photo" alt="Take snapshot" />
      )
    : props.isPicSet ? (
        <img
          id="profPic"
          alt="Take snapshot"
          src={props.profPicSrc}
        />
        )
      : (
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
