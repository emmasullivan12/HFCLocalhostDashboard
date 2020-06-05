// Dex last merged this code on 4th June 2020

import React from "react";
import ReactDOM from "react-dom";

class TextInput extends React.Component {
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
    const { name, id, onBlur, placeholder, handleChange, handleKeyUp, required, maxLength, handleMouseDown } = this.props;

    return (
      <React.Fragment>
        <input
          type="text"
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
          onKeyUp={handleKeyUp}
          onMouseDown={handleMouseDown}
          maxLength={maxLength}
        />

      </React.Fragment>
    );
  }
}

export default TextInput;
