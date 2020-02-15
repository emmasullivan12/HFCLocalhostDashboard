// Dex last merged this code on 12th Dec 2019

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
    const { valueToShow } = this.props;

    function filteredSuggestions() {
      const hasMultipleAttributes = (suggestions[0].value != undefined) || (suggestions[0].value != null);
      let filteredSuggestions;

      if (hasMultipleAttributes) {
        filteredSuggestions = suggestions.filter(
          suggestion =>
            suggestion[valueToShow].toLowerCase().indexOf(userInput.toLowerCase()) != -1
          //  suggestion.value.toLowerCase().includes(userInput.toLowerCase())
            // suggestion.value.substr(0,userInput.length).toLowerCase() === userInput.toLowerCase()
        );
      } else {
        filteredSuggestions = suggestions.filter(
          suggestion =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) != -1
          //  suggestion.toLowerCase().includes(userInput.toLowerCase())
            // suggestion.substr(0,userInput.length).toLowerCase() === userInput.toLowerCase()
        );
      }
      return filteredSuggestions;
    }

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: filteredSuggestions(),
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
    console.log("activeSuggestionOnType: "+this.state.activeSuggestion);
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
    const { handleChange, name, valueToShow } = this.props;

    // User pressed the enter key
    if (e.keyCode === 13) {
      const isntValueToShow = valueToShow == undefined
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: isntValueToShow ? filteredSuggestions[activeSuggestion] : filteredSuggestions[activeSuggestion][valueToShow]
      });
      valueToShow == undefined ? handleChange(filteredSuggestions[activeSuggestion]) : handleChange(filteredSuggestions[activeSuggestion][valueToShow]);
    }

    // User pressed the tab key - maybe close box and set userInput back to empty
    if (e.keyCode === 9) {
      const isntValueToShow = valueToShow == undefined
      if (this.state.showSuggestions === false) {
        return;
      } else {
        this.setState({
  //        activeSuggestion: 0,
          showSuggestions: false,
          userInput: isntValueToShow ? filteredSuggestions[activeSuggestion] : filteredSuggestions[activeSuggestion][valueToShow]
        });
        valueToShow == undefined ? handleChange(filteredSuggestions[activeSuggestion]) : handleChange(filteredSuggestions[activeSuggestion][valueToShow]);
      }
    }

    // User pressed the up arrow
    else if (e.keyCode === 38) {
      console.log("activeSuggestionUP: "+activeSuggestion);
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      console.log("filteredSuggestionsLength: "+filteredSuggestions.length);
      console.log("activeSuggestionDOWN: "+activeSuggestion);
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const { onChange, onClick, onKeyDown } = this;
    const { name, detailToShow, placeholder, handleBlur, handleChange, required, showDetail, suggestions, valueToShow } = this.props;
    const { activeSuggestion, filteredSuggestions, showSuggestions, userInput } = this.state;
    const hasMultipleAttributes = (suggestions[0].value != undefined || suggestions[0].value != null);

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <div className="autocompleter-items">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "autocompleter-active" + (showDetail===true ? ' showDetail' : ' noDetail');
              } else {
                className="autocompleter-item" + (showDetail===true ? ' showDetail' : ' noDetail');
              }
              const content = valueToShow == undefined ? suggestion : suggestion[valueToShow];
              const key = valueToShow == undefined ? suggestion : suggestion[valueToShow];
              const detail = detailToShow == undefined ? '' : suggestion[detailToShow];
              return (
    //            {hasMultipleAttributes === true && (
    //              <div className={className} key={suggestion.value} onClick={onClick}>
    //                {suggestion.value}
  //                </div>
  //              ) : (
        //          <div className={className} key={hasMultipleAttributes === true ? suggestion.value : suggestion} onClick={onClick}>
                  <div className={className} key={key} onClick={onClick}>
                    {content}
                    {showDetail===true && (
                      <div className="autocompleter-item-detail">
                        {detail}
                      </div>
                    )}
                  </div>
    //            )}
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
          autoComplete="off"
          autoCorrect="off"
          spellCheck="off"
          required={required}
        />
        {suggestionsListComponent}
      </React.Fragment>
    );
  }
}

export default Autocomplete;
