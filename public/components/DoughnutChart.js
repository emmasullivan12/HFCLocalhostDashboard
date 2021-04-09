// Dex last merged this code on 10th August 2019

import React, { Component } from "react";
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import '../css/Charts.css';

class DoughnutChart extends Component {
  constructor(props) {
    super(props);
    this.doughnutChartRef = React.createRef();
  }

componentDidMount() {
  const {showDataLabelsOnBar, data1Colour, data2Colour, data3Colour, data4Colour, data5Colour, titleText, showTitle, showTooltip, dataset1, dataset1Title, dataset1Colour, showLegend} = this.props;
  const ctx = this.doughnutChartRef.current;

  var backgroundColoursArr = [
    data1Colour,
  ]

  if (data2Colour) {
    backgroundColoursArr.push(data2Colour)
    if (data3Colour) {
      backgroundColoursArr.push(data3Colour)
      if (data4Colour) {
        backgroundColoursArr.push(data4Colour)
        if (data5Colour) {
          backgroundColoursArr.push(data5Colour)
        }
      }
    }
  }

  this.myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: dataset1.map(d => d.label),
      datasets: [
        {
          label: dataset1Title,
          data: dataset1.map(d => d.value),
          backgroundColor: backgroundColoursArr,
          hoverOffset: 2,
        },
      ]
    },
    options: {
      responsive: true,
    /*  animation: {
        easing: 'easeInOutQuad',
        duration: 520
      },*/
      plugins: {
        legend: {
          display: showLegend,
          position: 'bottom',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            font: {
              size: 10,
            }
          }
        },
        title: {
          display: showTitle,
          text: titleText,
        },
        tooltip: showTooltip == false ? false : {
          displayColors: false,
          titleFont: {
            size: 14,
          },
          bodyFont: {
            size: 12,
          },
          xPadding: 10,
          yPadding: 10,
          callbacks: {
            title: (item) => {
              return `${item[0].label}`
            },
            label: (item) => {
              var percentage = Math.round(item.formattedValue * 100) // Show percentage
              return `${percentage + "%"}`
            }
          }
        },
        datalabels: {
          display: showDataLabelsOnBar == true,
          color: '3f3f3f',
/*          color: (context) => {
            return context.dataset.borderColor;
          },*/
          formatter: (value, context) => {
            console.log(context)
            console.log(value)
            return Math.round(value * 100) + '%' // Show percentage
          },
          align: 'center',
          anchor: 'center'
        },
      },
      layout: {
        padding: {
          top: 25,
          left: 25,
          right: 15,
          bottom: 10
        }
      },
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
      <div className="lineChart-container">
        <canvas ref={this.doughnutChartRef} aria-label="Line Chart"/>
      </div>
    );
  }
}

export default DoughnutChart;
