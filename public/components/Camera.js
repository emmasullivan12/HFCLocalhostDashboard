import React from "react";
import ReactDOM from "react-dom";
import '../css/Camera.css';
import '../css/General.css';

const Camera = (props) => (
  <div className="camera">
    <video id="video" width="350" autoPlay>
      <track kind="captions" />
    </video>
    <button type="submit" id="startButton" className="Submit-btn">Take photo</button>
  </div>
);

export default Camera;
