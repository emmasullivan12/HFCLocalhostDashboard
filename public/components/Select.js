// Dex last merged this code on 12th Sept 2019

import React from "react";
import ReactDOM from "react-dom";
import '../css/General.css';
import '../css/Select.css';

// USE THESE TO STYLE:
// https://www.w3schools.com/howto/howto_custom_select.asp
// https://codepen.io/jbierly/pen/YyNjqw

class SelectBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  onChange = (e) => {
    const { handleChange } = this.props;
    this.setState({
      value: e.target.value
    });
    handleChange(e.target.value);
  };

  onClick = (e) => {
    const { handleChange, name } = this.props;
    this.setState({
      value: e.currentTarget.value
    });
    handleChange(e.currentTarget.value);
  };

  render() {
    const { onChange, onClick } = this;
    const { name, handleBlur, handleChange, required, options } = this.props;
    const { activeSuggestion, value } = this.state;

    return (
      <React.Fragment>
        <div className="custom-select">
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
          >
            {options.map((option, index) => {
              return (
                <option value={option.value} key={option.value} onClick={onClick}>
                  {option.label}
                </option>
              )
            })}
          </select>
        </div>
      </React.Fragment>
    );
  }
}

export default SelectBox;
