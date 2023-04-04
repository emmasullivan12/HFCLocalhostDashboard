// Dex last merged this code on 12th Aug 2020

import React from "react";
import ReactDOM from "react-dom";

import {parsePhoneNumber, isPossiblePhoneNumber, isValidPhoneNumber, ParseError} from 'libphonenumber-js'
import PhoneInput from 'react-phone-input-international'
import 'react-phone-input-international/lib/style.css'

import "../css/PhoneInput.css";

class PhoneInputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: this.props.initialValue ? this.props.initialValue : '', // i.e. had already saved a phone number in database
      phoneNumberIsValid: this.props.initialValue ? true : false,
      hasError: false,
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

  checkPhoneValidity = (value, country) => {
    const {id, handleChange, required} = this.props

    if (value.length == 0 || (value.length <= country.dialCode.length)) {
      this.setState({
        phoneNumberIsValid: required == true ? false : true,
        hasError: required == true ? true : false, //
      }, () => {
        handleChange(id, value, this.state.phoneNumberIsValid)
      })
      return
    } else {
      let phoneNumber
      try {
        const countryCode = country.countryCode.toUpperCase()
        phoneNumber = parsePhoneNumber(value, {defaultCountry: countryCode, extract: false})
      } catch (error) {
        this.setState({
          phoneNumberIsValid: false,
          hasError: true,
        }, () => {
          handleChange(id, value, this.state.phoneNumberIsValid)
        })
        if (error instanceof ParseError) {
          // Not a phone number, non-existent country, etc.
          console.log(error.message)
        } else {
          throw error
        }
      }

      if (phoneNumber != undefined) {
        let isPossiblePhoneNumber = phoneNumber.isPossible()
        let isValidPhoneNumber = phoneNumber.isValid()

        if (isPossiblePhoneNumber == true && isValidPhoneNumber == true) {
          this.setState({
            phoneNumberIsValid: true,
            hasError: false,
          }, () => {
            handleChange(id, value, this.state.phoneNumberIsValid)
          })
        } else {
          this.setState({
            phoneNumberIsValid: false,
            hasError: true,
          }, () => {
            handleChange(id, value, this.state.phoneNumberIsValid)
          })
        }
      } else {
        this.setState({
          phoneNumberIsValid: false,
          hasError: true,
        }, () => {
          handleChange(id, value, this.state.phoneNumberIsValid)
        })
      }
    }
  }

  render() {
//    const { onChange } = this;
    const { name, id, onBlur, handleKeyUp, required, min, max, handleMouseDown, onKeyDown, extraInputCSSClass} = this.props;
    const {phoneNumberIsValid, hasError} = this.state

    return (
      <PhoneInput
        country='gb'
        preferredCountries={['gb','us','ca','au','nz']}
        value={this.state.phone}
      //  isValid={(value, country) => {this.checkPhoneValidity(value, country)}}
        onChange={(value, country) => {this.checkPhoneValidity(value, country)}}
        inputClass={"form-control-std phoneInput " + (extraInputCSSClass ? extraInputCSSClass : "") + (hasError == true ? " error" : "")}
        inputProps={{
          name: name,
          required: required,
          id: id,
          autoComplete: "off",
          autoCorrect: "off",
          spellCheck: "off",
          onBlur: onBlur,
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
