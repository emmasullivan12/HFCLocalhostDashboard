// Dex last merged this code on 10th August 2019

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";

import TypeformEmbedded from './TypeformEmbedded.js';
import Autocomplete from './Autocomplete.js';

class MenteeShortSU extends React.Component {
  constructor () {
    super();
    this.state = {
      country: '',
      state: '',
      city: ''
    }
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  handleCountryChange(userInput) {
    this.setState({ country: userInput });
  }

  handleStateChange(userInput) {
    this.setState({ state: userInput });
  }

  handleCityChange(e) {
    this.setState({ city: e.target.value });
  }

  canBeSubmitted(countries, states, provinces) {
    const {country, state, city} = this.state;
    if (country != '' && countries.indexOf(country) != -1 && city != '') {
      if (country === 'United States of America' || country === 'Canada') {
        if (state != '' && (states.indexOf(state) != -1 || provinces.indexOf(state) != -1)) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  }

  render() {

  const { country, state, city } = this.state;
  const {tflink, step} = this.props;
  var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  var states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
  var provinces = ['Ontario','Quebec','British Columbia','Alberta','Manitoba','Saskatchewan','Nova Scotia','New Brunswick','Newfoundland and Labrador','Prince Edward Island','Northwest Territories','Nunavut','Yukon'];
  const isEnabled = this.canBeSubmitted(countries, states, provinces);

    return (
      <React.Fragment>
        <div>
          <div className='progress-circles-container'>
            <div className={(step==1) ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle" />
            </div>
            <div className={(step==2) ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle"  />
            </div>
            <div className={step===3 ? "thisStep" : "nxtStep"}>
              <i className="fas fa-circle" />
            </div>
          </div>
          <div className='embedded-typeform'>
            <form autoComplete="off">
              <div className="form-group" id="userCountry">
                <label className="descriptor alignLeft">What country do you live in?</label>
                <div className="autocompleter">
                  <Autocomplete
                    suggestions={countries}
                    name='country'
                    placeholder='Country'
                    handleChange={this.handleCountryChange}
                    handleBlur={this.onBlur}
                  />
                </div>
              </div>
              {country === 'United States of America' && (
                <div className="form-group" id="userCountry">
                  <label className="descriptor alignLeft">What State?</label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={states}
                      name='stateprovince'
                      placeholder='State'
                      handleChange={this.handleStateChange}
                      handleBlur={this.onBlur}
                    />
                  </div>
                </div>
              )}
              {country === 'Canada' && (
                <div className="form-group" id="userCountry">
                  <label className="descriptor alignLeft">What Province?</label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={provinces}
                      name='stateprovince'
                      placeholder='Province'
                      handleChange={this.handleStateChange}
                      handleBlur={this.onBlur}
                    />
                  </div>
                </div>
              )}
              {country != '' && (
                <div className="form-group" id="userCity">
                  <label className="descriptor alignLeft">Which City?</label>
                  <input
                    type="text"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleCityChange}
                    onBlur={this.onBlur}
                    className="form-control-std"
                    placeholder="City"
                    required
                  />
                </div>
              )}
              <button type="submit" disabled={!isEnabled} className="Submit-btn fullWidth">
                Next
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MenteeShortSU;
