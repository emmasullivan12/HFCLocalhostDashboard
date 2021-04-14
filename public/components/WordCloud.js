// Dex last merged this code on 10th August 2019

import React, { Component } from "react";
import Chart from 'chart.js/auto';
//import { WordCloudChart } from 'chartjs-chart-wordcloud';

import '../css/Charts.css';

class WordCloud extends Component {
  constructor(props) {
    super(props);
    this.wordCloudRef = React.createRef();
  }

componentDidMount() {
  const {words} = this.props;
  const ctx = this.wordCloudRef.current;

//  this.myChart = new WordCloudChart(ctx, {
  this.myChart = new Chart(ctx, {
//    type: 'wordCloud',
    data: {
      labels: words.map(d => d.key),
      datasets: [
        {
          label: '',
          data: words.map(d => d.value),
        }
      ]
    },
    options: {
      /*animation: {
        easing: 'easeInOutQuad',
        duration: 520
      },*/
      title: {
        display: false,
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      layout: {
        padding: {
          top: 25,
          left: 35,
          right: 25,
          bottom: 10
        }
      },
    }
  });
}

/*componentDidUpdate() {
  const {dataset1} = this.props;

  // On re-render, mutate the data arrays and then update the chart
  this.myChart.data.labels = dataset1.map(d => d.time);
  this.myChart.data.datasets[0].data = dataset1.map(d => d.value);
  this.myChart.update();
}*/

render() {
    return (
      <div className="">
        <canvas ref={this.wordCloudRef} aria-label="Word Cloud"/>
      </div>
    );
  }
}

export default WordCloud;
