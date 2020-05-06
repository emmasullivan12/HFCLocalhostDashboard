// Dex last merged this code on 26th April 2020

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../css/Login.css";
import "../css/General.css";

import TypeformEmbedded from './TypeformEmbedded.js';
import Autocomplete from './Autocomplete.js';
import ProgressCircles from './ProgressCircles.js';
import TextInput from './TextInput.js';

class CountryShortSU extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      countryLocal: '', // dont need to save this down as country is in TypeformSignUp parent
      countryIsValid: '',
      stateProv: '',
      stateProvIsValid: '',
      city: '',
      tabPressed: '',
      timeout: 0
    }
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(e) {
    if(e.target.checkValidity()) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  }

  handleKeyUp = (e) => {
    e.persist();
    const {timeout} = this.state;

    clearTimeout(timeout);

    this.setState({
      timeout: setTimeout(()=>{
        this.handleCityChange(e.target.value)
      }, 800)
    })
  }

  handleCountryChange(userInput, isValid) {
    if (!isValid) {
      this.setState({
        stateProv: '',
        stateProvIsValid: '',
        city: '',
      });
    }
    this.setState({
      countryLocal: userInput,
      countryIsValid: isValid
    })
  }

  handleStateChange(userInput, isValid) {
    if (!isValid) {
      this.setState({
        city: '',
      });
    }
    this.setState({
      stateProv: userInput,
      stateProvIsValid: isValid
    })
  }

  handleCityChange(userInput) {
    this.setState({ city: userInput }, () => {
      document.getElementById("Submit-btn-Country").focus()
    });
  }

  handleTabPress(tabPressed) {
    this.setState({ tabPressed: tabPressed });
  }

  // Dex to use save this down for individual's profile i.e. user/mentor/mentee.timeZone
  handleSubmit(e) {
    const {updateStep} = this.props;
    var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const {updateCountry} = this.props;
    const {countryLocal} = this.state;
    updateCountry(countryLocal);
    updateStep('didCountry');
  }

  canBeSubmitted(countries, states, provinces, ukCounties, ieCounties) {
    const {countryLocal, stateProv, city} = this.state;

    var isCountryOK = countries.map((el) => el.value).indexOf(countryLocal) != -1;

      if (countryLocal != '' && isCountryOK && city != '' && city.length <= 50) {

        if (countryLocal === 'GBR') {
          var isUKCountyOK = ukCounties.map((el) => el.value).indexOf(stateProv) != -1;
          if (stateProv != '' && isUKCountyOK) {
            return true;
          } else {
            return false;
          }

        } else if (countryLocal === 'IRL') {
          var isIECountyOK = ieCounties.indexOf(stateProv) != -1;
          if (stateProv != '' && isIECountyOK) {
            return true;
          } else {
            return false;
          }

        } else if (countryLocal === 'USA') {
          var isStateOK = states.map((el) => el.value).indexOf(stateProv) != -1;
          if (stateProv != '' && isStateOK) {
            return true;
          } else {
            return false;
          }

        } else if (countryLocal === 'CAN') {
          var isProvOK = provinces.map((el) => el.value).indexOf(stateProv) != -1;
          if (stateProv != '' && isProvOK) {
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

  const { countryLocal, countryIsValid, stateProv, stateProvIsValid, city, tabPressed, timeZone } = this.state;
  const {tflink, step, currentStep, totalMenteeSteps, totalMentorSteps, userRole} = this.props;

  var countries = [
    {value: 'AFG', label: 'Afghanistan'},{value: 'ALA', label: 'Aland Islands'},{value: 'ALB', label: 'Albania'},{value: 'DZA', label: 'Algeria'},{value: 'ASM', label: 'American Samoa'},{value: 'AND', label: 'Andorra'},{value: 'AGO', label: 'Angola'},{value: 'AIA', label: 'Anguilla'},{value: 'ATA', label: 'Antarctica'},{value: 'ATG', label: 'Antigua & Barbuda'},{value: 'ARG', label: 'Argentina'},{value: 'ARM', label: 'Armenia'},{value: 'ABW', label: 'Aruba'},{value: 'AUS', label: 'Australia'},{value: 'AUT', label: 'Austria'},{value: 'AZE', label: 'Azerbaijan'},{value: 'BHS', label: 'Bahamas'},{value: 'BHR', label: 'Bahrain'},{value: 'BGD', label: 'Bangladesh'},{value: 'BRB', label: 'Barbados'},{value: 'BLR', label: 'Belarus'},{value: 'BEL', label: 'Belgium'},{value: 'BLZ', label: 'Belize'},{value: 'BEN', label: 'Benin'},{value: 'BMU', label: 'Bermuda'},{value: 'BTN', label: 'Bhutan'},{value: 'BOL', label: 'Bolivia'},{value: 'BES', label: 'Bonaire, Sint Eustatius and Saba'},{value: 'BIH', label: 'Bosnia & Herzegovina'},{value: 'BWA', label: 'Botswana'},{value: 'BVT', label: 'Bouvet Island'},{value: 'BRA', label: 'Brazil'},{value: 'IOT', label: 'British Indian Ocean Territory'},{value: 'VGB', label: 'British Virgin Islands'},{value: 'BRN', label: 'Brunei'},{value: 'BGR', label: 'Bulgaria'},{value: 'BFA', label: 'Burkina Faso'},{value: 'BDI', label: 'Burundi'},{value: 'KHM', label: 'Cambodia'},{value: 'CMR', label: 'Cameroon'},{value: 'CAN', label: 'Canada'},{value: 'CPV', label: 'Cape Verde'},{value: 'CYM', label: 'Cayman Islands'},{value: 'CAF', label: 'Central African Republic'},{value: 'TCD', label: 'Chad'},{value: 'CHL', label: 'Chile'},{value: 'CHN', label: 'China'},{value: 'CXR', label: 'Christmas Island'},{value: 'CCK', label: 'Cocos (Keeling) Islands'},{value: 'COL', label: 'Colombia'},{value: 'COM', label: 'Comoros'},{value: 'COG', label: 'Congo'},{value: 'COK', label: 'Cook Islands'},{value: 'CRI', label: 'Costa Rica'},{value: 'CIV', label: 'Cote d\'Ivoire'},{value: 'HRV', label: 'Croatia'},{value: 'CUB', label: 'Cuba'},{value: 'CUW', label: 'Curacao'},{value: 'CYP', label: 'Cyprus'},{value: 'CZE', label: 'Czech Republic'},{value: 'COD', label: 'Democratic Republic of Congo'},{value: 'DNK', label: 'Denmark'},{value: 'DJI', label: 'Djibouti'},{value: 'DMA', label: 'Dominica'},{value: 'DOM', label: 'Dominican Republic'},{value: 'ECU', label: 'Ecuador'},{value: 'EGY', label: 'Egypt'},{value: 'SLV', label: 'El Salvador'},{value: 'GNQ', label: 'Equatorial Guinea'},{value: 'ERI', label: 'Eritrea'},{value: 'EST', label: 'Estonia'},{value: 'SWZ', label: 'Eswatini'},{value: 'ETH', label: 'Ethiopia'},{value: 'FLK', label: 'Falkland Islands'},{value: 'FRO', label: 'Faroe Islands'},{value: 'FJI', label: 'Fiji'},{value: 'FIN', label: 'Finland'},{value: 'FRA', label: 'France'},{value: 'GUF', label: 'French Guiana'},{value: 'PYF', label: 'French Polynesia'},{value: 'ATF', label: 'French Southern Territories'},{value: 'GAB', label: 'Gabon'},{value: 'GMB', label: 'Gambia'},{value: 'GEO', label: 'Georgia'},{value: 'DEU', label: 'Germany'},{value: 'GHA', label: 'Ghana'},{value: 'GIB', label: 'Gibraltar'},{value: 'GRC', label: 'Greece'},{value: 'GRL', label: 'Greenland'},{value: 'GRD', label: 'Grenada'},{value: 'GLP', label: 'Guadeloupe'},{value: 'GUM', label: 'Guam'},{value: 'GTM', label: 'Guatemala'},{value: 'GGY', label: 'Guernsey'},{value: 'GIN', label: 'Guinea'},{value: 'GNB', label: 'Guinea-Bissau'},{value: 'GUY', label: 'Guyana'},{value: 'HTI', label: 'Haiti'},{value: 'HMD', label: 'Heard Island & McDonald Islands'},{value: 'HND', label: 'Honduras'},{value: 'HKG', label: 'Hong Kong'},{value: 'HUN', label: 'Hungary'},{value: 'ISL', label: 'Iceland'},{value: 'IND', label: 'India'},{value: 'IDN', label: 'Indonesia'},{value: 'IRN', label: 'Iran'},{value: 'IRQ', label: 'Iraq'},{value: 'IRL', label: 'Ireland'},{value: 'IMN', label: 'Isle of Man'},{value: 'ISR', label: 'Israel'},{value: 'ITA', label: 'Italy'},{value: 'JAM', label: 'Jamaica'},{value: 'JPN', label: 'Japan'},{value: 'JEY', label: 'Jersey'},{value: 'JOR', label: 'Jordan'},{value: 'KAZ', label: 'Kazakhstan'},{value: 'KEN', label: 'Kenya'},{value: 'KIR', label: 'Kiribati'},{value: 'RKS', label: 'Kosovo'},{value: 'KWT', label: 'Kuwait'},{value: 'KGZ', label: 'Kyrgyzstan'},{value: 'LAO', label: 'Laos'},{value: 'LVA', label: 'Latvia'},{value: 'LBN', label: 'Lebanon'},{value: 'LSO', label: 'Lesotho'},{value: 'LBR', label: 'Liberia'},{value: 'LBY', label: 'Libya'},{value: 'LIE', label: 'Liechtenstein'},{value: 'LTU', label: 'Lithuania'},{value: 'LUX', label: 'Luxembourg'},{value: 'MAC', label: 'Macau'},{value: 'MKD', label: 'Macedonia'},{value: 'MDG', label: 'Madagascar'},{value: 'MWI', label: 'Malawi'},{value: 'MYS', label: 'Malaysia'},{value: 'MDV', label: 'Maldives'},{value: 'MLI', label: 'Mali'},{value: 'MLT', label: 'Malta'},{value: 'MHL', label: 'Marshall Islands'},{value: 'MTQ', label: 'Martinique'},{value: 'MRT', label: 'Mauritania'},{value: 'MUS', label: 'Mauritius'},{value: 'MYT', label: 'Mayotte'},{value: 'MEX', label: 'Mexico'},{value: 'FSM', label: 'Micronesia'},{value: 'MDA', label: 'Moldova'},{value: 'MCO', label: 'Monaco'},{value: 'MNG', label: 'Mongolia'},{value: 'MNE', label: 'Montenegro'},{value: 'MSR', label: 'Montserrat'},{value: 'MAR', label: 'Morocco'},{value: 'MOZ', label: 'Mozambique'},{value: 'MMR', label: 'Myanmar'},{value: 'NAM', label: 'Namibia'},{value: 'NRU', label: 'Nauro'},{value: 'NPL', label: 'Nepal'},{value: 'NLD', label: 'Netherlands'},{value: 'ANT', label: 'Netherlands Antilles'},{value: 'NCL', label: 'New Caledonia'},{value: 'NZL', label: 'New Zealand'},{value: 'NIC', label: 'Nicaragua'},{value: 'NER', label: 'Niger'},{value: 'NGA', label: 'Nigeria'},{value: 'NIU', label: 'Niue'},{value: 'NFK', label: 'Norfolk Island'},{value: 'PRK', label: 'North Korea'},{value: 'MNP', label: 'Northern Mariana Islands'},{value: 'NOR', label: 'Norway'},{value: 'OMN', label: 'Oman'},{value: 'PAK', label: 'Pakistan'},{value: 'PLW', label: 'Palau'},{value: 'PSE', label: 'Palestine'},{value: 'PAN', label: 'Panama'},{value: 'PNG', label: 'Papua New Guinea'},{value: 'PRY', label: 'Paraguay'},{value: 'PER', label: 'Peru'},{value: 'PHL', label: 'Philippines'},{value: 'PCN', label: 'Pitcairn'},{value: 'POL', label: 'Poland'},{value: 'PRT', label: 'Portugal'},{value: 'PRI', label: 'Puerto Rico'},{value: 'QAT', label: 'Qatar'},{value: 'REU', label: 'Reunion'},{value: 'ROU', label: 'Romania'},{value: 'RUS', label: 'Russia'},{value: 'RWA', label: 'Rwanda'},{value: 'WSM', label: 'Samoa'},{value: 'SMR', label: 'San Marino'},{value: 'STP', label: 'Sao Tome and Principe'},{value: 'SAU', label: 'Saudi Arabia'},{value: 'SEN', label: 'Senegal'},{value: 'SRB', label: 'Serbia'},{value: 'SYC', label: 'Seychelles'},{value: 'SLE', label: 'Sierra Leone'},{value: 'SGP', label: 'Singapore'},{value: 'SXM', label: 'Sint Maarten'},{value: 'SVK', label: 'Slovakia'},{value: 'SVN', label: 'Slovenia'},{value: 'SLB', label: 'Solomon Islands'},{value: 'SOM', label: 'Somalia'},{value: 'ZAF', label: 'South Africa'},{value: 'SGS', label: 'South Georgia & the South Sandwich Islands'},{value: 'KOR', label: 'South Korea'},{value: 'SSD', label: 'South Sudan'},{value: 'ESP', label: 'Spain'},{value: 'LKA', label: 'Sri Lanka'},{value: 'BLM', label: 'St Barthélemy'},{value: 'SHN', label: 'St Helena, Ascension &d Tristan da Cunha'},{value: 'KNA', label: 'St Kitts & Nevis'},{value: 'LCA', label: 'St Lucia'},{value: 'MAF', label: 'St Martin'},{value: 'SPM', label: 'St Pierre & Miquelon'},{value: 'VCT', label: 'St Vincent & the Grenadines'},{value: 'SDN', label: 'Sudan'},{value: 'SUR', label: 'Suriname'},{value: 'SJM', label: 'Svalbard & Jan Mayen'},{value: 'SWE', label: 'Sweden'},{value: 'CHE', label: 'Switzerland'},{value: 'SYR', label: 'Syria'},{value: 'TWN', label: 'Taiwan'},{value: 'TJK', label: 'Tajikistan'},{value: 'TZA', label: 'Tanzania'},{value: 'THA', label: 'Thailand'},{value: 'TLS', label: 'Timor L\'este'},{value: 'TGO', label: 'Togo'},{value: 'TKL', label: 'Tokelau'},{value: 'TON', label: 'Tonga'},{value: 'TTO', label: 'Trinidad & Tobago'},{value: 'TUN', label: 'Tunisia'},{value: 'TUR', label: 'Turkey'},{value: 'TKM', label: 'Turkmenistan'},{value: 'TCA', label: 'Turks & Caicos'},{value: 'TUV', label: 'Tuvalu'},{value: 'UGA', label: 'Uganda'},{value: 'UKR', label: 'Ukraine'},{value: 'ARE', label: 'United Arab Emirates'},{value: 'GBR', label: 'United Kingdom'},{value: 'USA', label: 'United States of America'},{value: 'URY', label: 'Uruguay'},{value: 'VIR', label: 'US Virgin Islands'},{value: 'UZB', label: 'Uzbekistan'},{value: 'VUT', label: 'Vanuatu'},{value: 'VAT', label: 'Vatican City'},{value: 'VEN', label: 'Venezuela'},{value: 'VNM', label: 'Vietnam'},{value: 'WLF', label: 'Wallis & Futuna'},{value: 'YEM', label: 'Yemen'},{value: 'ZMB', label: 'Zambia'},{value: 'ZWE', label: 'Zimbabwe'}
  ]
  var states = [
    {value: 'AL', label: 'Alabama'},{value: 'AK', label: 'Alaska'},{value: 'AZ', label: 'Arizona'},{value: 'AR', label: 'Arkansas'},{value: 'CA', label: 'California'},{value: 'CO', label: 'Colorado'},{value: 'CT', label: 'Connecticut'},{value: 'DE', label: 'Delaware'},{value: 'FL', label: 'Florida'},{value: 'GA', label: 'Georgia'},{value: 'HI', label: 'Hawaii'},{value: 'ID', label: 'Idaho'},{value: 'IL', label: 'Illinois'},{value: 'IN', label: 'Indiana'},{value: 'IA', label: 'Iowa'},{value: 'KS', label: 'Kansas'},{value: 'KY', label: 'Kentucky'},{value: 'LA', label: 'Louisiana'},{value: 'ME', label: 'Maine'},{value: 'MD', label: 'Maryland'},{value: 'MA', label: 'Massachusetts'},{value: 'MI', label: 'Michigan'},{value: 'MN', label: 'Minnesota'},{value: 'MS', label: 'Mississippi'},{value: 'MO', label: 'Missouri'},{value: 'MT', label: 'Montana'},{value: 'NE', label: 'Nebraska'},{value: 'NV', label: 'Nevada'},{value: 'NH', label: 'New Hampshire'},{value: 'NJ', label: 'New Jersey'},{value: 'NM', label: 'New Mexico'},{value: 'NY', label: 'New York'},{value: 'NC', label: 'North Carolina'},{value: 'ND', label: 'North Dakota'},{value: 'OH', label: 'Ohio'},{value: 'OK', label: 'Oklahoma'},{value: 'OR', label: 'Oregon'},{value: 'PA', label: 'Pennsylvania'},{value: 'RI', label: 'Rhode Island'},{value: 'SC', label: 'South Carolina'},{value: 'SD', label: 'South Dakota'},{value: 'TN', label: 'Tennessee'},{value: 'TX', label: 'Texas'},{value: 'UT', label: 'Utah'},{value: 'VT', label: 'Vermont'},{value: 'VA', label: 'Virginia'},{value: 'WA', label: 'Washington'},{value: 'WV', label: 'West Virginia'},{value: 'WI', label: 'Wisconsin'},{value: 'WY', label: 'Wyoming'}
  ]
  var provinces = [
    {value: 'AB', label: 'Alberta'},{value: 'BC', label: 'British Columbia'},{value: 'MB', label: 'Manitoba'},{value: 'NB', label: 'New Brunswick'},{value: 'NL', label: 'Newfoundland & Labrador'},{value: 'NS', label: 'Nova Scotia'},{value: 'ON', label: 'Ontario'},{value: 'PE', label: 'Prince Edward Island'},{value: 'QC', label: 'Quebec'},{value: 'SK', label: 'Saskatchewan'},{value: 'NT', label: 'Northwest Territories'},{value: 'NU', label: 'Nunavut'},{value: 'YT', label: 'Yukon'}
  ]
  var ukCounties = [
    {value: 'Avon', label: 'Avon'},{value: 'Bedf', label: 'Bedfordshire'},{value: 'Buck', label: 'Buckinghamshire'},{value: 'Camb', label: 'Cambridgeshire'},{value: 'Ches', label: 'Cheshire'},{value: 'Clev', label: 'Cleveland'},{value: 'Corn', label: 'Cornwall'},{value: 'Cumb', label: 'Cumbria'},{value: 'Derb', label: 'Derbyshire'},{value: 'Devo', label: 'Devon'},{value: 'Dors', label: 'Dorset'},{value: 'Durh', label: 'Durham'},{value: 'ERYr', label: 'East Riding of Yorkshire'},{value: 'Suss', label: 'East Sussex'},{value: 'Esse', label: 'Essex'},{value: 'Glou', label: 'Gloucestershire'},{value: 'Manc', label: 'Greater Manchester'},{value: 'Hamp', label: 'Hampshire'},{value: 'Hert', label: 'Hertfordshire'},{value: 'Here', label: 'Herefordshire'},{value: 'IOW', label: 'Isle of Wight'},{value: 'Kent', label: 'Kent'},{value: 'Lanc', label: 'Lancashire'},{value: 'Leic', label: 'Leicestershire'},{value: 'Linc', label: 'Lincolnshire'},{value: 'LdBD', label: 'London - Barking and Dagenham'},{value: 'LdBa', label: 'London - Barnet'},{value: 'LdBe', label: 'London - Bexley'},{value: 'LdBr', label: 'London - Brent'},{value: 'LdBro', label: 'London - Bromley'},{value: 'LdCa', label: 'London - Camden'},{value: 'LdCL', label: 'London - City of London'},{value: 'LdCr', label: 'London - Croydon'},{value: 'LdEa', label: 'London - Ealing'},{value: 'LdEn', label: 'London - Enfield'},{value: 'LdGr', label: 'London - Greenwich'},{value: 'LdHa', label: 'London - Hackney'},{value: 'LdHF', label: 'London - Hammersmith and Fulham'},{value: 'LdHry', label: 'London - Haringey'},{value: 'LdHar', label: 'London - Harrow'},{value: 'LdHav', label: 'London - Havering'},{value: 'LdHi', label: 'London - Hillingdon'},{value: 'LdHo', label: 'London - Hounslow'},{value: 'LdIs', label: 'London - Islington'},{value: 'LdKC', label: 'London - Kensington and Chelsea'},{value: 'LdKT', label: 'London - Kingston upon Thames'},{value: 'LdLa', label: 'London - Lambeth'},{value: 'LdLe', label: 'London - Lewisham'},{value: 'LdMe', label: 'London - Merton'},{value: 'LdNe', label: 'London - Newham'},{value: 'LdRe', label: 'London - Redbridge'},{value: 'LdRT', label: 'London - Richmond upon Thames'},{value: 'LdSo', label: 'London - Southwark'},{value: 'LdSu', label: 'London - Sutton'},{value: 'LdTH', label: 'London - Tower Hamlets'},{value: 'LdWF', label: 'London - Waltham Forest'},{value: 'LdWa', label: 'London - Wandsworth'},{value: 'LdWe', label: 'London - Westminster'},{value: 'Mers', label: 'Merseyside'},{value: 'Norf', label: 'Norfolk'},{value: 'Nyor', label: 'North Yorkshire'},{value: 'Ntha', label: 'Northamptonshire'},{value: 'Nthu', label: 'Northumberland'},{value: 'Nott', label: 'Nottinghamshire'},{value: 'Oxfo', label: 'Oxfordshire'},{value: 'Rutl', label: 'Rutland'},{value: 'Shro', label: 'Shropshire'},{value: 'Some', label: 'Somerset'},{value: 'Syor', label: 'South Yorkshire'},{value: 'Staf', label: 'Staffordshire'},{value: 'Suff', label: 'Suffolk'},{value: 'Surr', label: 'Surrey'},{value: 'Tyne', label: 'Tyne and Wear'},{value: 'Warw', label: 'Warwickshire'},{value: 'Wber', label: 'West Berkshire'},{value: 'Wmid', label: 'West Midlands'},{value: 'Wsus', label: 'West Sussex'},{value: 'Wyor', label: 'West Yorkshire'},{value: 'Wilt', label: 'Wiltshire'},{value: 'Worc', label: 'Worcestershire'},{value: 'Angl', label: 'Anglesey'},{value: 'Blae', label: 'Blaenau Gwent'},{value: 'Brec', label: 'Breconshire'},{value: 'Brid', label: 'Bridgend'},{value: 'Caer', label: 'Caernarvonshire'},{value: 'Cphi', label: 'Caerphilly'},{value: 'Card', label: 'Cardiff'},{value: 'Cdgn', label: 'Cardiganshire'},{value: 'Carm', label: 'Carmarthenshire'},{value: 'Conw', label: 'Conwy'},{value: 'Denb', label: 'Denbighshire'},{value: 'Flin', label: 'Flintshire'},{value: 'Glam', label: 'Glamorgan'},{value: 'Neat', label: 'Neath Port Talbot'},{value: 'Meri', label: 'Merionethshire'},{value: 'Mert', label: 'Merthyr Tydfil'},{value: 'Monm', label: 'Monmouthshire'},{value: 'Mont', label: 'Montgomeryshire'},{value: 'Newp', label: 'Newport'},{value: 'Pemb', label: 'Pembrokeshire'},{value: 'Radn', label: 'Radnorshire'},{value: 'Sgla', label: 'South Glamorgan'},{value: 'Torf', label: 'Torfaen'},{value: 'Swan', label: 'Swansea'},{value: 'Wrex', label: 'Wrexham'},{value: 'Aber', label: 'Aberdeen City'},{value: 'Abds', label: 'Aberdeenshire'},{value: 'Angu', label: 'Angus'},{value: 'Argy', label: 'Argyll and Bute'},{value: 'Berw', label: 'Berwickshire'},{value: 'Edin', label: 'City of Edinburgh'},{value: 'Clac', label: 'Clackmannanshire'},{value: 'Dumf', label: 'Dumfries and Galloway'},{value: 'Dund', label: 'Dundee City'},{value: 'Eayr', label: 'East Ayrshire'},{value: 'Edun', label: 'East Dunbartonshire'},{value: 'Elot', label: 'East Lothian'},{value: 'Eren', label: 'East Renfrewshire'},{value: 'Eile', label: 'Eilean Siar'},{value: 'Falk', label: 'Falkirk'},{value: 'Fife', label: 'Fife'},{value: 'Glas', label: 'Glasgow City'},{value: 'High', label: 'Highland'},{value: 'Inve', label: 'Inverclyde'},{value: 'Midl', label: 'Midlothian'},{value: 'Mora', label: 'Moray'},{value: 'Nayr', label: 'North Ayrshire'},{value: 'Nlan', label: 'North Lanarkshire'},{value: 'Orkn', label: 'Orkney Islands'},{value: 'Pert', label: 'Perth and Kinross'},{value: 'Renf', label: 'Renfrewshire'},{value: 'Shet', label: 'Shetland Islands'},{value: 'Sayr', label: 'South Ayrshire'},{value: 'Slan', label: 'South Lanarkshire'},{value: 'Stir', label: 'Stirling'},{value: 'Wdun', label: 'West Dunbartonshire'},{value: 'Wlot', label: 'West Lothian'},{value: 'Antr', label: 'Antrim'},{value: 'Arma', label: 'Armagh'},{value: 'cDow', label: 'County Down'},{value: 'Ferm', label: 'Fermanagh'},{value: 'CoDe', label: 'City of Derry'},{value: 'Lond', label: 'Londonderry'},{value: 'cTyr', label: 'County Tyrone'}
  ]
  var ieCounties = ['Armagh','Carlow','Cavan','Clare','Cork','Derry','Donegal','Down','Dublin','Fermanagh','Galway','Kenmare','Kerry','Kildare','Kilkenny','Laois','Leitrim','Limerick','Longford','Louth','Mayo','Meath','Monaghan','Offaly','Roscommon','Sligo','Tipperary','Tyrone','Waterford','Westmeath','Wexford','Wicklow'];

  const isEnabled = this.canBeSubmitted(countries, states, provinces, ukCounties, ieCounties);

    return (
      <React.Fragment>
        <div>
          <ProgressCircles
            totalSteps={userRole === "mentee" ? totalMenteeSteps : totalMentorSteps}
            currentStep={currentStep}
          />
          <div className='embedded-typeform'>
            <form autoComplete="off">
              <div className="form-group" id="userCountry">
                <label className="descriptor alignLeft reqAsterisk" htmlFor="country">What country are you studying / working in?</label>
                <div className="autocompleter">
                  <Autocomplete
                    suggestions={countries}
                    name='country'
                    placeholder='Country'
                    handleTabPress={this.handleTabPress}
                    handleChange={this.handleCountryChange}
                    focusOnLoad
                    idValue='value'
                    valueToShow='label' // This is the attribute of the array/object to be displayed to user
                    required
                  />
                </div>
              </div>
              {countryLocal === 'USA' && (
                <div className="form-group" id="userState">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="stateprovince">Which State?</label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={states}
                      name='stateprovince'
                      placeholder='State'
                      handleTabPress={this.handleTabPress}
                      handleChange={this.handleStateChange}
                      focusOnLoad={tabPressed ? false : true}
                      idValue='value'
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      required
                    />
                  </div>
                </div>
              )}
              {countryLocal === 'CAN' && (
                <div className="form-group" id="userProvince">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="stateprovince">Which Province?</label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={provinces}
                      name='stateprovince'
                      placeholder='Province'
                      handleTabPress={this.handleTabPress}
                      handleChange={this.handleStateChange}
                      focusOnLoad={tabPressed ? false : true}
                      idValue='value'
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      required
                    />
                  </div>
                </div>
              )}
              {countryLocal === 'GBR' && (
                <div className="form-group" id="userUKCounty">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="stateprovince">Which County?</label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={ukCounties}
                      name='stateprovince'
                      placeholder='County'
                      handleTabPress={this.handleTabPress}
                      handleChange={this.handleStateChange}
                      focusOnLoad={tabPressed ? false : true}
                      idValue='value'
                      valueToShow='label' // This is the attribute of the array/object to be displayed to user
                      required
                    />
                  </div>
                </div>
              )}
              {countryLocal === 'IRL' && (
                <div className="form-group" id="userIECounty">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="stateprovince">Which County?</label>
                  <div className="autocompleter">
                    <Autocomplete
                      suggestions={ieCounties}
                      name='stateprovince'
                      placeholder='County'
                      handleTabPress={this.handleTabPress}
                      handleChange={this.handleStateChange}
                      focusOnLoad={tabPressed ? false : true}
                      required
                    />
                  </div>
                </div>
              )}
              {countryLocal != '' && countryIsValid === true && (stateProv != '' && stateProvIsValid === true || (countryLocal != 'GBR' && countryLocal != 'IRL' && countryLocal != 'USA' && countryLocal != 'CAN')) && (
                <div className="form-group" id="userCity">
                  <label className="descriptor alignLeft reqAsterisk" htmlFor="cityTextBox">{countryLocal != 'GBR' && countryLocal != 'IRL' ? 'Which City?' : 'Which Town/City?'}</label>
                  <TextInput
                    name="city"
                    id="cityTextBox"
                    placeholder="City"
                    className="form-control-std"
                    required
                    maxLength="50"
                  //  handleChange={this.handleCityChange}
                    handleKeyUp={this.handleKeyUp}
                    handleTabPress={this.handleTabPress}
                    onBlur={this.onBlur}
                    focusOnLoad={countryIsValid === true && !tabPressed ? true : false}
                  />
                </div>
              )}
              <button type="button" disabled={!isEnabled} onClick={this.handleSubmit} className="Submit-btn fullWidth" id="Submit-btn-Country">
                Next
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CountryShortSU;
