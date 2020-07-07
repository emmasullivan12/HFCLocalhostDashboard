// Dex last merged this code on 7th july 2020

import React from "react";
import ReactDOM from "react-dom";
import '../css/General.css';
import '../css/Select.css';
import {ChevronDown, ChevronUp, X, Check} from './GeneralFunctions.js';

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
      numSelected: 0,
    };
  }

  componentDidMount(){
    const { focusOnLoad, handleTabPress, name } = this.props;

    if (focusOnLoad) {
      document.getElementById("selectBox-"+name).focus();
    }
    if (handleTabPress) {
      handleTabPress(false);
    }
  }

  onFocus = (e) => {
    const { handleFocus } = this.props;
    if (handleFocus) {
      handleFocus(document.activeElement.id)
    }
    this.setState({
      isFocused: true,
    })
  }

  onBlur = (e) => {
    const { options, multiple, valueToShow, name, required, otherValidityChecks, finMultiOptions, handleChange } = this.props

    const hasMultipleAttributes = this.checkMultipleAttributes();

    this.setState(prevState => {
      const { values } = prevState
      if (multiple) {
        //const allSelected = values.length === (options.length - this.countTitles())
    /*    console.log("values.length: "+values.length)
        console.log("options.length: "+options.length)
        console.log("this.countTitles(): "+this.countTitles())
        console.log("options.length - this.countTitles(): "+options.length - this.countTitles())*/
      //  console.log("allSelected: "+allSelected)
      //  if (allSelected != true) {
    //      console.log("about to handlechange")
          handleChange(values)
  //      }
        if (values.length != 0) {
          if (finMultiOptions) {
            finMultiOptions()
          }
        }

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
        if (values.length === 0) {
          if(!required || required && value != null) {
            document.getElementById("selectBox-"+name).classList.remove('error')
            if (otherValidityChecks) {
              otherValidityChecks()
            }
          } else {
            document.getElementById("selectBox-"+name).classList.add('error')
          }
          return {
            isOpen: false,
            isFocused: false,
          }
        }
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

    if (multiple && currentState === true && e.target.nodeName != 'svg' && e.target.nodeName != 'path' && e.target.id != 'chevronUp' && e.target.id != "selectArrow" && e.target.id != 'select-placeholder' && e.target.id != 'selectContainer' && e.target.id.indexOf("selectBox") != 0 && e.target.id.indexOf("doneTick") != 0) {
      //change so if multiple and is open and clicked on box (not item) then close
      return;
    }

    if (multiple && currentState === true && values.length != 0) {
      if (finMultiOptions) {
        finMultiOptions()
      }
    }

    this.setState({
      isOpen: !currentState,
//      elementIdFocused: document.activeElement.id
    }, () => {
  //    if (this.state.isOpen === true && (this.countTitles() > 0 || showCheckbox === true)) {
      //if (multiple && this.state.isOpen === true && (showCheckbox != true || (this.countTitles() > 0 && showCheckbox === true))) {
      if (multiple && this.state.isOpen === true) {
        this.heightCalc()
      }
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
    e.preventDefault()
    e.stopPropagation()
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

      const allSelected = values.length === (options.length - this.countTitles())

  //    if (allSelected != true) {
        handleChange(values)
  //    }

      if (allSelected === true) {
      /*  */
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
          isOpen: true,
        }
      }

    }, () => {
      if (showCheckbox === true) {
        if (finMultiOptions) {
          const allSelected = this.state.values.length === (options.length - this.countTitles())
          if (allSelected) {
            finMultiOptions()
          }
        }
        return
      } else {
        if (multiple && this.state.values.length != (options.length - this.countTitles())) {
          this.heightCalc()
        } else return
      }
    });
  }

  onKeyDown = e => {
    const { isOpen, focusedValue, isFocused } = this.state;
    const { handleChange, handleTabPress, options, multiple, isLastChild, finMultiOptions, required, name, showCheckbox, valueToShow, otherValidityChecks } = this.props;
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
        //    this.setState(prevState => {
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

                handleChange(values)

                const noMoreOptions = (values.length === (options.length - this.countTitles())) && showCheckbox != true

                if (noMoreOptions) {
                  if (finMultiOptions) {
                    finMultiOptions()
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
          //  })
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
          } else {
            if (prevState.values.length === 0) {
              if (finMultiOptions) {
                finMultiOptions()
              }
              return {
                isOpen: false,
              }
            }
          }
        }
      }, () => {
        if (showCheckbox === true) {
          if (finMultiOptions) {
            const allSelected = this.state.values.length === (options.length - this.countTitles())
            if (allSelected) {
              finMultiOptions()
            }
          }
        }
        if (multiple && this.state.isOpen === true) {
          this.heightCalc()
        } else return
      })

    }

    // User pressed the tab key
    else if (e.keyCode === 9) {
      if (isLastChild != undefined && isOpen === true) {
        e.preventDefault()
      }
      this.setState(prevState => {
        let { focusedValue } = prevState
        if (!isOpen) {
          return
        } else {
      //    e.preventDefault();
      //    const value = hasMultipleAttributes ? options[focusedValue][valueToShow] : options[focusedValue];

          if (multiple) {
          //  this.setState(prevState => {
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

                handleChange(values)

                if (values.length === (options.length - this.countTitles())) {
                  if (finMultiOptions) {
                    finMultiOptions()
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
      //      })
          } else {
            const isSectionTitle = options[focusedValue]["isTitle"] === true;
            if (isSectionTitle) {
              return
            }
            const value = hasMultipleAttributes ? options[focusedValue][valueToShow] : options[focusedValue];
            const index = options.findIndex(option => (hasMultipleAttributes ? option[valueToShow] : (valueToShow === undefined ? option : option.value)) === value);
      //      const isValid = this.checkExists(hasMultipleAttributes ? options[focusedValue].value : options[focusedValue]);
            handleChange(hasMultipleAttributes ? options[focusedValue].value : options[focusedValue]);
            if (handleTabPress) {
              handleTabPress(true);
            }
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

          const hasTitles = this.countTitles() > 0

          const elements = document.getElementsByClassName("multiple value")
          for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('focused')
          }

          if ((hasTitles ? focusedValue === 1 : focusedValue === 0) || focusedValue === -1) {

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

            if (hasTitles) {
              if (options[focusedValue - 1]["isTitle"] === true) {
                focusedValue-=2
              } else {
                focusedValue--
              }
            } else {
              focusedValue--
            }

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
        const hasTitles = this.countTitles() > 0

        this.setState(prevState => {
          let { focusedValue } = prevState

          const elements = document.getElementsByClassName("multiple value")
          for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('focused')
          }

          if (focusedValue === options.length -1) {
            const parent = document.getElementById("options-"+name);
            parent.scrollTop = 0;

            if (this.countTitles() > 0) {
              focusedValue = 1
            } else {
              focusedValue = 0
            }

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

          } else if (focusedValue === -1) {

            if (hasTitles) {
              focusedValue = 1
            } else {
              focusedValue++
            }

          } else {

            if (hasTitles) {
              if (options[focusedValue + 1]["isTitle"] === true) {
                focusedValue+=2
              } else {
                focusedValue++
              }
            } else {
              focusedValue++
            }
          }

          this.handleMoveDown();

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
    const { focusedValue, values } = this.state;
    const { options, name, showCheckbox, valueToShow } = this.props;
    const parent = document.getElementById("options-"+name);
    const hasTitles = this.countTitles() > 0

    let item;
    let titleItem;

    if (hasTitles) {
      item = parent.children[1]
      titleItem = parent.firstElementChild
    } else {
      item = parent.firstElementChild;

      // i.e. 5 = 6th box
      if (focusedValue < (options.length - 5)) {
        parent.scrollTop -= item.offsetHeight
        return
      }
    }


    if (focusedValue < (options.length - 5)) {

      if (showCheckbox != true) {
        if (values.indexOf(options[focusedValue - 1][valueToShow]) != -1) {
          return
        }
      }

      //check if next item is title
      if (options[focusedValue - 1]["isTitle"] === true) {
        // 20px is margin-top of the title
        parent.scrollTop -= (titleItem.offsetHeight + 20 + item.offsetHeight)
      } else {
        parent.scrollTop -= item.offsetHeight
      }

    }

  }

  handleMoveDown = () => {
    const { focusedValue, values } = this.state;
    const { name, title, options, valueToShow, showCheckbox } = this.props;
    const parent = document.getElementById("options-"+name);
    const hasTitles = this.countTitles() > 0

    let item;
    let titleItem;

    if (hasTitles) {
      item = parent.children[1]
      titleItem = parent.firstElementChild
    } else {
      item = parent.firstElementChild;

      // i.e. 5 = 6th box
      if (focusedValue >= 5) {
        parent.scrollTop += item.offsetHeight
        return
      }
    }

    if (focusedValue >= 5) {

      if (showCheckbox != true) {
        if (values.indexOf(options[focusedValue + 1][valueToShow]) != -1) {
          return
        }
      }

      //check if next item is title
      if (options[focusedValue + 1]["isTitle"] === true) {
        // 20px is margin-top of the title
        parent.scrollTop += (titleItem.offsetHeight + 20 + item.offsetHeight)
      } else {
        parent.scrollTop += item.offsetHeight
      }

    }

  }

  countTitles = () => {
    const {options} = this.props

    const titleCount = options
      .filter(option => option["isTitle"] === true)
      .length

    return titleCount
  }

  heightCalc = (needValue) => {
    const {options, name, showCheckbox, required} = this.props
    const {values} = this.state

    let containerHeight = 0;

    const length = options.length
    // Makes container the height of the first 6 items
    for (var i = 0; i < Math.min(7, length); i++) {
      if (options[i]["isTitle"] === true) {
        containerHeight += 40

        // Add 20px margin-top for all but the first title
        if (i != 0) {
          containerHeight += 20
        }

      } else {
        if (showCheckbox === true) {
          containerHeight += 32
        } else {
          containerHeight += 40
        }
      }
    }
    if (needValue) {
      return containerHeight
    } else {
      document.getElementById('options-'+name).style.maxHeight = containerHeight + "px";
      document.getElementById("autocompleter-doneContainer-"+name).style.maxHeight = containerHeight + "px";
      document.getElementById("autocompleter-doneContainer-"+name).style.top = (containerHeight += 10) + "px";
      if (!required || (required && values.length > 0)) {
        if (containerHeight === 40) {
          return
        } else if (containerHeight === 32) {
          document.getElementById("doneTick-"+name).classList.add('solo')
        } else {
          document.getElementById("doneTick-"+name).classList.remove('solo')
        }
      }
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
    const { placeholder, placeholderOnClick, multiple, showCheckbox, options } = this.props
    const { values, numSelected, isOpen } = this.state

    if (values.length === 0) {
      return (
        <div className={"select-placeholder"+((isOpen === true && placeholderOnClick) ? ' onClick' : '')} id="select-placeholder">
          { (isOpen === true && placeholderOnClick) ? placeholderOnClick : placeholder }
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
    const { options, multiple, valueToShow, showDetail, showIcon, showCheckbox, detailToShow, iconToShow, name, required } = this.props
    const { isOpen, values, focusedValue } = this.state;

    if (!isOpen) {
      return;
    }

    return (
      <React.Fragment>
        <div
          className={(showDetail===true ? 'options showDetail' : 'options noDetail')}
          id={'options-'+name}
      //    onMouseMove={this.onMouseMove}
    //      onBlur={this.onMouseOut}
        >
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
            } else {
              className += " overflow-ellipsis"
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
              className += " showDetail"
            } else {
              className += " noDetail"
            }
            if (showIcon===true && (option["icon"] != null || option["iconFA"] != null)) {
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
              //  onFocus={this.onFocus}
              //  onMouseOver={this.onHoverOption}

              >
                {(showIcon===true && option["iconFA"] != null) && (
                  <div className={"option-iconContainer FA" + (isSectionTitle ? ' title' : '') + (showDetail===true ? " showDetail": " noDetail") + (showCheckbox===true ? " showCheckbox": "")}>
                    <i className={icon} />
                  </div>
                )}
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
                <span className={(showCheckbox === true && isSectionTitle != true) ? "checkboxText overflow-ellipsis" : ""}>
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
        <div className="autocompleter-doneContainer" id={"autocompleter-doneContainer-"+name}>
          {multiple && (!required || (required && values.length > 0)) && (
            <div
              onClick={this.onClick}
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
  }

  render() {
    const { handleChange, required, name, handleMouseDown } = this.props;
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
          onMouseDown={handleMouseDown}
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

export default SelectBox;
