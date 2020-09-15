// Dex last merged this code on 15th sept 2020

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
      showSuggestions: false,
      userInput: ''
    };
  }

  componentDidMount(){
    const { focusOnLoad, handleTabPress, renderComponents, fileToRender, componentUpdatesState, name } = this.props

    if (focusOnLoad) {
      document.getElementById("autocompleteBox-"+name).focus();
    }
    if (renderComponents) {
      renderComponents(fileToRender, componentUpdatesState)
    }

    if (handleTabPress) {
      handleTabPress(false);
    }
  }

  onMouseDown = (e) => {
    e.preventDefault();
  }

  onBlur = (e) => {
    const { suggestions, onBlur, valueToShow, required, name, noSuggestionsCTAclass } = this.props;
    const hasMultipleAttributes = this.checkMultipleAttributes();
    const userInput = this.state.userInput;
    const isValid = this.checkUserInputExists(userInput);
    if (noSuggestionsCTAclass && e.relatedTarget != null && e.relatedTarget.className === noSuggestionsCTAclass) {
      return;
    } else {
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: e.currentTarget.value
      })
      if (onBlur) {
        onBlur()
      }
      if(isValid) {
        document.getElementById("autocompleteBox-"+name).classList.remove('error');
      } else {
        document.getElementById("autocompleteBox-"+name).classList.add('error');
      }
    }
  }

  onFocus = (e) => {
    const {filteredSuggestions, userInput} = this.state;
    const {onFocus} = this.props;

    if (onFocus) {
      onFocus()
    }

    if ((userInput != "" && this.checkUserInputExists(userInput)) || (filteredSuggestions.length === 0 && userInput === "")) {
      return
    } else {
      this.onChange(e);
    }
  }

  onChange = (e) => {
    const { suggestions, handleChange, valueToShow, isForForm, handleDone, required } = this.props;
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
        )
      } else {
        filteredSuggestions = suggestions.filter(
          suggestion =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) != -1
          //  suggestion.toLowerCase().includes(userInput.toLowerCase())
            // suggestion.substr(0,userInput.length).toLowerCase() === userInput.toLowerCase()
        )
      }
      return filteredSuggestions;
    }

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: filteredSuggestions(),
      showSuggestions: userInput != "" ? true : false,
  //    showSuggestions: true,
      userInput: e.currentTarget.value
    });

    const isValid = this.checkExists(e.currentTarget.value);
    const formId = isForForm === true ? e.currentTarget.closest("section > div").dataset.idforstate : null
    if (isForForm === true) {
      handleChange(e.currentTarget.value, formId, isValid, () => {
        if (handleDone) {
          handleDone(formId)
        }
      });
    } else {
      handleChange(e.currentTarget.value, isValid);
    }


  };

  onClick = (e) => {
    const { suggestions, handleChange, name, valueToShow, isForForm, handleDone, required } = this.props;

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.dataset.text
    });
    const isValid = this.checkUserInputExists(e.currentTarget.dataset.text);
    const formId = isForForm === true ? e.currentTarget.closest("section > div").dataset.idforstate : null

    if (isForForm === true) {
      handleChange(e.currentTarget.dataset.id, formId, isValid, () => {
        if (handleDone) {
          handleDone(formId)
        }
      });
    } else {
      handleChange(e.currentTarget.dataset.id, isValid);
    }
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions, showSuggestions } = this.state;
    const { handleChange, handleTabPress, idValue, name, valueToShow, isLastChild, isForForm, handleDone } = this.props;
    var key = e.key || e.keyCode

    // User pressed the enter key
    if (key === 'Enter' || key === 13) {
      e.preventDefault();

      if (filteredSuggestions.length) {
        const isntValueToShow = valueToShow == undefined
        this.setState({
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: isntValueToShow ? filteredSuggestions[activeSuggestion] : filteredSuggestions[activeSuggestion][valueToShow]
        })
        const isValid = this.checkUserInputExists(isntValueToShow ? filteredSuggestions[activeSuggestion] : filteredSuggestions[activeSuggestion][valueToShow]);
        const formId = isForForm === true ? e.currentTarget.closest("section > div").dataset.idforstate : null

        if (isForForm === true) {
          valueToShow == undefined ? handleChange(filteredSuggestions[activeSuggestion], formId, isValid, () => {handleDone && handleDone(formId)}) : handleChange(filteredSuggestions[activeSuggestion][idValue], formId, isValid, () => {handleDone && handleDone(formId)});
        } else {
          valueToShow == undefined ? handleChange(filteredSuggestions[activeSuggestion], isValid) : handleChange(filteredSuggestions[activeSuggestion][idValue], isValid);
        }

      } else {
        return;
      }
    }

    // User pressed the tab key
    if (key === 'Tab' || key === 9) {
      if (isLastChild != undefined && showSuggestions === true) {
        e.preventDefault()
      }

      if (filteredSuggestions.length) {
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
          const formId = isForForm === true ? e.currentTarget.closest("section > div").dataset.idforstate : null

          if (isForForm === true) {
            valueToShow == undefined ? handleChange(filteredSuggestions[activeSuggestion], formId, isValid) : handleChange(filteredSuggestions[activeSuggestion][idValue], formId, isValid);
          } else {
            valueToShow == undefined ? handleChange(filteredSuggestions[activeSuggestion], isValid) : handleChange(filteredSuggestions[activeSuggestion][idValue], isValid);
          }

          if (handleTabPress) {
            handleTabPress(true);
          }
        }
      } else return
    }

    // User pressed the up arrow
    else if (key === 'ArrowUp' || key === 38) {
      e.preventDefault();
      if (activeSuggestion === 0) {
        const parent = document.getElementById("autocompleter-items");
        const item = document.getElementsByClassName("autocompleter-item");
        parent.scrollTop = parent.scrollHeight - (item[0].offsetHeight * 5)
        this.setState({ activeSuggestion: filteredSuggestions.length - 1 });
      } else {
        this.handleMoveUp();
        this.setState({ activeSuggestion: activeSuggestion - 1 });
      }
    }

    // User pressed the down arrow
    else if (key === 'ArrowDown' || key === 40) {
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        const parent = document.getElementById("autocompleter-items");
        parent.scrollTop = 0;
        this.setState({ activeSuggestion: 0 });
      } else {
        this.handleMoveDown();
        this.setState({ activeSuggestion: activeSuggestion + 1 });
      }
    }
  };

  handleMoveUp = () => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    const parent = document.getElementById("autocompleter-items");
    const item = document.getElementsByClassName("autocompleter-item");
    if (activeSuggestion < (filteredSuggestions.length - 4)) {
      parent.scrollTop -= item[0].offsetHeight
    }
  }

  handleMoveDown = () => {
    const { activeSuggestion } = this.state;
    const parent = document.getElementById("autocompleter-items");
    const item = document.getElementsByClassName("autocompleter-item");
    // i.e. 4 = 5th box
    if (activeSuggestion >= 4) {
      parent.scrollTop += item[0].offsetHeight
    }
  }

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
    const { name, detailToShow, placeholder, handleChange, idValue, required, showDetail, suggestions, valueToShow, handleMouseDown, children } = this.props;
    const { activeSuggestion, filteredSuggestions, showSuggestions, userInput } = this.state;
    const hasMultipleAttributes = this.checkMultipleAttributes();

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <div className={"autocompleter-items " + (showDetail===true ? ' showDetail' : ' noDetail')} id="autocompleter-items">
              {filteredSuggestions.map((suggestion, index) => {
                let className;
                let dataTarget;

                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "autocompleter-active" + (showDetail===true ? ' showDetail overflow-ellipsis' : ' noDetail');
                  dataTarget = "autoCompleteItem";
                } else {
                  className="autocompleter-item" + (showDetail===true ? ' showDetail overflow-ellipsis' : ' noDetail') + (index === filteredSuggestions.length ? 'lastItem' : "");
                  dataTarget = "autoCompleteItem";
                }

                const suggestionText = valueToShow == undefined ? suggestion : suggestion[valueToShow];
                const key = valueToShow == undefined ? suggestion : suggestion[idValue];
                const detail = detailToShow == undefined ? '' : suggestion[detailToShow];

                return (
                  <div
                    className={className}
                    key={key}
                    onClick={onClick}
                    onMouseDown={onMouseDown}
                    data-id={key}
                    data-text={suggestionText}
                    data-target={dataTarget}
                    role="button"
                  >
                    {suggestionText}
                    {showDetail===true && (
                      <div className="autocompleter-item-detail">
                        {detail}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        );
      } else {
        suggestionsListComponent = (
          <div tabIndex="-1" className="no-suggestions" id="noSuggestionsCTA">
            <em>No suggestions</em>
            {children}
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <input
          tabIndex="0"
          type="text"
          name={name}
          className="form-control-std autocompleter"
          id={"autocompleteBox-"+name}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={this.onFocus}
          onKeyDown={onKeyDown}
          onMouseDown={handleMouseDown}
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
