// Last merged this code on 28th mar 2024

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
    const { name, id, onBlur, placeholder, handleChange, handleKeyUp, required, minLength, maxLength, handleMouseDown, onKeyDown, className, defaultValue, value } = this.props;

    return (
      <React.Fragment>
        <input
          type="text"
          name={name}
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          className={className}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="off"
          onBlur={onBlur}
          required={required}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          onKeyUp={handleKeyUp}
          onMouseDown={handleMouseDown}
          minLength={minLength}
          maxLength={maxLength}
        />
      </React.Fragment>
    );
  }
}

export default TextInput;
