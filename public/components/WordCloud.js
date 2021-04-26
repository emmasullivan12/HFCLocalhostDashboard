// Dex last merged this code on 26th apr 2021

import React, { Component } from "react";
import ReactWordcloud from 'react-wordcloud';

import '../css/Charts.css';

class WordCloud extends Component {

/*componentDidUpdate() {
  const {dataset1} = this.props;

  // On re-render, mutate the data arrays and then update the chart
  this.myChart.data.labels = dataset1.map(d => d.time);
  this.myChart.data.datasets[0].data = dataset1.map(d => d.value);
  this.myChart.update();
}*/

render() {
  const {words} = this.props;
  const options = {
    colors: ["darkgrey", "lightgrey", "grey",],
    enableTooltip: false,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [15, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [40, -25],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };
  const callbacks = {
    getWordTooltip: word => `${word.value} [${word.value > 1 ? "people" : "person"}] heard about you via "${word.text}".`
  };
    return (
      <div className="wordcloud-container">
        <ReactWordcloud words={words} options={options} callbacks={callbacks} />
      </div>
    );
  }
}

export default WordCloud;
