// Dex last merged this code on 12th Dec 2019

import React from "react";
import ReactDOM from "react-dom";
//import '../css/Camera.css';
//import '../css/General.css';
//import '../css/Autocomplete.css';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { focusOnLoad, id } = this.props
    if (focusOnLoad) {
      document.getElementById(id).focus();
    }
  }

  render() {
    const { onChange } = this;
    const { name, id, onBlur, placeholder, handleChange, required } = this.props;

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
        />

      </React.Fragment>
    );
  }
}

export default TextInput;
