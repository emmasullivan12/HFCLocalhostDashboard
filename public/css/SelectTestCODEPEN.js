HTML
<div id="root"></div>

CSS
$grey-background: #f5f5f5;
$grey-border: #ddd;
$grey-text: #898989;
$grey-dark: #444;
$main-light: #d9f2fb;
$main: #00a9e0;
$main-dark: #007da6;
$success: #7fd81e;
$error: #ff5100;
$warning: #f6c223;
$body: #081f2c;

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  box-sizing: border-box;
  margin: 10px;
  color: $body;
  font: 400 13px/20px 'Source Sans Pro', sans-serif;
}

svg {
  display: block;
  width: 1em;
  height: 1em;
  fill: currentColor;
}

.select {
  position: relative;
  display: inline-block;
  width: 320px;

  &:focus {
    outline: 0;

    & .selection {
      box-shadow: 0 0 1px 1px $main;
    }
  }
}

.label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
}

.selection {
  position: relative;
  padding: 5px;
  border: 1px solid $grey-border;
  background: #fff;
}

.value {
  position: relative;
  display: inline-block;
  padding: 5px 10px;
}

.multiple {
  padding-right: 30px;
  margin-right: 5px;
  background: $main-light;
  color: $main;
}

.delete {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  padding: 10px;
  font-size: 10px;
  cursor: pointer;
}

.placeholder {
  padding: 5px 10px;
  color: $grey-text;
}

.arrow {
  position: absolute;
  top: 5px;
  right: 5px;
  display: block;
  padding: 10px;
  font-size: 10px;
  color: $grey-text;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: solid $grey-border;
  border-width: 0 1px;
  background: #fff;
}

.option {
  padding: 10px 15px;
  border-bottom: 1px solid $grey-border;
  cursor: pointer;

  &.selected {
    border: 1px solid $main;
    margin: -1px -1px 0;
    background: $main-light;
  }

  &.focused {
    background: $grey-background;
  }
}

.checkbox {
  content: '';
  vertical-align: top;
  display: inline-block;
  width: 16px;
  height: 16px;
  padding: 2px;
  border: 1px solid $grey-border;
  border-radius: 2px;
  margin: 2px 12px 0 0;
  color: #fff;
  font-size: 10px;

  .selected & {
    border-color: $main-dark;
    background: $main;
  }
}

JAVASCRIPT
const { Component } = React

class Select extends Component {
  constructor(props) {
    super(props)

    this.state = {
      values: [],
      focusedValue: -1,
      isFocused: false,
      isOpen: false,
    }

    this.onFocus = ::this.onFocus
    this.onBlur = ::this.onBlur
    this.onKeyDown = ::this.onKeyDown

    this.onClick = ::this.onClick
    this.onHoverOption = ::this.onHoverOption
    this.onClickOption = ::this.onClickOption

    this.renderOption = ::this.renderOption
  }

  onFocus() {
    this.setState({
      isFocused: true
    })
  }

  onBlur() {
    const { options, multiple } = this.props

    this.setState(prevState => {
      const { values } = prevState

      const value = values[0]

      let focusedValue = -1

      if (value) {
        focusedValue = options.findIndex(option => option.value === value)
      }

      return {
        focusedValue,
        isFocused: false,
        isOpen: false
      }
    })
  }

  onKeyDown(e) {
    const { options } = this.props
    const { isOpen } = this.state

    switch (e.key) {
      case ' ':
        e.preventDefault()
        if (isOpen) {
        } else {
          this.setState({
            isOpen: true
          })
        }
        break
      case 'Escape':
      case 'Tab':
        if (isOpen) {
          e.preventDefault()
          this.setState({
            isOpen: false
          })
        }
        break
      case 'Enter':
        this.setState(prevState => ({
          isOpen: !prevState.isOpen
        }))
        break
      case 'ArrowDown':
        e.preventDefault()
        this.setState(prevState => {
          let { focusedValue } = prevState

          if (focusedValue < options.length - 1) {
            focusedValue++

            return {
              values: [ options[focusedValue].value ],
              focusedValue
            }
          }
        })
        break
      case 'ArrowUp':
        e.preventDefault()
        this.setState(prevState => {
          let { focusedValue } = prevState

          if (focusedValue > 0) {
            focusedValue--

            return {
              values: [ options[focusedValue].value ],
              focusedValue
            }
          }
        })
        break
    }
  }

  onClick() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  onHoverOption(e) {
    const { options } = this.props

    const { value } = e.currentTarget.dataset
    const index = options.findIndex(option => option.value === value)

    this.setState({
      focusedValue: index
    })
  }

  onClickOption(e) {
    const { value } = e.currentTarget.dataset

    this.setState(prevState => {
      return {
        values: [ value ],
        isOpen: false
      }

    });
  }

  stopPropagation(e) {
    e.stopPropagation()
  }

  renderValues() {
    const { placeholder } = this.props
    const { values } = this.state

    if (values.length === 0) {
      return (
        <div className="placeholder">
          { placeholder }
        </div>
      )
    }

    return (
      <div className="value">
        { values[0] }
      </div>
    )
  }

  renderOptions() {
    const { options } = this.props
    const { isOpen } = this.state;

    if (!isOpen) {
      return null
    }

    return (
      <div className="options">
        { options.map(this.renderOption) }
      </div>
    )
  }

  renderOption(option, index) {
    const { values, focusedValue } = this.state

    const { value } = option

    const selected = values.includes(value)

    let className = "option"
    if (selected) className += " selected"
    if (index === focusedValue) className += " focused"

    return (
      <div
        key={ value }
        data-value={ value }
        className={ className }
        onMouseOver={ this.onHoverOption }
        onClick={ this.onClickOption }
        >
        { value }
      </div>
    )
  }

  render() {
    const { label } = this.props
    const { isOpen } = this.state

    return (
      <div
        className="select"
        tabIndex="0"
        onFocus={ this.onFocus }
        onBlur={ this.onBlur }
        onKeyDown={ this.onKeyDown }
      >
        <label className="label">{ label }</label>
        <div className="selection" onClick={ this.onClick }>
          { this.renderValues() }
          <span className="arrow">
            { isOpen ? <ChevronUp /> : <ChevronDown /> }
          </span>
        </div>
        { this.renderOptions() }
      </div>
    )
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

ReactDOM.render(
  <div>
    <Select
      label="React Select"
      placeholder="Pick one"
      options={[
        { value: 'Rock' },
        { value: 'Paper' },
        { value: 'Scissors' }
      ]}
    />
    <span style={{ display: 'inline-block', width: 20 }} />
  </div>,
  document.getElementById('root')
)
