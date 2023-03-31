// Dex last merged this code on 12th Aug 2020

import React from "react";
import ReactDOM from "react-dom";

import PhoneInput from 'react-phone-input-international'
import 'react-phone-input-international/lib/style.css'

import "../css/PhoneInput.css";

class PhoneInputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: ''
    }
  }

  componentDidMount(){
    const { focusOnLoad, id, handleTabPress } = this.props
    if (focusOnLoad) {
      document.getElementById(id).focus();
    }
    if (handleTabPress) {
      handleTabPress(false);
    }
  /*  const input = document.querySelector(id);
    intlTelInput(input, {
      utilsScript: "build/js/utils.js"
        // any initialisation options go here
    }); */
  }

  render() {
//    const { onChange } = this;
    const { name, id, onBlur, placeholder, handleChange, handleKeyUp, required, min, max, handleMouseDown, onKeyDown, pattern } = this.props;

    return (
      <PhoneInput
        country={'gb'}
        preferredCountries={['gb','us','ca','au','nz']}
        value={this.state.phone}
        onChange={phone => {console.log(phone)}}
        inputClass="form-control-std phoneInput"
        inputProps={{
          name: name,
          required: required,
          id: id,
          autoComplete: "off",
          autoCorrect: "off",
          spellCheck: "off",
          onBlur: onBlur,
          required: required,
          onKeyDown: onKeyDown,
          onKeyUp: handleKeyUp,
          onMouseDown: handleMouseDown,
        //  onChange:handleChange,
        }}
      />
    /*  <input
        type="tel"
      //  name={name}
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
      />*/
    );
  }
}

export default PhoneInputContainer;
