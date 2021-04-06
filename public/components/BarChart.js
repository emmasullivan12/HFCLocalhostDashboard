// Dex last merged this code on 10th August 2019

import React, { Component } from "react";
import {Chart} from 'chart.js';
import '../css/Charts.css';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.barChartRef = React.createRef();
  }

componentDidMount() {
  const {dataset1, dataset1Title, dataset1Colour, dataset1Fill, dataset1gradientColour1, dataset1gradientColour2, dataset1gradientColour3, dataset2gradientColour1, dataset2gradientColour2, dataset2gradientColour3, dataset2, dataset2Title, dataset2Colour, dataset2Fill, showLegend} = this.props;
  const ctx = this.barChartRef.current;

  this.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dataset1.map(d => d.label),
      datasets: [
        {
          label: dataset1Title,
          data: dataset1.map(d => d.value),
          backgroundColor: dataset1Fill,
          borderColor: dataset1Colour,
          borderWidth: 1,
          borderRadius: 5
        },
        {
          label: dataset2Title,
          data: dataset2.map(d => d.value),
          backgroundColor: dataset2Fill,
          borderColor: dataset2Colour,
          borderWidth: 1,
          borderRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        easing: 'easeInOutQuad',
        duration: 520
      },
      legend: {
        display: showLegend,
      },
      layout: {
        padding: {
          top: 25,
          left: 25,
          right: 25,
          bottom: 10
        }
      },
      scales: {
        x: [{
          categoryPercentage: 0.6,
          ticks: {
            fontSize: 10,
            maxRotation: 0, // to keep horizontal
            minRotation: 0, // to keep horizontal
          },
          gridLines: {
            display: false,
          //  drawBorder: false,
          }
        }],
        y: [{
          beginAtZero: true,
          ticks: {
            display: false,
            min: 0
          },
          gridLines: {
            display: false,
          //  drawBorder: false
          }
        }]
      },
      tooltips: {
        displayColors: false,
        titleFontSize: 14,
        bodyFontSize: 12,
        xPadding: 10,
        yPadding: 10,
        callbacks: {
          title: (tooltipItem) => {
            return `${tooltipItem[0].label}`
          },
          label: (tooltipItem, data) => {
            var dataLabel = data.datasets[tooltipItem.datasetIndex].label
            return `${tooltipItem.value + " " + dataLabel}`
          }
        }
      }
    }
  });
}

componentDidUpdate() {
  const {dataset1, dataset2} = this.props;

  // On re-render, mutate the data arrays and then update the chart
  this.myChart.data.labels = dataset1.map(d => d.time);
  this.myChart.data.datasets[0].data = dataset1.map(d => d.value);
  this.myChart.data.datasets[1].data = dataset2.map(d => d.value);
  this.myChart.update();
}

render() {
    return (
      <div className="barChart-container">
        <canvas ref={this.barChartRef} />
      </div>
    );
  }
}

export default BarChart;
