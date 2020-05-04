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
    const { options, valueToShow, name, required, otherValidityChecks } = this.props

    const hasMultipleAttributes = this.checkMultipleAttributes();

    this.setState(prevState => {
      const { values } = prevState
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
    })
  }

  onClick = (e) => {
    const { handleFocus } = this.props;
    const currentState = this.state.isOpen;

    if (currentState === false) {
      if (handleFocus) {
        handleFocus(document.activeElement.id);
      }
    }

    this.setState({
      isOpen: !currentState,
//      elementIdFocused: document.activeElement.id
    })
  };

/*  onHoverOption = (e) => {
    const { options, valueToShow } = this.props;
    const hasMultipleAttributes = (options[0].value != undefined) || (options[0].value != null);
    const value = hasMultipleAttributes ? e.currentTarget.dataset.text : e.currentTarget.dataset;
    const index = options.findIndex(option => (hasMultipleAttributes ? option[valueToShow] : option.value) === value);
    this.setState({
      focusedValue: index
    })
  }
*/
  onClickOption = (e) => {
    const { options, handleChange, valueToShow, otherValidityChecks } = this.props;
  //  const {elementIdFocused} = this.state;
    const hasMultipleAttributes = this.checkMultipleAttributes();
    const value = e.currentTarget.dataset.text;
    const index = options.findIndex(option => (hasMultipleAttributes ? option[valueToShow] : option.value) === value)


    handleChange(e.currentTarget.dataset.id);
    this.setState(prevState => {

      if (otherValidityChecks) {
        otherValidityChecks();
      }

      return {
        values: [ value ],
        focusedValue: index,
        isOpen: false
      }
    });
  }

  onKeyDown = e => {
    const { isOpen, focusedValue, isFocused } = this.state;
    const { handleChange, handleTabPress, options, name, valueToShow, otherValidityChecks } = this.props;
    const hasMultipleAttributes = this.checkMultipleAttributes();

    // User pressed the enter key
    if (e.keyCode === 13) {
      e.preventDefault();

      this.setState(prevState => {
        let { focusedValue } = prevState

        if (!isOpen) {
          return {
            isOpen: true
          }
        } else if (focusedValue != -1) {
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
      })
    /*  */
    }

    // User pressed the tab key
    else if (e.keyCode === 9) {
      this.setState(prevState => {
        let { focusedValue } = prevState

        if (!isOpen) {
          return
        } else {
      //    e.preventDefault();
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

            return {
              values: [ value ],
              focusedValue
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

            return {
              values: [ value ],
              focusedValue
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

            return {
              values: [ value ],
              focusedValue
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

            return {
              values: [ value ],
              focusedValue
            }
          }
        })
      } else {
        e.preventDefault();
      }
    }

  };

/*  stopPropagation = (e) => {
    e.stopPropagation()
  }
*/
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
    const { placeholder } = this.props
    const { values } = this.state

    if (values.length === 0) {
      return (
        <div className="select-placeholder">
          { placeholder }
        </div>
      )
    }

    return (
      <div className="value overflow-ellipsis">
        { values[0] }
      </div>
    )
  }

  renderOptions() {
    const { options, valueToShow, showDetail, detailToShow, name } = this.props
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
          const selected = values.includes(value)

          let className = "option"
          if (selected) className += " selected"
          if (index === focusedValue) className += " focused"
          if (showDetail===true) {
            className += " showDetail overflow-ellipsis"
          } else {
            className += " noDetail overflow-ellipsis"
          }

          if (option[detailToShow] === "") className += " extraTop"
          if (index === options.length) className += " lastItem"

          return (
            <div
              key={value}
              data-id={hasMultipleAttributes === true ? option.value : option}
              data-text={value}
              className={className}
        //      onFocus={this.onHoverOption} // placeholder as was erroring without this
        //      onMouseOver={this.onHoverOption}
              onClick={this.onClickOption}
            >
              {value}
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
          <div className="selectContainer">
            { this.renderValues() }
            <span className="arrow">
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
  <svg viewBox="0 0 10 7">
    <path d="M2.08578644,6.5 C1.69526215,6.89052429 1.69526215,7.52368927 2.08578644,7.91421356 C2.47631073,8.30473785 3.10947571,8.30473785 3.5,7.91421356 L8.20710678,3.20710678 L3.5,-1.5 C3.10947571,-1.89052429 2.47631073,-1.89052429 2.08578644,-1.5 C1.69526215,-1.10947571 1.69526215,-0.476310729 2.08578644,-0.0857864376 L5.37867966,3.20710678 L2.08578644,6.5 Z" transform="translate(5.000000, 3.207107) rotate(90.000000) translate(-5.000000, -3.207107) " />
  </svg>
)

const ChevronUp = () => (
  <svg viewBox="0 0 10 8">
    <path d="M2.08578644,7.29289322 C1.69526215,7.68341751 1.69526215,8.31658249 2.08578644,8.70710678 C2.47631073,9.09763107 3.10947571,9.09763107 3.5,8.70710678 L8.20710678,4 L3.5,-0.707106781 C3.10947571,-1.09763107 2.47631073,-1.09763107 2.08578644,-0.707106781 C1.69526215,-0.316582489 1.69526215,0.316582489 2.08578644,0.707106781 L5.37867966,4 L2.08578644,7.29289322 Z" transform="translate(5.000000, 4.000000) rotate(-90.000000) translate(-5.000000, -4.000000) " />
  </svg>
)

export default SelectBox;
