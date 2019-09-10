// Dex last merged this code on 10th Sept 2019

import React from "react";
import ReactDOM from "react-dom";
import '../css/Camera.css';
import '../css/General.css';

class Autocomplete extends React.Component {
  static defaultProperty={
    suggestions: []
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ''
    };
  }

  onChange = (e) => {
    const { suggestions, handleChange } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.substr(0,userInput.length).toLowerCase() === userInput.toLowerCase()
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
    handleChange(e.currentTarget.value);
  };

  onClick = (e) => {
    const { handleChange, name } = this.props;
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
    handleChange(e.currentTarget.innerText);
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    const { handleChange, name } = this.props;

    // User pressed the enter key
    if (e.keyCode === 13 || e.keyCode === 9) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
      handleChange(filteredSuggestions[activeSuggestion]);
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
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const { onChange, onClick, onKeyDown } = this;
    const { name, placeholder, handleBlur, handleChange } = this.props;
    const { activeSuggestion, filteredSuggestions, showSuggestions, userInput } = this.state;

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <div className="autocompleter-items">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "autocompleter-active";
              }

              return (
                <div className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </div>
              );
            })}
          </div>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions</em>
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <input
          type="text"
          name={name}
          className="form-control-std autocompleter"
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          onBlur={handleBlur}
          required
        />
        {suggestionsListComponent}
      </React.Fragment>
    );
  }
}

export default Autocomplete;
