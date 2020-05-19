// Dex last merged this code on 26th April 2020

import React from "react";
import ReactDOM from "react-dom";
import '../css/General.css';
import '../css/Select.css';

// USE THESE TO STYLE:
// https://www.w3schools.com/howto/howto_custom_select.asp
// https://codepen.io/jbierly/pen/YyNjqw
// https://codepen.io/kevinptt/pen/GqXZRL
// https://codepen.io/uixcrazy/pen/qqjBzv?editors=0110
// https://codepen.io/ayanna/pen/ObLowr
// MAIN ONE https://codepen.io/CrocoDillon/pen/MpMoZe?editors=0110

class SelectBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      values: [],
      focusedValue: -1,
      isFocused: false,
      isOpen: false,
      numSelected: 0
  //    elementIdFocused: ''
    };
  }

  componentDidMount(){
    const { focusOnLoad, handleTabPress, name } = this.props;
    if (focusOnLoad) {
      document.getElementById("selectBox-"+name).focus();
    }
    handleTabPress(false);
  }

  onFocus = (e) => {
    const { handleFocus } = this.props;
    if (handleFocus) {
      handleFocus(document.activeElement.id)
    }
    this.setState({
      isFocused: true,
//      elementIdFocused: document.activeElement.id
    })
  }

  onBlur = (e) => {
    console.log("on blur triggered")
    const { options, multiple, valueToShow, name, required, otherValidityChecks, finMultiOptions, handleChange } = this.props

    const hasMultipleAttributes = this.checkMultipleAttributes();

    this.setState(prevState => {
      const { values } = prevState
      if (multiple) {

        if (values.length != 0) {
          finMultiOptions()
        }
        handleChange(values)

        if(!required || required && values[0] != null) {
          document.getElementById("selectBox-"+name).classList.remove('error')
          if (otherValidityChecks) {
            otherValidityChecks()
          }
        } else {
          document.getElementById("selectBox-"+name).classList.add('error')
        }

        return {
          focusedValue: -1,
          isFocused: false,
          isOpen: false,
        }
      } else {
        const value = values[0];
        let focusedValue = -1

        if (value) {
          focusedValue = options.findIndex(option => (hasMultipleAttributes ? option[valueToShow] : option.value) === value)
        }

        if(!required || required && value != null) {
          document.getElementById("selectBox-"+name).classList.remove('error')
          if (otherValidityChecks) {
            otherValidityChecks()
          }
        } else {
          document.getElementById("selectBox-"+name).classList.add('error')
        }

        return {
          focusedValue,
          isFocused: false,
          isOpen: false,
        }
      }
    })
  }

  onClick = (e) => {
    console.log("onclick gets triggered")

    if (e.target.dataset.id != undefined && e.target.dataset.id.indexOf("title") != -1) {
      return
    }
    const { handleFocus, multiple, finMultiOptions, options, showCheckbox } = this.props;
    const { values } = this.state;
    const currentState = this.state.isOpen;

    if (currentState === false) {
      if (handleFocus) {
        handleFocus(document.activeElement.id);
      }
    }

    if (multiple && currentState != true) {
      if (values.length === (options.length - this.countTitles()) && showCheckbox != true) {
        return;
      }
    }

    if (multiple && currentState === true && e.target.nodeName != 'path' && e.target.id != 'chevronUp' && e.target.id != "selectArrow" && e.target.id != 'select-placeholder' && e.target.id != 'selectContainer' && e.target.id.indexOf("selectBox") != 0) {
      //change so if multiple and is open and clicked on box (not item) then close
      return;
    }

    if (multiple && currentState === true && values.length != 0) {
      finMultiOptions()
    }

    this.setState({
      isOpen: !currentState,
//      elementIdFocused: document.activeElement.id
    })
  };

  onDeleteOption = (e) => {
    const {required, otherValidityChecks, name, handleChange} = this.props;
    const {value} = e.currentTarget.dataset

    this.setState(prevState => {
      const [...values] = prevState.values
      const index = values.indexOf(value)

      values.splice(index, 1)

      handleChange(values)

      if ([...values].length === 0) {
        if(!required) {
          document.getElementById("selectBox-"+name).classList.remove('error')
    //      document.getElementById("selectBox-"+name).focus()
          if (otherValidityChecks) {
            otherValidityChecks()
          }
        } else {
          document.getElementById("selectBox-"+name).classList.add('error')
    //      document.getElementById("selectBox-"+name).focus()
        }
      }

      return {
        values,
        numSelected: values.length,
      }
    })
  }

  onClickOption = (e) => {
    const { options, name, required, multiple, handleChange, valueToShow, showCheckbox, otherValidityChecks, finMultiOptions } = this.props;
  //  const {elementIdFocused} = this.state;

    if (e.currentTarget.dataset.id.indexOf("title") != -1) {
      return
    }

    const hasMultipleAttributes = this.checkMultipleAttributes();
    const value = e.currentTarget.dataset.text;
    const index = options.findIndex(option => (hasMultipleAttributes ? option[valueToShow] : option.value) === value)

    if (!multiple) {
      handleChange(e.currentTarget.dataset.id);
    }

    this.setState(prevState => {

      if (otherValidityChecks) {
        otherValidityChecks();
      }

      if (!multiple) {

        return {
          values: [ value ],
          focusedValue: index,
          isOpen: false
        }
      }

      const [ ...values ] = prevState.values
      const index = values.indexOf(value)

      if (index === -1) {
        values.push(value)
      } else {
        values.splice(index, 1)
      }

      handleChange(values)

      if (values.length === (options.length - this.countTitles())) {
        finMultiOptions()
        if(!required || required && value != null) {
          document.getElementById("selectBox-"+name).classList.remove('error')
          if (otherValidityChecks) {
            otherValidityChecks()
          }
        } else {
          document.getElementById("selectBox-"+name).classList.add('error')
        }
        return {
          numSelected: values.length,
          values: values,
          isOpen: false
        }

      } else {
        if(!required || required && value != null) {
          document.getElementById("selectBox-"+name).classList.remove('error')
          if (otherValidityChecks) {
            otherValidityChecks()
          }
        } else {
          document.getElementById("selectBox-"+name).classList.add('error')
        }

        return {
          numSelected: values.length,
          values: values,
          isOpen: true
        }
      }

    });
  }

  onKeyDown = e => {
    const { isOpen, focusedValue, isFocused } = this.state;
    const { handleChange, handleTabPress, options, multiple, finMultiOptions, required, name, showCheckbox, valueToShow, otherValidityChecks } = this.props;
    const hasMultipleAttributes = this.checkMultipleAttributes();

    // User pressed the enter key
    if (e.keyCode === 13) {
      e.preventDefault();

      this.setState(prevState => {
        let { focusedValue } = prevState

        if (!isOpen) {

          if (multiple) {
            if (prevState.values.length === (options.length - this.countTitles()) && showCheckbox != true) {
              return;
            }
          }

          return {
            isOpen: true
          }
        } else {

          if (multiple) {
            this.setState(prevState => {
              const { focusedValue } = prevState

              if (focusedValue !== -1) {
                const isSectionTitle = options[focusedValue]["isTitle"] === true;

                if (isSectionTitle) {
                  return
                }

                const [ ...values ] = prevState.values
              //  const value = options[focusedValue].value
                const value = hasMultipleAttributes ? options[focusedValue][valueToShow] : options[focusedValue];
                const index = values.indexOf(value)

                if (index === -1) {
                  values.push(value)
                } else {
                  values.splice(index, 1)
                }
                const noMoreOptions = (values.length === (options.length - this.countTitles())) && showCheckbox != true

                if (noMoreOptions) {
                  finMultiOptions()
                  if(!required || required && value != null) {
                    document.getElementById("selectBox-"+name).classList.remove('error')
                    if (otherValidityChecks) {
                      otherValidityChecks()
                    }
                  } else {
                    document.getElementById("selectBox-"+name).classList.add('error')
                  }
                  return {
                    values: values,
                    numSelected: values.length,
                    isOpen: false
                  }
                }

                if(!required || required && value != null) {
                  document.getElementById("selectBox-"+name).classList.remove('error')
                  if (otherValidityChecks) {
                    otherValidityChecks()
                  }
                } else {
                  document.getElementById("selectBox-"+name).classList.add('error')
                }
                return {
                  values: values,
                  numSelected: values.length,
                  isOpen: true
                }
              } else {
                return {
                  isOpen: false
                }
              }
            })
          } else if (focusedValue != -1) {
        //    const value = hasMultipleAttributes ? options[focusedValue][valueToShow] : options[focusedValue];
            const isSectionTitle = options[focusedValue]["isTitle"] === true;

            if (isSectionTitle) {
              return
            }

            const value = hasMultipleAttributes ? options[focusedValue][valueToShow] : options[focusedValue];
            const index = options.findIndex(option => (hasMultipleAttributes ? option[valueToShow] : (valueToShow === undefined ? option : option.value)) === value);
            handleChange(hasMultipleAttributes ? options[focusedValue].value : options[focusedValue]);

            if (otherValidityChecks) {
              otherValidityChecks();
            }

            return {
              values: [ value ],
              focusedValue: index,
              isOpen: false,
            }
          }
        }
      })

    }

    // User pressed the tab key
    else if (e.keyCode === 9) {
      console.log("on tab")

      this.setState(prevState => {
        let { focusedValue } = prevState

        if (!isOpen) {
          return
        } else {
      //    e.preventDefault();
      //    const value = hasMultipleAttributes ? options[focusedValue][valueToShow] : options[focusedValue];

          if (multiple) {
            this.setState(prevState => {
              const { focusedValue } = prevState

              if (focusedValue !== -1) {
                const isSectionTitle = options[focusedValue]["isTitle"] === true;

                if (isSectionTitle) {
                  return
                }

                const [ ...values ] = prevState.values
                const value = hasMultipleAttributes ? options[focusedValue][valueToShow] : options[focusedValue];
                const index = values.indexOf(value)

                if (index === -1) {
                  values.push(value)
              //  } else {
            //      values.splice(index, 1)
                }

                if (values.length === (options.length - this.countTitles())) {
                  finMultiOptions()
                  if(!required || required && value != null) {
                    document.getElementById("selectBox-"+name).classList.remove('error')
                    if (otherValidityChecks) {
                      otherValidityChecks()
                    }
                  } else {
                    document.getElementById("selectBox-"+name).classList.add('error')
                  }
                  return {
                    values: values,
                    numSelected: values.length,
                    isOpen: false
                  }
                } else {
                  if(!required || required && value != null) {
                    document.getElementById("selectBox-"+name).classList.remove('error')
                    if (otherValidityChecks) {
                      otherValidityChecks()
                    }
                  } else {
                    document.getElementById("selectBox-"+name).classList.add('error')
                  }
                  return {
                    values: values,
                    numSelected: values.length,
                    isOpen: true
                  }
                }
              }
            })
          } else {
            const isSectionTitle = options[focusedValue]["isTitle"] === true;
            if (isSectionTitle) {
              return
            }
            const value = hasMultipleAttributes ? options[focusedValue][valueToShow] : options[focusedValue];
            const index = options.findIndex(option => (hasMultipleAttributes ? option[valueToShow] : (valueToShow === undefined ? option : option.value)) === value);
      //      const isValid = this.checkExists(hasMultipleAttributes ? options[focusedValue].value : options[focusedValue]);
            handleChange(hasMultipleAttributes ? options[focusedValue].value : options[focusedValue]);
            handleTabPress(true);
            return {
              values: [ value ],
              focusedValue: index,
              isOpen: false
            }
          }
        }
      })
    }

    // User pressed the escape key
    else if (e.keyCode === 27) {
      if (isOpen) {
//        e.preventDefault()
        this.setState({
          isOpen: false,
//          focusedValue: -1,
        })
      }
    }

    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (isOpen || (isFocused === true && focusedValue != -1)) {
        e.preventDefault();

        this.setState(prevState => {
          let { focusedValue } = prevState

          const elements = document.getElementsByClassName("multiple value")
          for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('focused')
          }

          if (focusedValue === 0 || focusedValue === -1) {

            const parent = document.getElementById("options-"+name);
            const item = parent.firstElementChild;
            parent.scrollTop = parent.scrollHeight - (item.offsetHeight * 5)

            focusedValue = options.length - 1

            const value = hasMultipleAttributes ? options[focusedValue][valueToShow] : options[focusedValue];

            if (otherValidityChecks) {
              otherValidityChecks();
            }

            if (!isOpen) {
              handleChange(hasMultipleAttributes ? options[focusedValue].value : options[focusedValue]);
            }

            if (multiple) {
              const values = prevState.values;
              const focusedSelectedValue = values.indexOf(value)

              if (focusedSelectedValue != -1 && showCheckbox != true) {
                document.getElementById(values[focusedSelectedValue]).classList.add('focused')
              }

              return {
                focusedValue
              }
            } else {
              return {
                values: [ value ],
                focusedValue
              }
            }
          } else if (focusedValue > 0) {
            this.handleMoveUp();

            focusedValue--

            const value = hasMultipleAttributes ? options[focusedValue][valueToShow] : options[focusedValue];

            if (!isOpen) {
              handleChange(hasMultipleAttributes ? options[focusedValue].value : options[focusedValue]);
            }

            if (otherValidityChecks) {
              otherValidityChecks();
            }

            if (multiple) {
              const values = prevState.values;
              const focusedSelectedValue = values.indexOf(value)

              if (focusedSelectedValue != -1 && showCheckbox != true) {
                document.getElementById(values[focusedSelectedValue]).classList.add('focused')
              }

              /*if (focusedSelectedValue != -1) {
                document.getElementById(values[focusedSelectedValue]).classList.add('focused')
              }*/
              return {
                focusedValue
              }
            } else {
              return {
                values: [ value ],
                focusedValue
              }
            }
          }
        })
      } else {
        e.preventDefault();
      }
    }

    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (isOpen || (isFocused === true && focusedValue != -1)) {
        e.preventDefault()

        this.setState(prevState => {
          let { focusedValue } = prevState

          const elements = document.getElementsByClassName("multiple value")
          for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('focused')
          }

          if (focusedValue === options.length -1) {
            const parent = document.getElementById("options-"+name);
            parent.scrollTop = 0;

            focusedValue = 0

            const value = hasMultipleAttributes ? options[focusedValue][valueToShow] : options[focusedValue];

            if (otherValidityChecks) {
              otherValidityChecks();
            }

            if (!isOpen) {
              handleChange(hasMultipleAttributes ? options[focusedValue].value : options[focusedValue]);
            }

            if (multiple) {
              const values = prevState.values;
              const focusedSelectedValue = values.indexOf(value)


              if (focusedSelectedValue != -1 && showCheckbox != true) {
                document.getElementById(values[focusedSelectedValue]).classList.add('focused')
              }

              return {
                focusedValue
              }
            } else {
              return {
                values: [ value ],
                focusedValue
              }
            }

          } else {
            this.handleMoveDown();

            focusedValue++

            const value = hasMultipleAttributes ? options[focusedValue][valueToShow] : options[focusedValue];

            if (otherValidityChecks) {
              otherValidityChecks();
            }

            if (!isOpen) {
              handleChange(hasMultipleAttributes ? options[focusedValue].value : options[focusedValue]);
            }

            if (multiple) {
              const values = prevState.values;
              const focusedSelectedValue = values.indexOf(value)

              if (focusedSelectedValue != -1 && showCheckbox != true) {
                document.getElementById(values[focusedSelectedValue]).classList.add('focused')
              }

              return {
                focusedValue
              }
            } else {
              return {
                values: [ value ],
                focusedValue
              }
            }
          }
        })
      } else {
        e.preventDefault();
      }
    }

  };

  stopPropagation = (e) => {
    e.stopPropagation()
  }

  handleMoveUp = () => {
    const { focusedValue } = this.state;
    const { options, name } = this.props;
    const parent = document.getElementById("options-"+name);
    const item = parent.firstElementChild;
    if (focusedValue < (options.length - 4)) {
      parent.scrollTop -= item.offsetHeight
    }
  }

  handleMoveDown = () => {
    const { focusedValue } = this.state;
    const { name } = this.props;
    const parent = document.getElementById("options-"+name);
    const item = parent.firstElementChild;
    // i.e. 4 = 5th box
    if (focusedValue >= 4) {
      parent.scrollTop += item.offsetHeight
    }
  }

  countTitles = () => {
    const {options} = this.props

    const titleCount = options
      .filter(option => option["isTitle"] === true)
      .length

    return titleCount
  }

  checkExists(inputToCheck) {
    const { options, required, valueToShow } = this.props;
    const hasMultipleAttributes = this.checkMultipleAttributes();
    const isValid = inputToCheck ? (options.findIndex(option => (hasMultipleAttributes ? option.value : (valueToShow === undefined ? option : option[valueToShow])) === inputToCheck) != -1) : (required ? false : true);
    return isValid;
  }

  checkUserInputExists(inputToCheck) {
    const { options, required, valueToShow } = this.props;
    const hasMultipleAttributes = this.checkMultipleAttributes();
    const isValid = inputToCheck ? (options.findIndex(option => (hasMultipleAttributes ? option[valueToShow] : (valueToShow === undefined ? option : option.value)) === inputToCheck) != -1) : (required ? false : true);
    return isValid;
  }

  checkMultipleAttributes() {
    const { options } = this.props;
    if (options[0].value != undefined || options[0].value != null) {
      return true
    } else {
      return false
    }
  }

  renderValues() {
    const { placeholder, multiple, showCheckbox, options } = this.props
    const { values, numSelected } = this.state

    if (values.length === 0) {
      return (
        <div className="select-placeholder" id="select-placeholder">
          { placeholder }
        </div>
      )
    }

    if (multiple && showCheckbox != true) {
      return values.map((value, index) => {

        return (
          <span
            key={value}
            onClick={this.stopPropagation}
            className="multiple value"
        //    id={index}
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

      const allSelected = values.length === (options.length - this.countTitles());

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
    return (
      <div className="value overflow-ellipsis">
        { values[0] }
      </div>
    )
  }

  renderOptions() {
    const { options, multiple, valueToShow, showDetail, showIcon, showCheckbox, detailToShow, iconToShow, name } = this.props
    const { isOpen, values, focusedValue } = this.state;

    if (!isOpen) {
      return;
    }

    return (
      <div className={showDetail===true ? 'options showDetail' : 'options noDetail'} id={'options-'+name}>
        {options.map((option, index) => {
          const hasMultipleAttributes = this.checkMultipleAttributes();
          const value = hasMultipleAttributes === true ? option[valueToShow] : option;
          const detail = detailToShow == undefined ? '' :  option[detailToShow];
          const icon = iconToShow == undefined ? '' :  option[iconToShow];
          const isSectionTitle = option["isTitle"] === true;
          const selected = values.includes(value)

          let className = "option"

          if (isSectionTitle) {
            className += " title"

          //added
          } else if (showCheckbox === true) {
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
          if (index === focusedValue) className += " focused"
          if (showDetail===true) {
            className += " showDetail overflow-ellipsis"
          } else {
            className += " noDetail overflow-ellipsis"
          }
          if (showIcon===true && option["icon"] != null) {
            className += " showIcon"
          }

          if (option[detailToShow] === "") className += " extraTop"
          if (index === options.length) className += " lastItem"

          return (
            <div
              key={value}
              data-id={hasMultipleAttributes === true ? (isSectionTitle ? ('title-'+ value) : option.value) : option}
              data-text={value}
              className={className}
        //      onFocus={this.onHoverOption} // placeholder as was erroring without this
        //      onMouseOver={this.onHoverOption}
              onClick={this.onClickOption}
            >
              {(showIcon===true && option["icon"] != null) && (
                <div className={"option-iconContainer " + (showDetail===true ? "showDetail": "noDetail")}>
                  <img alt="option icon" src={icon} />
                </div>
              )}
              { (multiple && showCheckbox === true && isSectionTitle != true) && (
                  <span className="checkbox">
                    { selected ? <Check /> : null }
                  </span>
                )
              }
              <span className={(showCheckbox === true && isSectionTitle != true) ? "checkboxText" : ""}>
                {value}
              </span>
              {showDetail===true && (
                <div className="option-detail overflow-ellipsis" >
                  {detail}
                </div>
              )}
            </div>
          );
        })}
      </div>
    )
  }

  render() {
    const { handleChange, required, name } = this.props;
    const { isOpen, isFocused } = this.state;

    return (
      <React.Fragment>
        <div
          tabIndex="0"
          className="select form-control-std"
          id={"selectBox-"+name}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
          required={required}
          onClick={this.onClick}
        >
          <div className="selectContainer " id="selectContainer">
            { this.renderValues() }
            <span className="arrow" id="selectArrow">
              { isOpen ? <ChevronUp /> : <ChevronDown /> }
            </span>
          </div>
          { this.renderOptions() }
        </div>
      </React.Fragment>
    );
  }
}

const ChevronDown = () => (
  <svg viewBox="0 0 10 7" id="chevronDown">
    <path d="M2.08578644,6.5 C1.69526215,6.89052429 1.69526215,7.52368927 2.08578644,7.91421356 C2.47631073,8.30473785 3.10947571,8.30473785 3.5,7.91421356 L8.20710678,3.20710678 L3.5,-1.5 C3.10947571,-1.89052429 2.47631073,-1.89052429 2.08578644,-1.5 C1.69526215,-1.10947571 1.69526215,-0.476310729 2.08578644,-0.0857864376 L5.37867966,3.20710678 L2.08578644,6.5 Z" transform="translate(5.000000, 3.207107) rotate(90.000000) translate(-5.000000, -3.207107) " />
  </svg>
)

const ChevronUp = () => (
  <svg viewBox="0 0 10 8" id="chevronUp">
    <path d="M2.08578644,7.29289322 C1.69526215,7.68341751 1.69526215,8.31658249 2.08578644,8.70710678 C2.47631073,9.09763107 3.10947571,9.09763107 3.5,8.70710678 L8.20710678,4 L3.5,-0.707106781 C3.10947571,-1.09763107 2.47631073,-1.09763107 2.08578644,-0.707106781 C1.69526215,-0.316582489 1.69526215,0.316582489 2.08578644,0.707106781 L5.37867966,4 L2.08578644,7.29289322 Z" transform="translate(5.000000, 4.000000) rotate(-90.000000) translate(-5.000000, -4.000000) " />
  </svg>
)

const X = () => (
  <svg viewBox="0 0 16 16">
    <path d="M2 .594l-1.406 1.406.688.719 5.281 5.281-5.281 5.281-.688.719 1.406 1.406.719-.688 5.281-5.281 5.281 5.281.719.688 1.406-1.406-.688-.719-5.281-5.281 5.281-5.281.688-.719-1.406-1.406-.719.688-5.281 5.281-5.281-5.281-.719-.688z" />
  </svg>
)

const Check = () => (
  <svg viewBox="0 0 16 16">
    <path d="M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z" transform="translate(0 1)" />
  </svg>
)

export default SelectBox;
