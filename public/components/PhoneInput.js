// Dex last merged this code on 12th June 2020

import React from "react";
import ReactDOM from "react-dom";

class PhoneInput extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { focusOnLoad, id, handleTabPress } = this.props
    if (focusOnLoad) {
      document.getElementById(id).focus();
    }
    if (handleTabPress) {
      handleTabPress(false);
    }
  }

  render() {
//    const { onChange } = this;
    const { name, id, onBlur, placeholder, handleChange, handleKeyUp, required, min, max, handleMouseDown, onKeyDown, pattern } = this.props;

    return (
      <React.Fragment>
        <input
          type="tel"
          name={name}
          id={id}
          placeholder={placeholder}
          className="form-control-std"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="off"
          onBlur={onBlur}
          required={required}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          onKeyUp={handleKeyUp}
          onMouseDown={handleMouseDown}
          pattern={pattern}
        />

      </React.Fragment>
    );
  }
}

export default PhoneInput;
