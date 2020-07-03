// Dex last merged this code on 30th June 2020

import React from "react";
import ReactDOM from "react-dom";
import '../css/Autocomplete.css';
import {ChevronDown, ChevronUp, X, Check} from './GeneralFunctions.js';

class AutocompleteTagsMulti extends React.Component {
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
    e.persist()
    const { suggestions, onBlur, valueToShow, required, handleChange, name, finMultiOptions, noSuggestionsCTAclass } = this.props;
    const {userInput} = this.state
    if (noSuggestionsCTAclass && e.relatedTarget != null && e.relatedTarget.className === noSuggestionsCTAclass) {
      return;
    } else {
      const hasMultipleAttributes = this.checkMultipleAttributes();

      if (onBlur) {
        onBlur()
      }

      if (userInput != '') {
        this.setState(prevState => {
          const [ ...values ] = prevState.values
          const index = values.indexOf(userInput)

          if (index === -1) {
            values.push(userInput)
          }

          return {
            numSelected: values.length,
            values: values,
            userInput: '',
          }
        }, () => {
          const {values} = this.state
          handleChange(values, () => {
            if (this.state.values.length != 0) {
              if (finMultiOptions) {
                finMultiOptions()
              }
            }
          })
          const isValid = required ? values.length > 0 : true;

          if(isValid) {
            document.getElementById("autocompleterTags-"+name).classList.remove('error');
          } else {
            document.getElementById("autocompleterTags-"+name).classList.add('error');
          }
        })
      } else {
        const values = this.state.values;

        handleChange(values, () => {
          if (values.length != 0) {
            if (finMultiOptions) {
              finMultiOptions()
            }
          }
        })

        const isValid = required ? values.length > 0 : true;

        if(isValid) {
          document.getElementById("autocompleterTags-"+name).classList.remove('error');
        } else {
          document.getElementById("autocompleterTags-"+name).classList.add('error');
        }
      }

      if (this.state.values.length > 2) {
        const inputBox = document.getElementById("autocompleteBox-"+name)
        inputBox.style.display = 'block';
    //    inputBox.style.display = 'none';
        inputBox.style.height = '0';
        inputBox.style.opacity = '0';
      }
  //    const isDeletingOption = e.target.className === "autocompleterTags-search"
  //    this.setState(prevState => {
    //    return {
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        //  showSuggestions: isDeletingOption ? prevState.showSuggestions : false,
  //      }
      })
    }
  }

  onFocus = (e) => {
    const {filteredSuggestions, userInput, values} = this.state;
    const {onFocus} = this.props;

    if (onFocus) {
      onFocus()
    }

    if (userInput != "" && this.checkUserInputExists(userInput)) {
      return
    } else {
      this.focusOnInput();
      this.onChange(e);
    }
  }

  focusOnInput = () => {
    const {name} = this.props
    const inputBox = document.getElementById("autocompleteBox-"+name)
    inputBox.style.display = 'inline-block';
    inputBox.style.height = 'unset';
    inputBox.style.opacity = 'unset';
    document.getElementById("autocompleteBox-"+name).focus();
  }

  widthCalc = (selectedOption) => {
    const {userInput, values, showSuggestions, numSelected} = this.state
    const {placeholderOnClick} = this.props

    let containerwidth;
    const input = document.getElementById('autocompleteBox-selectRole')

    if (userInput === '') {
      if (placeholderOnClick && values.length === 0 && selectedOption != true) {
        containerwidth = 250 + "px"
      } else {
        containerwidth = 110 + "px"
      }

    } else {
      containerwidth = (userInput.length +1) + "ch"
    }

    input.style.width = containerwidth;
  }

  onChange = (e) => {
    const { suggestions, handleChange, valueToShow, required, showCheckbox, openOnClick } = this.props;
    const userInput = e.currentTarget.value;

    this.widthCalc()
    // set width of input box to size f userInput
    const hasMultipleAttributes = this.checkMultipleAttributes();

    function filteredSuggestions() {

      let filteredSuggestions;

      if (userInput === '' && openOnClick) {
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
      showSuggestions: (openOnClick || userInput != "") ? true : false,
      userInput: e.currentTarget.value
    }, () => {
      if (this.state.showSuggestions === true && showCheckbox === true) {
        this.heightCalc()
      }
    });
    if (openOnClick && userInput === '') {
      return
    }
  };

  onClickValue = (e) => {
    e.stopPropagation()
    const {showSuggestions} = this.state
    if (showSuggestions === true) {
      return
    } else {
      this.focusOnInput();
    }
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
        const inputBox = document.getElementById("autocompleteBox-"+name)
        inputBox.style.display = 'inline-block';
        inputBox.style.height = 'unset';
        inputBox.style.opacity = 'unset';
        if(!required) {
          document.getElementById("autocompleterTags-"+name).classList.remove('error')
        } else {
          document.getElementById("autocompleterTags-"+name).classList.add('error')
        }
      }

      return {
        values,
        numSelected: values.length,
        showSuggestions: prevState.showSuggestions
      }
    }, () => {
      if (this.state.values.length === 0) {
        this.widthCalc()
      } else {
        this.widthCalc(true)
      }
    })
  }

  onClickOption = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.persist()
    const { suggestions, handleChange, name, valueToShow, required } = this.props;
    const value = e.currentTarget.dataset.text;

    if (this.checkLetters(value) === false) {
      return
    }

    this.setState(prevState => {
      const [ ...values ] = prevState.values
      const index = values.indexOf(value)

  //    if (values.length === 0) {
  //      this.widthCalc()
  //    }

      if (index === -1) {
        values.push(value)
      } else {
        values.splice(index, 1)
      }

      if(!required || required && value != null) {
        document.getElementById("autocompleterTags-"+name).classList.remove('error')
      } else {
        document.getElementById("autocompleterTags-"+name).classList.add('error')
      }

      return {
        numSelected: values.length,
        activeSuggestion: -1,
        values: values,
        userInput: '',
        filteredSuggestions: suggestions,
        showSuggestions: true,
      }
    }, () => {
      handleChange(this.state.values)
      this.focusOnInput()
      if (this.state.values.length === 0) {
        this.widthCalc()
        return
      } else {
        this.widthCalc(true)
      }
      if (e.target.classList.contains('addOwn')) {
        this.heightCalc()
      }
    })
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions, showSuggestions, userInput, numSelected } = this.state;
    const { suggestions, required, showCheckbox, handleChange, handleTabPress, idValue, name, valueToShow, finMultiOptions} = this.props;
    const hasMultipleAttributes = this.checkMultipleAttributes();

    // User pressed the enter key
    if (e.keyCode === 13) {
      e.preventDefault();
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
      }, () => {
        if (this.state.values.length === 0) {
          this.widthCalc()
          return
        } else {
          this.widthCalc(true)
        }
    //    if (filteredSuggestions.length != suggestions.length) {
      //  if (filteredSuggestions.length != 0 && this.state.showSuggestions === true) {
        if (this.state.showSuggestions === true) {
          this.heightCalc()
  //      } else if (finMultiOptions) {
    //      finMultiOptions()
        }
      })
    }

    // User pressed the tab key
    else if (e.keyCode === 9) {
      if (this.state.showSuggestions === false) {
        return;
      } else {

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

            handleChange(values)

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
        }, () => {
          this.widthCalc(true)
        })
      }
    }

    // User pressed backspace
    else if (e.keyCode === 8) {

      if (userInput === '') {

        this.setState(prevState => {
          const [ ...values ] = prevState.values

          const lastItem = values.length - 1

          values.splice(lastItem, 1)

          return {
            values: values,
            numSelected: values.length,
          }
        }, () => {
          this.widthCalc()
        })
      } else return
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
        parent.scrollTop = parent.scrollHeight - (item[0].offsetHeight * 6)
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
    if (activeSuggestion < (filteredSuggestions.length - 5)) {
      parent.scrollTop -= item[0].offsetHeight
    }
  }

  handleMoveDown = () => {
    const {name} = this.props;
    const { activeSuggestion } = this.state;
    const parent = document.getElementById("autocompleter-items-"+name);
    const item = document.getElementsByClassName("autocompleter-item");
    // i.e. 5 = 6th box
    if (activeSuggestion >= 5) {
      parent.scrollTop += item[0].offsetHeight
    }
  }

  heightCalc = () => {
    const {suggestions, name, showCheckbox, required} = this.props
    const {filteredSuggestions, values} = this.state

    let containerHeight = 0;

    const length = filteredSuggestions.length === 0 ? suggestions.length : filteredSuggestions.length
    // Makes container the height of the first 6 items
    for (var i = 0; i < Math.min(7, length); i++) {
      if (showCheckbox === true) {
        containerHeight += 32
      } else {
        containerHeight += 40
      }
    }
    document.getElementById("autocompleter-items-"+name).style.maxHeight = containerHeight + "px";
    if (filteredSuggestions.length != 0) {
      document.getElementById("autocompleter-doneContainer-"+name).style.maxHeight = containerHeight + "px";
      document.getElementById("autocompleter-doneContainer-"+name).style.top = (containerHeight += 10) + "px";
    }
    if (!required || (required && values.length > 0)) {
      if (filteredSuggestions.length === 0 || containerHeight === 40) {
        return
      } else if (filteredSuggestions.length === 1) {
        document.getElementById("doneTick-"+name).classList.add('solo')
      } else {
        document.getElementById("doneTick-"+name).classList.remove('solo')
      }
    }
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
    const { placeholder, showCheckbox, showValues, suggestions } = this.props
    const { values, numSelected, showSuggestions } = this.state

    if (showValues) {
      const numHidden = numSelected - 2
      const showNumHidden = values.length > 2

      let shortArray;
      //let arrayToMap;

      if (showSuggestions != true) {
        shortArray = values
          .slice(0,2)
      }

      const arrayToMap = showSuggestions != true ? shortArray : values

      return (
        <div className="tagsList">
          {arrayToMap.map((value, index) => {
            return (
              <span
                key={value}
            //    onClick={this.stopPropagation}
                onClick={this.onClickValue}
                className="multiple value"
                id={value}
              >
                {value}
                <span
                  data-value={value}
                  onMouseDown={this.onDeleteOption}
                  className="delete"
                >
                  <X />
                </span>
              </span>
            )
          })}
          {showSuggestions != true && showNumHidden === true && (
            <span className="multiple numHidden">
              <span>+ {numHidden} more</span>
            </span>
          )}
        </div>
      )
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
    const { name, detailToShow, placeholder, handleChange, idValue, required, showDetail, suggestions, showCheckbox, valueToShow, children } = this.props;
    const { activeSuggestion, filteredSuggestions, showSuggestions, userInput, numSelected, values} = this.state;

    if (!showSuggestions) {
      return;
    }

    if (filteredSuggestions.length) {
      return (
        <React.Fragment>
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
                className = "autocompleter-active" + (showDetail===true ? ' showDetail' : ' noDetail');
                dataTarget = "autoCompleteItem";
              } else {
                className="autocompleter-item" + (showDetail===true ? ' showDetail' : ' noDetail') + (index === filteredSuggestions.length ? 'lastItem' : "");
                dataTarget = "autoCompleteItem";
              }

              if (showCheckbox === true) {
                className += " showCheckbox"
              } else {
                className += " overflow-ellipsis"
              }

              if (selected) {
                //added
                if (showCheckbox === true) {
                  className += " selectedCheckbox"

                } else {
                  className += " selectedMultiple"
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
                  {(showCheckbox === true) && (
                      <span className="checkbox">
                        { selected ? <Check /> : null }
                      </span>
                    )
                  }
                  <span className={(showCheckbox === true) ? "checkboxText overflow-ellipsis" : ""}>
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
          <div className="autocompleter-doneContainer" id={"autocompleter-doneContainer-"+name}>
            {!required || (required && values.length > 0) && (
              <div
                onClick={this.focusOnInput}
              //  className={"doneTickSq-btn" + ((required === true && values.length === 0) ? " disabled" : "")}
                className="doneTickSq-btn"
                id={"doneTick-"+name}
              >
                <span
                  className="tickNumSelected"
                >
                  <Check />
                </span>
                Done
              </div>
            )}
          </div>
        </React.Fragment>
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
      className = "addOwn autocompleter-active lastItem overflow-ellipsis" + (showDetail===true ? ' showDetail' : ' noDetail');
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
          <input
            tabIndex="0"
            type="text"
            name={name}
            className={showClickPlaceholder === true ? "placeholderOnClick autocompleterTags-search" : "autocompleterTags-search"}
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
          <span className="arrow" id="selectArrow">
            { showSuggestions ? <ChevronUp /> : <ChevronDown /> }
          </span>
          { this.renderSuggestions() }
        </div>
      </React.Fragment>
    );
  }
}

export default AutocompleteTagsMulti;
