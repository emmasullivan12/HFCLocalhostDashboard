// Dex last merged this code on 21st apr 2023

import React, { Component } from "react";

import {escapeHTML, whichBrowser, ChevronDown, ChevronUp, LoadingSpinner, Check} from './GeneralFunctions.js';
import {cdn} from './CDN.js';
import Checkbox from './Checkbox.js';
import TextInput from './TextInput.js';
import NumberInput from './NumberInput.js';
import PhoneInputContainer from './PhoneInput.js';
import RatingItems from './RatingItems.js';
import Autocomplete from './Autocomplete.js';
import AutocompleteTagsMulti from './AutocompleteTagsMulti.js';
import SelectBox from './Select.js';
import {availabilityMsg, userFlagEmoji, eduName, eduSubjects, planningUni, isNightDay, profileTimeZone, setSchGraduYr} from './UserDetail.js';

import "../css/General.css";
import "../css/Emoji.css";
import "../css/Form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedQ: 0,
      isSubmitting: false,
      firstQEdited: false,
      qViewed: 0,
      qVisibleArray: [],
      pct: 0,
      tabPressed: '',
      browser: '',
      [this.props.renderComponentsInitialState]: [], // for anything that loads from another file i.e. list of unis or schools etc
      [this.props.renderComponentsInitialState2]: [],
    };
    this.renderComponents = this.renderComponents.bind(this);
  }

  componentDidMount() {
    this.mounted = true
    const {usedFor, questions, saveOnSubmit} = this.props

    this.setState({
      browser: whichBrowser()
    })

    const statesToSave = {}

    // Hels Dex check if user is under18 (if I have added this to end of usedFor when feeding into Form.js as props)
    if (saveOnSubmit != undefined) {
      const isSaveOnSubmitValue = usedFor.split("-")[1] === saveOnSubmit
      statesToSave[saveOnSubmit] = isSaveOnSubmitValue
    }

    const observer = this.createObserver()

    // Set initial height & width state (need to detect whether changes are mobile soft keyboard)
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    this.setState({
      viewport_w_int: w,
      viewport_h_int: h,
    })

    //Set initial height of Qs
    this.setQHeight()

    // Sets Q numbers & height on newly loaded Qs
    this.updateVisibleQs()

    // Calc size of component based on window height on resized window (so that is mobile compatible as vh doesnt work)
  //  window.addEventListener('orientationchange', this.setQHeight);
    window.addEventListener('resize', this.trackHeight);

    // Track all sections that have an `id` applied
    document.getElementById("fpModal-"+usedFor).querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

  }

  componentWillUnmount() {
    const {usedFor} = this.props
    const observer = this.createObserver()

  //  window.removeEventListener('orientationchange', this.setQHeight);
    window.removeEventListener('resize', this.trackHeight);

    document.getElementById("fpModal-"+usedFor).querySelectorAll('section[id]').forEach((section) => {
      observer.unobserve(section);
    });
    this.mounted = false
  }

  onBlur = (e) => {
    if(e.target.checkValidity()) {
      console.log(this.state[e.target.id+"isValid"])
      // If is undefined that means the user clicked in and out of box but didnt change it (and html input is valid i.e. is not required to be completed)
      if (this.state[e.target.id+"isValid"] == true || this.state[e.target.id+"isValid"] == undefined) {
        e.target.classList.remove('error');
      } else {
        e.target.classList.add('error');
      }

    } else {
      e.target.classList.add('error');
    }
  }

  updateProgress = () => {
    const {usedFor, questions} = this.props

    const notInterim = questions
      .filter(q => q['aType'] != 'interim')

    const hiddenQs = document.getElementById("fpModal-"+usedFor).querySelectorAll('section.hiddenQ')

    const qLength = notInterim.length - hiddenQs.length
    const statesToCheck = [];

    questions.forEach((question, i) => {
      const required = question['req'] === 1;
      const name = question['name'];
      const aType = question['aType'];
      if (aType === 'checkbox'){
        var options = question['options'];
      }

      if (!required) {
        if(aType === 'interim') {
          return
        } else if(aType === 'checkbox') {
          let checkboxesToCheck = [];

          options.forEach((option, index) => {
            checkboxesToCheck.push(
              this.state[i+"-"+option['name']] != false && this.state[i+"-"+option['name']] != undefined
            );
          })

          if (checkboxesToCheck.includes(true)) {
            statesToCheck.push(
              true
            );
          } else {
            statesToCheck.push(
              false
            );
          }

        } else {
          statesToCheck.push(
            this.state[i+"-"+name] != '' && this.state[i+"-"+name] != undefined
          );
        }
      } else {
        if(aType === 'checkbox') {
          let checkboxesToCheck = [];

          options.forEach((option, index) => {
            checkboxesToCheck.push(
              this.state[i+"-"+option['name']] != false && this.state[i+"-"+option['name']] != undefined
            );
          })

          if (checkboxesToCheck.includes(true)) {
            statesToCheck.push(
              true
            );
          } else {
            statesToCheck.push(
              false
            );
          }
        } else {
          statesToCheck.push(
            this.state[i+"-"+name+"isValid"]
          );
        }
      }
    });

    const completedQ = statesToCheck
      .filter(q => q == true)

//    const width = (index / (qLength - 1)) * 100
  //  const width = (completedQ.length / statesToCheck.length) * 100
    const width = (completedQ.length / qLength) * 100

    const el = document.getElementById("formProgressBar")

    el.style.width = width + "%";

    this.setState({
      pct: Math.round(width),
    })
  }

  createObserver = () => {
    const {usedFor, questions} = this.props

    let options = {
      threshold: 0.7
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target
        const id = el.getAttribute('id');

        const index = el.getElementsByClassName("formA-"+usedFor)[0].dataset.index
        const index1 = this.state.allVisibleArray.indexOf(index+"-"+el.dataset.key)

        if (entry.intersectionRatio > 0) {

          this.setState(prevState => {
            let { qViewed } = prevState
            const maxQViewed = Math.max(index, qViewed)

            return {
              focusedQ: index1,
              qViewed: maxQViewed
            }

          })
        }
      });
    }, options);

    return observer
  }

  handleChange = (e) => {
    const {questions} = this.props
    const id = e.target.id
    const i = id.split("-")[0]

    const q = questions[i]

    const isConditionalParent = q['conditionalParent'] === 1

    if (i == 0) {
      this.setState({
        firstQEdited: true,
      })
    }

    this.setState({
      [id]: e.target.value,
    })
    if (e.target.checkValidity()) {
      this.setState({
        [id+"isValid"]: true
      }, () => {
        if (isConditionalParent) {
          const condParentName = q['name']
          this.updateConditional(id, condParentName, () => {
            this.updateProgress()
          })
        } else {
          this.updateProgress()
        }
      })
    } else {
      this.setState({
        [id+"isValid"]: false
      }, () => {
        if (isConditionalParent) {
          const condParentName = q['name']
          this.updateConditional(id, condParentName, () => {
            this.updateProgress()
          })
        } else {
          this.updateProgress()
        }
      })
    }
  }

  handlePhoneChange = (id, value, isValid) => {
    const {questions} = this.props
  //  const phoneInputIsValid = this.checkPhoneValidity(value)

    const i = id.split("-")[0]

    const q = questions[i]

    const isConditionalParent = q['conditionalParent'] === 1

    if (i == 0) {
      this.setState({
        firstQEdited: true,
      })
    }

    this.setState({
      [id]: value,
    })
    if (isValid == true) {
      this.setState({
        [id+"isValid"]: true
      }, () => {
        if (isConditionalParent) {
          const condParentName = q['name']
          this.updateConditional(id, condParentName, () => {
            this.updateProgress()
          })
        } else {
          this.updateProgress()
        }
      })
    } else {
      this.setState({
        [id+"isValid"]: false
      }, () => {
        if (isConditionalParent) {
          const condParentName = q['name']
          this.updateConditional(id, condParentName, () => {
            this.updateProgress()
          })
        } else {
          this.updateProgress()
        }
      })
    }
  }

  handleNonTextChange = (values, formId, isValid, callback) => {
    const {questions} = this.props

    const i = formId.split("-")[0]
    const q = questions[i]

    const isConditionalParent = q['conditionalParent'] === 1

    if (i == 0) {
      this.setState({
        firstQEdited: true,
      })
    }

    this.setState({
      [formId]: values,
      [formId+"isValid"]: isValid
    }, () => {
      if (isConditionalParent) {
        const condParentName = q['name']
        this.updateConditional(formId, condParentName, () => {
          this.updateProgress()
        })
      } else {
        this.updateProgress()
      }
      if (callback) {
        callback()
      }
    })
  }

  handleNonTextMultiChange = (values, formId, isValid, callback) => {
    const {questions, usedFor} = this.props;

    const formIdSplit = formId.split("-")
    var getIndex = formIdSplit[0];

    const q = questions[getIndex]

    const isConditionalParent = q['conditionalParent'] === 1

    if (getIndex == 0) {
      this.setState({
        firstQEdited: true,
      })
    }

    const getOptions = q['options'];

    const newArray = getOptions
      .filter(option => values.includes(option.label))

    const array = newArray.map(value => value.value)

    if (q['aType'] === 'autocompleteMulti') {
      const labels = newArray.map(value => value.label)

      const freeTextArray = values
        .filter(freeText => labels.indexOf(freeText) === -1)

      this.setState({
        [formId+"freeText"]: freeTextArray
      })
    }

    this.setState({
      [formId]: array,
      [formId+"isValid"]: isValid
    }, () => {
      if (isConditionalParent) {
        const condParentName = q['name']
        this.updateConditional(formId, condParentName, () => {
          this.updateProgress()
        })
      } else {
        this.updateProgress()
      }
      if (callback) {
        callback()
      }
    })

  }

  toggleCheckbox = (e)  => {
    const {usedFor, questions} = this.props;
    const stateToChange = e.target.id;
    var getIndex = stateToChange.split("-")[0]
    const q = questions[getIndex]
    const isConditionalParent = q['conditionalParent'] === 1

    this.setState({
      [stateToChange]: e.target.checked
    }, () => {
      if (isConditionalParent) {
        const condParentName = q['name']
        this.updateConditional(stateToChange, condParentName, () => {
          this.updateProgress()
        })
      } else {
        this.updateProgress()
      }
    });

    const stateToChangeSplit = stateToChange.split("-")
    var i = stateToChangeSplit[0];
    let checkboxesToCheck = [];

    if (e.target.checkValidity()) {
      this.setState({
        [stateToChange+"isValid"]: true
      }, () => {

        // Check that at least 1 of the checkbox options is checked (if this question was required)
        var options = questions[i]['options'];

        options.forEach((option, index) => {
          checkboxesToCheck.push(
            this.state[i+"-"+option['name']+"isValid"]
          );
        })

        if (checkboxesToCheck.includes(true)) {
          this.setState({
            [i+"-checkboxMaster"+"isValid"]: true
          })
        } else {
          this.setState({
            [i+"-checkboxMaster"+"isValid"]: false
          })
        }
      })
    } else {
      this.setState({
        [stateToChange+"isValid"]: false
      }, () => {
        var options = questions[i]['options'];

        options.forEach((option, index) => {
          checkboxesToCheck.push(
            this.state[i+"-"+option['name']+"isValid"]
          );
        })

        if (checkboxesToCheck.includes(true)) {
          this.setState({
            [i+"-checkboxMaster"+"isValid"]: true
          })
        } else {
          this.setState({
            [i+"-checkboxMaster"+"isValid"]: false
          })
        }
      })
    }
  }

  handleYesNoChange = (e) => {
    const {questions} = this.props
    const formId = e.target.closest("section > div").dataset.idforstate

    var getIndex = formId.split("-")[0]
    const q = questions[getIndex]
    const isConditionalParent = q['conditionalParent'] === 1

    e.target.classList.add('selected');
    e.target.getElementsByTagName('span')[0].classList.add('selected');
    for (let sibling of e.target.parentNode.children) {
        if (sibling !== e.target) {
          sibling.classList.remove('selected');
          sibling.getElementsByTagName('span')[0].classList.remove('selected');
        }
    }

    this.setState({
      [formId]: e.target.value,
      [formId+"isValid"]: true
    }, () => {
      if (isConditionalParent) {
        const condParentName = q['name']
        this.updateConditional(formId, condParentName, () => {
          this.updateProgress()
        })
      } else {
        this.updateProgress()
      }
      if (this.state[formId+"isValid"] === true) {
        this.handleScrollDown()
      } else {
        return
      }
    });

  }

  handleScrollUp = () => {
    const { focusedQ } = this.state;
    const { questions, usedFor } = this.props;

    if (focusedQ === 0) {
      return
    } else {

      this.setState(prevState => {
        let { focusedQ } = prevState

        focusedQ--

        return {
          focusedQ
        }

      }, () => {

        const allAnswers = document.getElementsByClassName("formA-"+usedFor)

        let answers = []

        Array.prototype.forEach.call(allAnswers, function(answer) {
          const sectionParent = answer.closest("section.form-QA")
          if (!sectionParent.classList.contains("hiddenQ")) {
            answers.push(
              answer
            );
          }
        })

        const idToFocusOn = answers[this.state.focusedQ].dataset.idforfocus
        const elToFocusOn = answers[this.state.focusedQ].dataset.elementforfocus;
        const indexToFocusOn = answers[this.state.focusedQ].dataset.index

        if (elToFocusOn != null) {
          if (elToFocusOn === 'firstElementChild') {
           document.getElementById(idToFocusOn).firstElementChild.focus();
          }
        } else {
          document.getElementById(idToFocusOn).focus()
        }

        const parent = document.getElementById("fpModal-"+usedFor);
        if (this.state.focusedQ == 0) {
          parent.scrollTop = 0
        } else {
          const currentQ = document.getElementById('formQ-'+usedFor+indexToFocusOn)
          parent.scrollTop = currentQ.offsetTop
        }
      })
    }
  }

  handleScrollDown = () => {
    const { focusedQ, numQVisible, allVisibleArray } = this.state;
    const { questions, usedFor } = this.props;

    if (focusedQ == (allVisibleArray.length - 1)) {
      return
    } else {

      this.setState(prevState => {
        let { focusedQ } = prevState

          focusedQ++

        return {
          focusedQ
        }
      }, () => {
    //    const idToScrollTo1 = this.state.allVisibleArray[this.state.focusedQ]
    //    const idToScrollTo2 = idToScrollTo1.split("-")[0]

        const allAnswers = document.getElementsByClassName("formA-"+usedFor)

        let answers = []

        Array.prototype.forEach.call(allAnswers, function(answer) {
          const sectionParent = answer.closest("section.form-QA")
          if (!sectionParent.classList.contains("hiddenQ")) {
            answers.push(
              answer
            );
          }
        })

        const idToFocusOn = answers[this.state.focusedQ].dataset.idforfocus
        const elToFocusOn = answers[this.state.focusedQ].dataset.elementforfocus;
        const idForState = answers[this.state.focusedQ].dataset.idforstate

        const indexToFocusOn = idForState.split("-")[0]

        if (elToFocusOn != undefined) {
          if (elToFocusOn === 'firstElementChild') {
            document.getElementById(idToFocusOn).firstElementChild.focus();
          }
        } else {
          document.getElementById(idToFocusOn).focus()
        }

        const parent = document.getElementById("fpModal-"+usedFor);
        const currentQ = document.getElementById('formQ-'+usedFor+indexToFocusOn)
        parent.scrollTop = currentQ.offsetTop

      })
    }
  }

  handleSubmit = () => {
    const {onSubmit, usedFor, saveOnSubmit} = this.props;
    this.setState({
      isSubmitting: true
    }, () => {
      const {questions} = this.props;

      const statesToSave = {}

      // Hels Dex check if user is under18 (if I have added this to end of usedFor when feeding into Form.js as props)
      if (saveOnSubmit != undefined) {
        const isSaveOnSubmitValue = usedFor.split("-")[1] === saveOnSubmit
        statesToSave[saveOnSubmit] = isSaveOnSubmitValue
      }

      questions.forEach((question, i) => {
        const name = question['name'];

        if (question['aType'] === 'interim') {
          return
        } else if (question['aType'] === 'checkbox') {

          var options = question['options'];

          options.forEach((option, index) => {
            const optionName = option['name']

            statesToSave[optionName] = this.state[i+"-"+optionName]
          })

        } else if (question['aType'] === 'autocompleteMulti') {

          statesToSave[name] = this.state[i+"-"+name]
          statesToSave[name+'freeText'] = this.state[i+"-"+name+'freeText']

        } else {
          statesToSave[name] = this.state[i+"-"+name]
        }
      });

      if (onSubmit) {
        onSubmit()
      }
      // DEX TO SAVE DOWN ANSWERS WITHIN STATESTOSAVE

    })
  }

  handleDoneClick = (formId) => {

    if (this.state[formId+"isValid"] === true) {
      this.handleScrollDown()
    } else {
      return
    }
  }

  toggleScrollLock = () => {
    const {usedFor} = this.props
    document.getElementById('fpModal-'+usedFor).classList.toggle('u-lock-scroll');
  }

  updateConditional = (formId, condParentName, callback) => {
    const {usedFor, questions} = this.props
    const conditionalChildren = document.getElementById("fpModal-"+usedFor).querySelectorAll('section[data-condon]')
    const hiddenQs = document.getElementById("fpModal-"+usedFor).querySelectorAll('section.hiddenQ')

    if (this.state[formId+"isValid"] === true) {

      // Track all sections that have an `data-condOn` applied i.e. are conditional on another question
      conditionalChildren.forEach((section) => {

        // Checks if selected answer is in array of question's "showIf" props
        if (section.dataset.condon === condParentName && (section.dataset.showif.indexOf(this.state[formId]) != -1)) {
          section.classList.remove('hiddenQ');
        } else {
          section.classList.add('hiddenQ');

          // Might only work if there is one input element within the Section
          section.getElementsByClassName("formA-"+usedFor)[0].getElementsByTagName('input')[0].value = '';

          this.setState({
            [section.dataset.index+"-"+section.dataset.key]: '',
            [section.dataset.index+"-"+section.dataset.key+"isValid"]: false
          })
        }
      });

    } else {
      conditionalChildren.forEach((section) => {
        if (section.dataset.condon === condParentName) {
          section.classList.add('hiddenQ');

          // Might only work if there is one input element within the Section
          section.getElementsByClassName("formA-"+usedFor)[0].getElementsByTagName('input')[0].value = '';

          this.setState({
            [section.dataset.index+"-"+section.dataset.key]: '',
            [section.dataset.index+"-"+section.dataset.key+"isValid"]: false
          })
        }
      });

    }

      this.updateVisibleQs()
      if (callback) {
        callback()
      }

  }

  setQHeight = () => {
    const allQ = document.querySelectorAll("section.form-QA")
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const calc = "calc(" + h + "px - 4em)"
    allQ.forEach((q) => {
      if (q.classList.contains("hiddenQ")) {
        return
      } else {
        q.style.height = calc
      }
    })
  }

  trackHeight = () => {
    var isSoftKeyBoard = false

    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

    this.setState(prevState => ({
      viewport_w_int: w,
      viewport_h_int: h,
      viewport_w_prev_int: prevState.viewport_w_int,
      viewport_h_prev_int: prevState.viewport_h_int,
      viewport_w_diff_int: w - prevState.viewport_w_int,
      viewport_h_diff_int: h - prevState.viewport_h_int
    }), () => {
      const {viewport_w_int, viewport_h_int, viewport_w_prev_int, viewport_h_prev_int, viewport_w_diff_int, viewport_h_diff_int} = this.state
      const viewport_w_diff_abs_int = Math.abs(viewport_w_diff_int);
      const viewport_h_diff_abs_int = Math.abs(viewport_h_diff_int);

      //get the percentage changes in viewport width and height
      const viewport_w_diff_pc_int = (viewport_w_diff_abs_int / viewport_w_prev_int) * 100;
      const viewport_h_diff_pc_int = (viewport_h_diff_abs_int / viewport_h_prev_int) * 100;

      const isMobile = w <= 600 && h <= 800
      // If is not on mobile or is on mobile and ISNT soft keyboard resizing event
      if (isMobile) {
        if (viewport_w_diff_pc_int < 1) {
          switch (true) {
            case (viewport_h_diff_pc_int > 9 && viewport_h_diff_int < 0):
              //soft keyboard is opening
              isSoftKeyBoard = true;
              break;

            case (viewport_h_diff_pc_int > 9 && viewport_h_diff_int > 0):
              //Soft keyboard closing - start
              isSoftKeyBoard = true;
              break;

            case (viewport_h_diff_pc_int > 9 && viewport_h_diff_pc_int <= 35 && viewport_h_diff_int > 0):
              //Soft keyboard closing - end
              isSoftKeyBoard = true;
              break;

            case (viewport_h_diff_pc_int == 0):
              //No movement - possible Soft keyboard action
              isSoftKeyBoard = true;
              break;
          }
        }
      }

      if (!isSoftKeyBoard) {
        this.setQHeight(h)
      }
    })

  }

  updateVisibleQs = () => {
    const {usedFor} = this.props

    const allQs = document.getElementById("fpModal-"+usedFor).querySelectorAll("section.form-QA")
    let qVisibleArray = []
    let allVisibleArray = []

    // Calc size of component based on window height (so that is mobile compatible as vh doesnt work)
  //  this.setQHeight()

    allQs.forEach((q) => {
      const childDiv = q.getElementsByClassName('formA-'+usedFor)[0]
      const qid = escapeHTML(childDiv.dataset.idforstate)
      const qName = qid.split("-")[1]
      if (!q.classList.contains("hiddenQ")) {
        allVisibleArray.push(
          qid
        );
      }
      if (!q.classList.contains("hiddenQ") && !childDiv.dataset.idforstate.includes('interim')) {
        qVisibleArray.push(
          qName
        );
        const indexWithinVisibleArr = qVisibleArray.indexOf(qName)

        document.getElementById(qid+'qNum').innerHTML = (indexWithinVisibleArr + 1) + ")"
      }
    })

    this.setState({
      qVisibleArray: qVisibleArray,
      allVisibleArray: allVisibleArray
    });
  }

  canBeSubmitted() {
    const {questions, usedFor} = this.props;
    const {qViewed} = this.state;

    const statesToCheck = [];
    //const nonReqStatesToCheck = [];

    questions.forEach((question, i) => {
      const required = question['req'] === 1;
      const name = question['name'];

      if (!required) {
        // Still check correct format even if its not required, but "undefined" is allowed as means user clicked in and our of input box without changing it
        //nonReqStatesToCheck.push(
        //  this.state[i+"-"+name+"isValid"]
        //);
        return
      } else {
        const condOn = question['conditionalOn']
        if (condOn != undefined) {

          let getCondParentIndex

          document.querySelectorAll("section[data-key]").forEach((section) => {
            if (section.dataset.key === condOn) {
              getCondParentIndex = section.dataset.index
            }
          });

          const parentState = this.state[getCondParentIndex+"-"+condOn]

          if (parentState != undefined) {

            // If parent Q has been asnwered and answer is the one the child required, then check child Q has been answered too
            if (this.state[getCondParentIndex+"-"+condOn+"isValid"] && (String(question['showIf']).indexOf(parentState) != -1)) {
              statesToCheck.push(
                this.state[i+"-"+name+"isValid"]
              );
            } else {

              // If parent Q has been answered, but it's not the answer that the child requires, then set child to true (to allow submit)
              statesToCheck.push(
                true
              );
            }
          } else {
            statesToCheck.push(
              this.state[i+"-"+name+"isValid"]
            );
          }
        } else {
          statesToCheck.push(
            this.state[i+"-"+name+"isValid"]
          );
        }
      }
    });

//    if (statesToCheck.includes(false) || statesToCheck.includes(undefined) || nonReqStatesToCheck.includes(false)) {
    if (statesToCheck.includes(false) || statesToCheck.includes(undefined)) {
      return false

    // Make sure they've seen all questions before Submit button shows
    } else if (qViewed === (questions.length - 1)) {
      return true

    } else {
      return false
    }

  }

  renderComponents(fileToRender, componentUpdatesState, error) {

    import(`./${fileToRender}.js`)
      .then(component => {
        if(this.mounted) {
          this.setState({
            [componentUpdatesState]: component.default,
            errorLoadingFile: false
          })
        }
      })
      .catch(err => {
        if(this.mounted) {
          this.setState({
            errorLoadingFile: true
          })
        }
      })
  }

  renderAType(question, required, usedFor, i, name) {

    // i.e. input box, rating box, select box, etc.
    const aType = question['aType'];

    switch (aType) {
      case 'interim':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={i+"-"+name}
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <button type="button" className="Submit-btn formInterim" id={i+"-"+name} onClick={this.handleScrollDown} autoFocus={(i === 0) ? true : false}>
              Next &gt;
            </button>
          </div>
        );
      case 'text':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={i+"-"+name}
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <TextInput
              name={name}
              id={i+"-"+name}
              placeholder={question['placeholder']}
              required={required}
              minLength={question['minLength']}
              maxLength={question['maxLength']}
              handleChange={this.handleChange}
              onBlur={this.onBlur}
              focusOnLoad={(i === 0) ? true : false}
              className="form-control-std"
            />
            {question['maxLength'] && (
              <div className="descriptor-br form">
               {this.state[i+"-"+name] ? this.state[i+"-"+name].length : 0} / {question['maxLength']}
              </div>
            )}
          </div>
        );
      case 'textLong':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={i+"-"+name}
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <textarea
              name={name}
              id={i+"-"+name}
              className="form-control-std textInputBox"
          //    onChange={this.handleInput}
              onChange={this.handleChange}
              onBlur={this.onBlur}
              autoFocus={(i === 0) ? true : false}
              placeholder={question['placeholder']}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              minLength={question['minLength']}
              maxLength={question['maxLength']}
              required={required}
            />
            {question['maxLength'] && (
              <div className="descriptor-br form">
                {this.state[i+"-"+name] ? this.state[i+"-"+name].length : 0} / {question['maxLength']}
              </div>
            )}
          </div>
        );
      case 'number':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={i+"-"+name}
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <NumberInput
              name={name}
              id={i+"-"+name}
              placeholder={question['placeholder']}
              required={required}
              min={question['min']}
              max={question['max']}
              handleChange={this.handleChange}
              onBlur={this.onBlur}
              focusOnLoad={(i === 0) ? true : false}
            />
            {question['max'] && (
              <div className="descriptor-br form">
                Max: {question['max']}
              </div>
            )}
          </div>
        );
      case 'tel':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={i+"-"+name}
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <PhoneInputContainer
              name={name}
              id={i+"-"+name}
              required={required}
              handleChange={this.handlePhoneChange}
              onBlur={this.onBlur}
              focusOnLoad={(i === 0) ? true : false}
            />
          </div>
        );
      case 'checkbox':
        var options = question['options'];

        return (
          <React.Fragment>
            <div
              className={"formA-"+usedFor}
              data-idforfocus={i+"-"+options[0]['name']}
              data-idforstate={i+"-"+name}
              data-index={i}
            >
              {options.map((option, index) => {

                return (
                <div className="notifToggleContainer" key={option['id']}>
                  <span className="notifToggleTxt">{option['label']}</span>
                  <Checkbox
                    labelClassName="switch"
                    name={option['name']}
                    id={i+"-"+option['name']}
                    required={required}
                    defaultChecked={option['defaultChecked']}
                    disabled={option['disabled']}
                    spanClassName="slider round"
                    onChange={this.toggleCheckbox}
                  />
                </div>
                )

              })}
            </div>
          </React.Fragment>
        );
      case 'yesno':
        var optionsYN = question['options'];

        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={i+"-"+optionsYN[0]['label']}
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            {optionsYN.map((optionYN, indexYN) => {

              return (
                <button
                  className="formA-yesnoBtn"
                  type="button"
                  key={optionYN['value']}
                  value={optionYN['value']}
                  id={i+"-"+optionYN['label']}
                  required={required}
                  onClick={this.handleYesNoChange}
                >
                  {optionYN['label']}
                  <span
                    className="yesNoTick"
                  >
                    <Check />
                  </span>
                </button>
              )

            })}
          </div>
        )
      case 'select':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"selectBox-"+name}
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <SelectBox
              options={question['options']}
              placeholder={question['placeholder']}
              name={name}
              handleChange={this.handleNonTextChange}
              handleDone={this.handleDoneClick}
              focusOnLoad={i === 0 ? true : false}
              valueToShow={question['valueToShow']} // This is the attribute of the array/object to be displayed to user
              isForForm
              required={required}
            />
          </div>
        );
      case 'selectMulti':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"selectBox-"+name}
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <SelectBox
              multiple
            //  finMultiOptions={this.handleMultiOptions}
              options={question['options']}
              name={name}
              placeholder={question['placeholder']}
              placeholderOnClick={question['placeholderOnClick']}
              handleChange={this.handleNonTextMultiChange}
              handleDone={this.handleDoneClick}
              focusOnLoad={(i === 0) ? true : false}
              valueToShow={question['valueToShow']} // This is the attribute of the array/object to be displayed to user
              showCheckbox={question['showCheckbox']}
              showIcon={question['showIcon']}
              iconToShow={question['iconToShow']}
              isForForm
              required={required}
            />
          </div>
        );
      case 'autocomplete':

        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"autocompleteBox-"+name}
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <div className="autocompleter">
              <Autocomplete
                suggestions={this.state[question['componentUpdatesState']] ? this.state[question['componentUpdatesState']] : undefined}
                name={name}
                placeholder={question['placeholder']}
                handleChange={this.handleNonTextChange}
                handleDone={this.handleDoneClick}
                renderComponents={this.renderComponents}
                fileToRender={question['fileToRender']}
                componentUpdatesState={question['componentUpdatesState']}
                focusOnLoad={(i === 0) ? true : false}
                idValue={question['idValue']}
                valueToShow={question['valueToShow']}
                showDetail={question['showDetail']}
                detailToShow={question['detailToShow']}
                noSuggestionsCTAclass={question['noSuggestionsCTAclass']}
                isForForm
                required={required}
              />
              {this.state.errorLoadingFile === true && (
                <div className="descriptor prompt error eduForm alignLeft">
                  Error loading options. Please try reloading the page.
                </div>
              )}
            </div>
          </div>
        );
      case 'autocompleteMulti':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"autocompleteBox-"+name}
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <div className="autocompleter">
              <AutocompleteTagsMulti
                multiple
                openOnClick={question['openOnClick']}
                showValues={question['showValues']}
                showCheckbox={question['showCheckbox']}
                maxTextLength={question['maxTextLength']}
                handleDone={this.handleDoneClick}
                suggestions={question['options']}
                name={name}
                placeholder={question['placeholder']}
                placeholderOnClick={question['placeholderOnClick']}
                handleChange={this.handleNonTextMultiChange}
                idValue={question['idValue']}
                focusOnLoad={(i === 0) ? true : false}
                valueToShow={question['valueToShow']} // This is the attribute of the array/object to be displayed to user
                isForForm
                required={required}
              />
            </div>
          </div>
        );
      case 'rating':
        return (
          <div
            className={"formA-"+usedFor}
            data-idforfocus={"ratingsContainer"+"-"+name}
            data-elementforfocus="firstElementChild"
            data-idforstate={i+"-"+name}
            data-index={i}
          >
            <RatingItems
              ratingOutOf={question['ratingOutOf']}
              handleRatingChange={this.handleNonTextChange}
              name={name}
              usedFor={usedFor}
              handleDone={this.handleDoneClick}
              focusOnLoad={(i === 0) ? true : false}
              isForForm
              required={required}
            />
          </div>
        );
    }
  }

  renderQuestions() {
    const {questions, usedFor} = this.props;
    var qOnly = 0;

    return (
      <React.Fragment>
        <div className="col-6 col-s-12 formContainer">
          {questions.map((question, i) => {
            const q = question['q'];
            const required = question['req'] === 1;
            const name = question['name'];
            const condOn = question['conditionalOn']
            const showIf = question['showIf']
            const isConditional = condOn != undefined;

            if (name != 'interim' && !isConditional) {
              qOnly++
            }

            let detail
            let detailClassName
            // i.e. any detail to support the understanding of the question
            if (question['detail'] == undefined) {
              if (question['detailSmall'] == undefined) {
                detail = ''
                detailClassName = 'qDetail'
              } else {
                detail = question['detailSmall']
                detailClassName = 'qDetail small'
              }
            } else {
              detail = question['detail'];
              detailClassName = 'qDetail'
            }

            return (
            //  <section className="form-QA" id={'formQ-'+usedFor+i} key={q}>
              <section
                className={"form-QA "+(isConditional ? 'hiddenQ' : '')}
                id={'formQ-'+usedFor+i}
                key={q}
                data-key={name}
                data-condon={(isConditional ? condOn : undefined)}
                data-showif={(isConditional ? showIf : undefined)}
                data-index={i}
              >
                <h2 className={"qTitle " + (required ? "reqAsterisk" : "")}>
                  {name != 'interim' && (
                //    <span className="qNum">{qOnly})</span>
                //    <span className="qNum" id={i+name+'qNum'}>{this.state[i+name+'currNum']})</span>
                    <span className="qNum" id={i+"-"+name+'qNum'}>0)</span>
                  )}
                  {q}
                </h2>
                <div className={detailClassName}>
                  {detail}
                </div>
                { this.renderAType(question, required, usedFor, i, name) }
              </section>
            )
          })}
        </div>
      </React.Fragment>
    );
  }

  render() {
    const {focusedQ, isSubmitting, tabPressed, firstQEdited, pct, allVisibleArray, browser} = this.state
    const {questions, formTitle} = this.props

    const isSafari = browser === 'safari'

    const isEnabled = this.canBeSubmitted();

    return (
      <React.Fragment>
        <div className="prLogoContainer form">
      {/*    <img className="prLogoImg" alt="Prospela Logo" src="https://prospela.com/wp-content/uploads/2019/05/Prospela-New-Logo_Colour.png" /> */}
          <img
            className="prLogoImg"
            alt="Prospela Logo"
            srcSet={cdn+"/images/Prospela-New-Logo_Colour_213.png 213w, "+cdn+"/images/Prospela-New-Logo_Colour_341.png 314w, "+cdn+"/images/Prospela-New-Logo_Colour_640.png 640w"}
            sizes="(max-width: 1440px) 69px, 69px"
            src={cdn+"/images/Prospela-New-Logo_Colour.png"}
          />
        </div>
        <h1 className="form-header">
          <br/>
          <i className="emoji-icon form typing-emoji"/> {formTitle}
        </h1>
        <div className="row">
          { this.renderQuestions() }
        </div>
        <div className={"formCTAContainer submit" + (isSafari ? ' safari' : "")}>
          {isEnabled && (
            <button type="button" disabled={isSubmitting === true ? true : !isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-form">
              {isSubmitting === true && (
                <LoadingSpinner />
              )}
              {isSubmitting != true && (
                <span>Submit</span>
              )}
            </button>
          )}
          <button type="button" disabled={isSubmitting === true ? true : focusedQ == 0} className="qScrollBtn left" onClick={this.handleScrollUp}>
            <ChevronUp />
          </button>
          <button type="button" disabled={isSubmitting === true ? true : ((firstQEdited === false && focusedQ == 0) ? true : focusedQ == (allVisibleArray.length - 1))} className="qScrollBtn right" onClick={this.handleScrollDown}>
            <ChevronDown />
          </button>
        </div>
        <div className={"formCTAContainer other"+ (focusedQ === 0 ? ' hidden' : '') + (isSafari ? ' safari' : "")}>
          <div id="formProgressPct">{pct+"% completed"}</div>
          <div id="formProgress">
            <div id="formProgressBar"/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Form;
