// Dex last merged this code on 12th Dec 2019

import React from "react";
import ReactDOM from "react-dom";
//import '../css/Camera.css';
//import '../css/General.css';
import '../css/Autocomplete.css';

class Autocomplete extends React.Component {
  static defaultProperty={
    suggestions: []
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: true,
      userInput: ''
    };
  }

  componentDidMount(){
    const { focusOnLoad, handleTabPress, renderComponents, fileToRender, componentToRender, componentUpdatesState, name } = this.props

    if (focusOnLoad) {
      document.getElementById("autocompleteBox-"+name).focus();
    }
    console.log("about to renderComponants function");
    console.log("renderComponents"+renderComponents);
    console.log(renderComponents);
    if (renderComponents) {
      renderComponents(fileToRender, componentToRender, componentUpdatesState)
    }
    handleTabPress(false);
  }

  onMouseDown = (e) => {
    e.preventDefault();
  }

  onBlur = (e) => {
    const { suggestions, valueToShow, required, name } = this.props;
    const hasMultipleAttributes = this.checkMultipleAttributes();
    const userInput = this.state.userInput;
    const isValid = this.checkUserInputExists(userInput);

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.value
    });

  //  if(!required && userInput == null || !required && userInput != null && isValid || required && userInput != null && isValid) {
    if(isValid) {
      document.getElementById("autocompleteBox-"+name).classList.remove('error');
    } else {
      document.getElementById("autocompleteBox-"+name).classList.add('error');
    }
  }

  onChange = (e) => {
    const { suggestions, handleChange, valueToShow, required } = this.props;
    const userInput = e.currentTarget.value;
    const hasMultipleAttributes = this.checkMultipleAttributes();

    function filteredSuggestions() {

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
    const isValid = this.checkExists(e.currentTarget.value);
    handleChange(e.currentTarget.value, isValid);
  };

  onClick = (e) => {
    const { suggestions, handleChange, name, valueToShow, required } = this.props;

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.dataset.text
    });
    const isValid = this.checkExists(e.currentTarget.dataset.id);
    handleChange(e.currentTarget.dataset.id, isValid);
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    const { handleChange, handleTabPress, idValue, name, valueToShow } = this.props;

    // User pressed the enter key
    if (e.keyCode === 13) {
      e.preventDefault();
      const isntValueToShow = valueToShow == undefined
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: isntValueToShow ? filteredSuggestions[activeSuggestion] : filteredSuggestions[activeSuggestion][valueToShow]
      });
      const isValid = this.checkUserInputExists(isntValueToShow ? filteredSuggestions[activeSuggestion] : filteredSuggestions[activeSuggestion][valueToShow]);
      valueToShow == undefined ? handleChange(filteredSuggestions[activeSuggestion], isValid) : handleChange(filteredSuggestions[activeSuggestion][idValue], isValid);
    }

    // User pressed the tab key
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
        const isValid = this.checkUserInputExists(isntValueToShow ? filteredSuggestions[activeSuggestion] : filteredSuggestions[activeSuggestion][valueToShow]);
        valueToShow == undefined ? handleChange(filteredSuggestions[activeSuggestion], isValid) : handleChange(filteredSuggestions[activeSuggestion][idValue], isValid);
        handleTabPress(true);
      }
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
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  checkExists(inputToCheck) {
    const { suggestions, required, valueToShow } = this.props;
    const hasMultipleAttributes = this.checkMultipleAttributes();
    const isValid = inputToCheck ? (suggestions.findIndex(option => (hasMultipleAttributes ? option.value : (valueToShow === undefined ? option : option[valueToShow])) === inputToCheck) != -1) : (required ? false : true);
    return isValid;
  }

  checkUserInputExists(inputToCheck) {
    const { suggestions, required, valueToShow } = this.props;
    const hasMultipleAttributes = this.checkMultipleAttributes();
    const isValid = inputToCheck ? (suggestions.findIndex(option => (hasMultipleAttributes ? option[valueToShow] : (valueToShow === undefined ? option : option.value)) === inputToCheck) != -1) : (required ? false : true);
    return isValid;
  }

  checkMultipleAttributes() {
    const { suggestions } = this.props;
    console.log("suggestionsPRE DYNAMIC IMPORT: "+suggestions);
    console.log("suggestions[0]PRE DYNAMIC IMPORT: "+suggestions[0]);
    if (suggestions[0] === undefined) {
      return false
    } else {
      if (suggestions[0].value != undefined || suggestions[0].value != null) {
        return true
      } else {
        return false
      }
    }
  }

  render() {
    const { onChange, onClick, onMouseDown, onKeyDown } = this;
    const { name, detailToShow, placeholder, handleChange, idValue, required, showDetail, suggestions, valueToShow } = this.props;
    const { activeSuggestion, filteredSuggestions, showSuggestions, userInput } = this.state;
    const hasMultipleAttributes = this.checkMultipleAttributes();

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <div className="autocompleter-items">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "autocompleter-active" + (showDetail===true ? ' showDetail overflow-ellipsis' : ' noDetail');
              } else {
                className="autocompleter-item" + (showDetail===true ? ' showDetail overflow-ellipsis' : ' noDetail');
              }
              const content = valueToShow == undefined ? suggestion : suggestion[valueToShow];
              const key = valueToShow == undefined ? suggestion : suggestion[idValue];
              const detail = detailToShow == undefined ? '' : suggestion[detailToShow];
              return (
    //            {hasMultipleAttributes === true && (
    //              <div className={className} key={suggestion.value} onClick={onClick}>
    //                {suggestion.value}
  //                </div>
  //              ) : (
        //          <div className={className} key={hasMultipleAttributes === true ? suggestion.value : suggestion} onClick={onClick}>
                  <div
                    className={className}
                    key={key}
                    onClick={onClick}
                    onMouseDown={onMouseDown}
                    data-id={key}
                    data-text={content}
                  >
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
          id={"autocompleteBox-"+name}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          onBlur={this.onBlur}
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
