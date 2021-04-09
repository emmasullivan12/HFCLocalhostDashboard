// Dex last merged this code on 10th August 2019

import React, { Component } from "react";
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import '../css/Charts.css';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.lineChartRef = React.createRef();
  }

componentDidMount() {
  const {dataset1, dataset1Title, dataset1Colour, dataset1gradientColour1, dataset1gradientColour2, dataset1gradientColour3, dataset2gradientColour1, dataset2gradientColour2, dataset2gradientColour3, dataset2, dataset2Title, dataset2Colour, showLegend} = this.props;
  const ctx = this.lineChartRef.current;
  const {height: graphHeight} = ctx;

  /* calculate gradient angle */
  //var angle = 25 * Math.PI / 180; // 65 degree angle
  //var x2 = 300 * Math.cos(angle);
  //var y2 = 300 * Math.sin(angle);

  /* mentee line gradient */
  //var gradient1 = this.lineChartRef.current.getContext('2d').createLinearGradient(0, 0, x2, y2);
  var gradient1 = ctx.getContext('2d').createLinearGradient(0, 0, 0, graphHeight);
    gradient1.addColorStop(0, 'rgba(' + dataset1gradientColour1 +')');
    gradient1.addColorStop(1, 'rgba(' + dataset1gradientColour3 +')');

  /* mentor line gradient */
  //var gradient2 = this.lineChartRef.current.getContext('2d').createLinearGradient(0, 0, x2, y2);
  var gradient2 = ctx.getContext('2d').createLinearGradient(0, 0, 0, graphHeight);
    gradient2.addColorStop(0, 'rgba(' + dataset2gradientColour1 +')');
    gradient2.addColorStop(1, 'rgba(' + dataset2gradientColour3 +')');

  this.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dataset1.map(d => d.time),
      datasets: [
        {
          label: dataset1Title,
          data: dataset1.map(d => d.value),
          backgroundColor: gradient1,
          strokeColor: dataset1Colour,
          pointBackgroundColor: dataset1Colour,
          pointBorderWidth: 0,
          pointHoverRadius: 3,
          borderColor: dataset1Colour,
          borderWidth: 3,
          order: 2,
          fill: 1, /* fill with background colour up to dataset 1 */
        },
        {
          label: dataset2Title,
          data: dataset2.map(d => d.value),
          backgroundColor: gradient2,
          strokeColor: dataset2Colour,
          pointBackgroundColor: dataset2Colour,
          pointBorderWidth: 0,
          pointHoverRadius: 3,
          borderColor: dataset2Colour,
          borderWidth: 3,
          order: 1,
          fill: 'origin'
        }
      ]
    },
    options: {
      spanGaps: true,
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        easing: 'easeInOutQuad',
        duration: 520
      },
      plugins: {
        legend: {
          display: showLegend,
        },
        tooltip: {
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
              var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
              var date = new Date(item[0].label)
              var month = months[date.getMonth()];
              var year = date.getFullYear();
              return `${month + " " + year}`
            },
            label: (item) => {
              var dataLabel = item.dataset.label
              return `${item.formattedValue + " " + dataLabel}`
            }
          }
        }
      },
      layout: {
        padding: {
          top: 25,
          left: 35,
          right: 25,
          bottom: 10
        }
      },
      scales: {
        x: {
          type: 'time',
          distribution: 'timeseries',
          time: {
            unit: 'month',
            tooltipFormat: 'MMM yyyy',
          },
          grid: {
          //  display: false,
            color: "#f2f2f2",
            drawBorder: false,
            zeroLineColor: "#f2f2f2",
          },
        //  max: 4,
          ticks: {
            font: {
              size: 10,
            },
            maxTicksLimit: 4,
            maxRotation: 0, // to keep horizontal
            minRotation: 0, // to keep horizontal
          //  autoSkip: true, // doesnt work with maxTicksLimit
          //  autoSkipPadding: 20,
          },
        },
        y: {
          stacked: true,
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            min: 0,
            display: false
          },
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
        <canvas ref={this.lineChartRef} aria-label="Line Chart"/>
      </div>
    );
  }
}

export default LineChart;
