// Dex last merged this code on 12th Dec 2019

import React from "react";
import ReactDOM from "react-dom";
import '../css/General.css';
import '../css/Select.css';

// USE THESE TO STYLE:
// https://www.w3schools.com/howto/howto_custom_select.asp
// https://codepen.io/jbierly/pen/YyNjqw
// https://codepen.io/kevinptt/pen/GqXZRL

class SelectBox extends React.Component {
  static defaultProps = {
    options: []
  };
  
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      value: ''
    };
  }

  onChange = (e) => {
    const { options, handleChange, valueToShow } = this.props;
    const hasMultipleAttributes = (options[0].value != undefined) || (options[0].value != null);

    this.setState({
      activeSuggestion: 0,
      value: e.target.value
    });
    handleChange(e.target.value);
  };

  onClick = (e) => {
    const { handleChange, name } = this.props;
    this.setState({
      activeSuggestion: 0,
      value: e.currentTarget.value
    });
    handleChange(e.currentTarget.value);
  };

  onKeyDown = e => {
    const { activeSuggestion } = this.state;
    const { handleChange, name, options, valueToShow } = this.props;

    // User pressed the enter key
    if (e.keyCode === 13) {
      const isntValueToShow = valueToShow == undefined
      this.setState({
        activeSuggestion: 0,
//        value: isntValueToShow ? filteredSuggestions[activeSuggestion] : filteredSuggestions[activeSuggestion][valueToShow]
      });
//      valueToShow == undefined ? handleChange(filteredSuggestions[activeSuggestion]) : handleChange(filteredSuggestions[activeSuggestion][valueToShow]);
    }

    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion + 1 === options.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };


  render() {
    const { onChange, onClick, onKeyDown } = this;
    const { name, handleBlur, handleChange, required, options, valueToShow } = this.props;
    const { activeSuggestion, value } = this.state;
    const hasMultipleAttributes = (options[0].value != undefined || options[0].value != null);

    let optionsListComponent;
    optionsListComponent = (
    //  <div className="custom-select-items">
        options.map((option, index) => {
          let className;

          // Flag the active suggestion with a class
          if (index === activeSuggestion) {
            className = "select-active";
          } else {
            className="select-item";
          }
          const content = valueToShow == undefined ? option : option[valueToShow];
          const key = valueToShow == undefined ? option : option[valueToShow];
          return (
            <option className={className} key={key} onClick={onClick}>
              {content}
            </option>
          );
        })
    //  </div>
    );

    return (
      <React.Fragment>
        <div className="custom-select">
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            className="form-control-std"
          >
            {options.map((option, index) => {
              const key = valueToShow == undefined ? option : option[valueToShow];
              return (
                <option key={option.value} value={option.value}>
                  {option[valueToShow]}
                </option>
              );
            })}
            {optionsListComponent}
          </select>
          <div className="select-selected form-control-std">
            {value}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SelectBox;
