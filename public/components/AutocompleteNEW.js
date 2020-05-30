// Dex last merged this code on 26th April 2020

import React from "react";
import ReactDOM from "react-dom";
import '../css/Autocomplete.css';
import {ChevronDown, ChevronUp, X, Check} from './GeneralFunctions.js';

class AutocompleteNEW extends React.Component {
  static defaultProperty={
    suggestions: []
  };

  constructor(props) {
    super(props);
    this.state = {
      values: [],
      numSelected: 0,
      activeSuggestion: -1,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ''
    };
  }

  componentDidMount(){
    const { focusOnLoad, handleTabPress, renderComponents, fileToRender, componentUpdatesState, name } = this.props

    if (focusOnLoad) {
      document.getElementById("autocompleterTags-"+name).focus();
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
    console.log("onblur triggered")
    const { multiple, suggestions, onBlur, valueToShow, required, handleChange, name, finMultiOptions, noSuggestionsCTAclass } = this.props;
    const hasMultipleAttributes = this.checkMultipleAttributes();
    const values = this.state.values;
    const isValid = required ? values.length > 0 : true;

    if (noSuggestionsCTAclass && e.relatedTarget != null && e.relatedTarget.className === noSuggestionsCTAclass) {
      return;
    } else {

      if (onBlur) {
        onBlur()
      }
      handleChange(values, () => {
        if (values.length != 0) {
          if (finMultiOptions) {
            finMultiOptions()
          }
        }
      })


      if(isValid) {
        document.getElementById("autocompleterTags-"+name).classList.remove('error');
      } else {
        document.getElementById("autocompleterTags-"+name).classList.add('error');
      }
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: e.currentTarget.value
      })
    }
  }

  onFocus = (e) => {
    const {filteredSuggestions, userInput, values} = this.state;
    const {onFocus, multiple} = this.props;

    if (onFocus) {
      onFocus()
    }

    if ((userInput != "" && this.checkUserInputExists(userInput)) || (filteredSuggestions.length === 0 && userInput === "" && !multiple)) {
      return
    } else {
      this.onChange(e);
    }
  }

  focusOnInput = (e) => {
    const {name} = this.props
    document.getElementById("autocompleteBox-"+name).focus();
  }

  widthCalc = () => {
    const {userInput} = this.state

    let containerwidth;

    if (userInput === '') {
      containerwidth = 110 + "px"
      return
    } else {
      containerwidth = (userInput.length +1) + "ch"
    }

    document.getElementById('autocompleteBox-selectRole').style.width = containerwidth;
  }

  onChange = (e) => {
    console.log("onchange triggered")
    const { multiple, suggestions, handleChange, valueToShow, required, showCheckbox, openOnClick } = this.props;
    const userInput = e.currentTarget.value;
    this.widthCalc()
    // set width of input box to size f userInput
    const hasMultipleAttributes = this.checkMultipleAttributes();

    function filteredSuggestions() {

      let filteredSuggestions;

      if (multiple && userInput === '' && openOnClick) {
        filteredSuggestions = suggestions
      } else {
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
      }

      return filteredSuggestions;
    }
    this.setState({
      activeSuggestion: userInput != "" ? 0 : -1,
      filteredSuggestions: filteredSuggestions(),
      showSuggestions: ((multiple && openOnClick) || userInput != "") ? true : false,
      userInput: e.currentTarget.value
    }, () => {
      if (this.state.showSuggestions === true && showCheckbox === true) {
        this.heightCalc()
      }
    });
    if (multiple && openOnClick && userInput === '') {
      return
    }
  };

  stopPropagation = (e) => {
    e.stopPropagation()
  }

  onDeleteOption = (e) => {
    const {required, name, handleChange} = this.props;
    const {value} = e.currentTarget.dataset

    this.setState(prevState => {
      const [...values] = prevState.values
      const index = values.indexOf(value)

      values.splice(index, 1)

      handleChange(values)

      if ([...values].length === 0) {
        if(!required) {
          document.getElementById("autocompleterTags-"+name).classList.remove('error')
        } else {
          document.getElementById("autocompleterTags-"+name).classList.add('error')
        }
      }

      return {
        values,
        numSelected: values.length,
      }
    })
  }

  onClickOption = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { multiple, suggestions, handleChange, name, valueToShow, finMultiOptions, required } = this.props;
    console.log("ONCLICKOPTION triggered")
    const value = e.currentTarget.dataset.text;

    if (this.checkLetters(value) === false) {
      return
    }

    if (!multiple) {
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: value
      });
      const isValid = this.checkUserInputExists(value);
      handleChange(e.currentTarget.dataset.id, isValid);
    } else {
      this.setState(prevState => {
        const [ ...values ] = prevState.values
        const index = values.indexOf(value)

        if (index === -1) {
          values.push(value)
        } else {
          values.splice(index, 1)
        }
      //  handleChange(values)
        if(!required || required && value != null) {
          document.getElementById("autocompleterTags-"+name).classList.remove('error')
        } else {
          document.getElementById("autocompleterTags-"+name).classList.add('error')
        }

        return {
          numSelected: values.length,
          values: values,
          userInput: '',
          filteredSuggestions: suggestions,
          showSuggestions: true,
        }

      })

    }
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions, showSuggestions, userInput } = this.state;
    const { suggestions, multiple, required, showCheckbox, finMultiOptions, handleChange, handleTabPress, idValue, name, valueToShow, isLastChild } = this.props;
    const hasMultipleAttributes = this.checkMultipleAttributes();

    // User pressed the enter key
    if (e.keyCode === 13) {
      e.preventDefault();

      if (multiple) {
        this.setState(prevState => {
          const { activeSuggestion, showSuggestions } = prevState

          if (activeSuggestion !== -1) {

            const [ ...values ] = prevState.values
          //  const value = options[focusedValue].value

            let value

            if (filteredSuggestions.length === 0) {
              value = userInput;
            } else {
              value = hasMultipleAttributes ? filteredSuggestions[activeSuggestion][valueToShow] : filteredSuggestions[activeSuggestion];
            }

            if (this.checkLetters(value) === false) {
              return
            }

            const index = values.indexOf(value)

            if (index === -1) {
              values.push(value)
            } else {
              values.splice(index, 1)
            }

          //  handleChange(values)

            if(!required || required && value != null) {
              document.getElementById("autocompleterTags-"+name).classList.remove('error')
            } else {
              document.getElementById("autocompleterTags-"+name).classList.add('error')
            }
            return {
              values: values,
              numSelected: values.length,
              userInput: '',
              filteredSuggestions: suggestions,
              showSuggestions: true,
            }
          } else {
            return {
              showSuggestions: !showSuggestions
            }
          }
        })

      } else if (filteredSuggestions.length) {
        const isntValueToShow = valueToShow == undefined
        this.setState({
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: isntValueToShow ? filteredSuggestions[activeSuggestion] : filteredSuggestions[activeSuggestion][valueToShow]
        })
        const isValid = this.checkUserInputExists(isntValueToShow ? filteredSuggestions[activeSuggestion] : filteredSuggestions[activeSuggestion][valueToShow]);
        valueToShow == undefined ? handleChange(filteredSuggestions[activeSuggestion], isValid) : handleChange(filteredSuggestions[activeSuggestion][idValue], isValid);
      } else {
        return;
      }
    }

    // User pressed the tab key
    if (e.keyCode === 9) {
      console.log("on tab triggered")
      if (this.state.showSuggestions === false) {
        return;
      } else if (multiple) {
        this.setState(prevState => {
          const { activeSuggestion } = prevState

          if (activeSuggestion !== -1) {

            const [ ...values ] = prevState.values

            let value

            if (filteredSuggestions.length === 0) {
              value = userInput;
            } else {
              value = hasMultipleAttributes ? filteredSuggestions[activeSuggestion][valueToShow] : filteredSuggestions[activeSuggestion];
            }

            if (this.checkLetters(value) === false) {
              return
            }

            const index = values.indexOf(value)

            if (index === -1) {
              values.push(value)
            }

        //    handleChange(values)

            if(!required || required && value != null) {
              document.getElementById("autocompleterTags-"+name).classList.remove('error')
            } else {
              document.getElementById("autocompleterTags-"+name).classList.add('error')
            }
            return {
              values: values,
              numSelected: values.length,
              userInput: '',
              showSuggestions: true,
              filteredSuggestions: suggestions,
            }
          }
        })

      } else {
        const isntValueToShow = valueToShow == undefined
        this.setState({
  //        activeSuggestion: 0,
          showSuggestions: false,
          userInput: isntValueToShow ? filteredSuggestions[activeSuggestion] : filteredSuggestions[activeSuggestion][valueToShow]
        });
        const isValid = this.checkUserInputExists(isntValueToShow ? filteredSuggestions[activeSuggestion] : filteredSuggestions[activeSuggestion][valueToShow]);
        valueToShow == undefined ? handleChange(filteredSuggestions[activeSuggestion], isValid) : handleChange(filteredSuggestions[activeSuggestion][idValue], isValid);
        if (handleTabPress) {
          handleTabPress(true);
        }
      }
    }

    // User pressed the escape key
    else if (e.keyCode === 27) {
      if (showSuggestions) {
        this.setState({
          showSuggestions: false,
          activeSuggestion: -1
        })
      }
    }

    // User pressed the up arrow
    else if (e.keyCode === 38) {
      e.preventDefault();
      if (activeSuggestion === 0 || activeSuggestion === -1) {
        const parent = document.getElementById("autocompleter-items-"+name);
        const item = document.getElementsByClassName("autocompleter-item");
        parent.scrollTop = parent.scrollHeight - (item[0].offsetHeight * 5)
        this.setState({ activeSuggestion: filteredSuggestions.length - 1 });
      } else {
        this.handleMoveUp();
        this.setState({ activeSuggestion: activeSuggestion - 1 });
      }
    }

    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        const parent = document.getElementById("autocompleter-items-"+name);
        parent.scrollTop = 0;
        this.setState({ activeSuggestion: 0 });
      } else {
        this.handleMoveDown();
        this.setState({ activeSuggestion: activeSuggestion + 1 });
      }
    }
  };

  handleMoveUp = () => {
    const {name} = this.props;
    const { activeSuggestion, filteredSuggestions } = this.state;
    const parent = document.getElementById("autocompleter-items-"+name);
    const item = document.getElementsByClassName("autocompleter-item");
    if (activeSuggestion < (filteredSuggestions.length - 4)) {
      parent.scrollTop -= item[0].offsetHeight
    }
  }

  handleMoveDown = () => {
    const {name} = this.props;
    const { activeSuggestion } = this.state;
    const parent = document.getElementById("autocompleter-items-"+name);
    const item = document.getElementsByClassName("autocompleter-item");
    // i.e. 4 = 5th box
    if (activeSuggestion >= 4) {
      parent.scrollTop += item[0].offsetHeight
    }
  }

  heightCalc = () => {
    const {suggestions, name, showCheckbox} = this.props

    let containerHeight = 0;

    const length = suggestions.length
    // Makes container the height of the first 5 items
    for (var i = 0; i < Math.min(6, length); i++) {
      if (showCheckbox === true) {
        containerHeight += 32
      } else {
        containerHeight += 40
      }
    }

    document.getElementById("autocompleter-items-"+name).style.maxHeight = containerHeight + "px";
  }

  checkLetters(inputToCheck) {
   var letters = /[A-Za-z]/g;
   if(inputToCheck.match(letters)) {
     return true;
   } else {
     return false;
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

  renderValues() {
    const { placeholder, multiple, showCheckbox, showValues, suggestions } = this.props
    const { values, numSelected, showSuggestions } = this.state

    if (multiple && showValues) {
      return values.map((value, index) => {

        return (
          <span
            key={value}
            onClick={this.stopPropagation}
            className="multiple value"
            id={value}
          >
            {value}
            <span
              data-value={value}
              onClick={this.onDeleteOption}
              className="delete"
            >
              <X />
            </span>
          </span>
        )
      })
    }

    if (showCheckbox === true) {

      const allSelected = values.length === (suggestions.length);

      return (
        <span className="multiple numChecked">
          <span
            className="tickNumSelected"
          >
            <Check />
          </span>
          {allSelected === true ? (
            <span>All</span>
          ) : (
            <span>{numSelected} selected</span>
          )}
        </span>
      )
    }
  }

  renderSuggestions() {
    const { onChange, onClickOption, onMouseDown, onKeyDown } = this;
    const { name, detailToShow, placeholder, multiple, handleChange, idValue, required, showDetail, suggestions, showCheckbox, valueToShow, children } = this.props;
    const { activeSuggestion, filteredSuggestions, showSuggestions, userInput, numSelected, values} = this.state;

    if (!showSuggestions) {
      return;
    }
    if (userInput === '' && !multiple) {
      return;
    }

    if (filteredSuggestions.length) {
      return (
        <div
          className={"autocompleter-items " + (showDetail===true ? ' showDetail' : ' noDetail')}
          id={"autocompleter-items-"+name}
        >
          {filteredSuggestions.map((suggestion, index) => {
            const hasMultipleAttributes = this.checkMultipleAttributes();
            const value = hasMultipleAttributes === true ? suggestion[valueToShow] : suggestion;
            const selected = values.includes(value)

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

            if (showCheckbox === true) {
              className += " showCheckbox"
            }

            if (selected) {
              if (multiple) {

                //added
                if (showCheckbox === true) {
                  className += " selectedCheckbox"

                } else {
                  className += " selectedMultiple"
                }
              } else {
                className += " selected"
              }
            }

            if (index === suggestions.length) className += " lastItem"

            const suggestionText = valueToShow == undefined ? suggestion : suggestion[valueToShow];
            const key = valueToShow == undefined ? suggestion : suggestion[idValue];
            const detail = detailToShow == undefined ? '' : suggestion[detailToShow];
            return (
              <div
                className={className}
                key={key}
                onClick={onClickOption}
                onMouseDown={onMouseDown}
                data-id={key}
                data-text={suggestionText}
                data-target={dataTarget}
              >
                {(multiple && showCheckbox === true) && (
                    <span className="checkbox">
                      { selected ? <Check /> : null }
                    </span>
                  )
                }
                <span className={(showCheckbox === true) ? "checkboxText" : ""}>
                  {suggestionText}
                </span>
                {showDetail===true && (
                  <div className="autocompleter-item-detail">
                    {detail}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )
    } else if (filteredSuggestions.length === 0) {
      const value = userInput;
      const containLetters = this.checkLetters(value)
    //  const selected = values.includes(value)
      const suggestionText = userInput;
      const key = userInput;

      let className;
      let dataTarget;

      // Flag the active suggestion with a class
      className = "autocompleter-active lastItem" + (showDetail===true ? ' showDetail overflow-ellipsis' : ' noDetail');
      dataTarget = "autoCompleteItem";

      if (!containLetters) {
        className += " error"
  //      document.getElementById("autocompleterTags-"+name).classList.add('error')
  //    } else {
  //      document.getElementById("autocompleterTags-"+name).classList.remove('error')
      }

      return (
        <div
          className={"autocompleter-items " + (showDetail===true ? ' showDetail' : ' noDetail')}
          id={"autocompleter-items-"+name}
        >
          <div
            className={className}
            key={key}
            onClick={onClickOption}
            onMouseDown={onMouseDown}
            data-id={key}
            data-text={suggestionText}
            data-target={dataTarget}
          >
            {'Add \''+userInput+'\''}
          </div>
        </div>
      )
    }
  }

  render() {
    const { placeholder, placeholderOnClick, required, name } = this.props;
    const { showSuggestions, userInput, values } = this.state;
    const showClickPlaceholder = showSuggestions === true && placeholderOnClick && values.length === 0

    return (
      <React.Fragment>
        <div
          className="form-control-std role autocompleterTags"
          id={"autocompleterTags-"+name}
          onClick={this.focusOnInput}
        >
          <div className="tagsContainer " id="selectContainer">
            { this.renderValues() }
          </div>
          <div className="autocompleterTags-search">
            <input
              tabIndex="0"
              type="text"
              name={name}
              className={showClickPlaceholder === true ? "placeholderOnClick" : ""}
              id={"autocompleteBox-"+name}
              placeholder={showClickPlaceholder === true ? placeholderOnClick : placeholder}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onKeyDown={this.onKeyDown}
              value={userInput}
              onBlur={this.onBlur}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
            />
          </div>
          <span className="arrow" id="selectArrow">
            { showSuggestions ? <ChevronUp /> : <ChevronDown /> }
          </span>
          { this.renderSuggestions() }
        </div>
      </React.Fragment>
    );
  }
}

export default AutocompleteNEW;
