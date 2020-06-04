// Dex last merged this code on 4th June 2020 

import React, { Component } from "react";
import ReactDOM from "react-dom";

class Checkbox extends Component {

  onKeyDown = (e) => {
    const { onChange, id } = this.props;
    const { timesClicked } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      e.preventDefault();
      var checkbox = document.getElementById(id);
      if (checkbox.checked) {
        checkbox.checked = false;
      } else {
        checkbox.checked = true;
      }
      onChange(e);
    }
  }

  render() {
    const {label, id, name, className, onChange, value, labelId, labelClassName, spanClassName, spanId, required, defaultChecked, disabled} = this.props;

    return (
      <React.Fragment>
        <label id={labelId ? labelId : ""} className={labelClassName}>{label}
          <input
            type="checkbox"
            name={name ? name : ""}
            id={id}
            className={className ? className : ""}
            onChange={onChange}
            onKeyDown={this.onKeyDown}
            value={value}
            required={required}
            defaultChecked={defaultChecked}
            disabled={disabled}
          />
          <span className={spanClassName} id={spanId ? spanId : ""}/>
        </label>
      </React.Fragment>
    )
  }
}

export default Checkbox;
