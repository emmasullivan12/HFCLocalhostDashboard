// Dex last merged this code on 19th apr 2021
import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.none.min.js';
import * as d3 from 'd3';
import topojson from "topojson";
//import gbrJson from './gbr.topo.json';
//import canadaJson from './canada.topo.json';
//import usaJson from './usa.topo.json';
import {cdn, jsFolder} from './CDN.js';

class ChoroplethMap extends Component {
  constructor(props) {
    super(props);
    window.addEventListener('resize', this.resizeMap);
  }

  componentDidMount(){
    const {name, country, data, countLabel, colourScheme, hoverBorderColour} = this.props;

    //var Datamap = require('datamaps/dist/datamaps.' + (country == 'usa' ? country : 'none') + '.min.js');
    //let countryJson = (require('./' + country + '.topo.json'));
    //console.log(countryJson)

    var dataset = {};

    // We need to colorize every country based on "numberOfWhatever"
    var onlyValues = data.map((obj) => { return obj[1]; });
    var minValue = Math.min.apply(null, onlyValues),
        maxValue = Math.max.apply(null, onlyValues);

    // create color palette function
    // color can be whatever you wish
    var paletteScale = d3.scale.linear()
          .domain([minValue,maxValue])
          .range(["#ffffff", colourScheme]); // from white to whatever colour is chosen

    // fill dataset in appropriate format
    data.forEach((item) => { //
      var iso = item[0],
          value = item[1];
      dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
    });

    var map = new Datamap({
      scope: country,
      element: document.getElementById("choropleth_map-" + name),
      responsive: true,
      data: dataset,
      geographyConfig: {
    /*    dataJson: country == 'usa' ? JSON.stringify(usaJson) : (
          country == 'gbr' ? JSON.stringify(gbrJson) : (
            country == 'can' ? JSON.stringify(canadaJson) : null
          )
        ),*/
      //  dataJson: countryJson,
        dataUrl: country == 'usa' ? 'https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/usa.topo.json' : 'https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/canada.topo.json',
        //dataUrl: cdn + '/' + jsFolder + '/' + country + '.topo.json',
        borderColor: '#DEDEDE',
        highlightBorderWidth: 1,
        highlightBorderColor: hoverBorderColour,
        highlightFillColor: (geo) => {
          return geo['fillColor'] || '#F5F5F5';
        },
        popupTemplate: (geography, data) => {
          // don't show tooltip if country isn't present in dataset
          if (!data) { return ; }

          return ['<div class="mapTooltip">',
            '<strong>', geography.properties.name, '</strong>',
            '<br>', countLabel, ': <strong>', data.numberOfThings, '</strong>',
            '</div>'].join('');
        },
      },

      fills: {
      //  'Republican': '#CC4731',
      //  'Democrat': '#306596',
      //  'Heavy Democrat': '#667FAF',
      //  'Light Democrat': '#A9C0DE',
      //  'Heavy Republican': '#CA5E5B',
      //  'Light Republican': '#EAA9A8',
        defaultFill: '#f5f5f5'
      },
      setProjection: country == 'usa' ? null : (element, options) => {
        let lat, long, projection
        if (country == 'gbr') {
          lat = -3.4360 // 3.4360° W
          long = 55.3781 // 55.3781° N
        } else if (country == 'canada') {
          lat = -106.3468 // 106.3468° W
          long = 56.1304 // 68.1304 or 56.1304° N
        } else if (country == 'aus') {
          lat = 133.7751 // 133.7751° E
          long = -25.2744 // 25.2744° S
        } else if (country == 'nzl') {
          lat = 174.8860 // 174.8860° E
          long = -40.9006 // 40.9006° S
        }
        if (country == 'gbr') {
          projection = d3.geo.albers()
            .center([lat, long]) // always in [East Latitude, North Longitude]
            .rotate([4.4, 0])
            .parallels([50,60])
            .scale(1800)
            .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
        } else {
          projection = d3.geo.mercator()
            .center([lat, long]) // always in [East Latitude, North Longitude]
            .scale(200)
            .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
        }
        var path = d3.geo.path().projection(projection);
        return { path: path, projection: projection };
      }
    });
    this.map = map;

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeMap);
  }

  resizeMap = () => {
    if (this.map) {
      this.map.resize()
    }
  }

  render() {
    const {name, country} = this.props;

    return (
      <div
        id={"choropleth_map-" + name}
        className={"choroplethMap "+country}
//        style={{width: "500px", height: "300px"}}
      />
    );
  }
}

export default ChoroplethMap;
