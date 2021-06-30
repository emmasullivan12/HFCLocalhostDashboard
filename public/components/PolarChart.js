// Dex last merged this code on 30th june 2021

import React, { Component } from "react";
import Chart from 'chart.js/auto';
import '../css/Charts.css';

class PolarChart extends Component {
  constructor(props) {
    super(props);
    this.polarChartRef = React.createRef();
  }

componentDidMount() {
  const {dataLabels} = this.props;
  const {dataset1, dataset1Title, dataset1FillArr, dataset1BorderColorArr, dataset1HoverFillArr, dataset1LabelTextArr, showTicks, showLegend} = this.props;
  const ctx = this.polarChartRef.current;
  const {height: graphHeight} = ctx;

  this.myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: dataset1.map(d => d.label),
      datasets: [
        {
          label: dataset1.map(d => d.label),
          data: dataset1.map(d => d.value),
          backgroundColor: dataset1FillArr,
          borderColor: dataset1BorderColorArr,
          hoverBackgroundColor: dataset1HoverFillArr,
        },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
              return `${item[0].dataset.label[item[0].dataIndex]}`
            },
            labelTextColor: (item) => {
              if (item.dataset.backgroundColor[item.dataIndex] == "#00B0F0" || item.dataset.backgroundColor[item.dataIndex].includes("rgba(0,176,240")) { // blue which is ineligible on dark background
                return "#95e3ff"; // light blue
              }
              if (item.dataset.backgroundColor[item.dataIndex] == "#4E4ED6" || item.dataset.backgroundColor[item.dataIndex].includes("rgba(78,78,214")) { // purple which is ineligible on dark background
                return "#b0b0ff"; // show light purple
              }
              return item.dataset.borderColor[item.dataIndex];
            },
            label: (item) => {
              const textToShow = dataset1LabelTextArr[item.formattedValue - 1].label
              return `${"You displayed this: " + textToShow}`
            },

          }
        }
      },
      scales: {
        r: {
          ticks: {
            display: showTicks,
            stepSize: 1,
            backdropColor: 'rgba(0,0,0,0)',
            font: {
              size: 10,
            },
          },
        },
      },
    }
  });
}

componentDidUpdate() {
  const {dataset1} = this.props;

  // On re-render, mutate the data arrays and then update the chart
  this.myChart.data.labels = dataset1.map(d => d.time);
  this.myChart.data.datasets[0].data = dataset1.map(d => d.value);
  this.myChart.update();
}

render() {
    return (
      <div className="polarChart-container">
        <canvas ref={this.polarChartRef} aria-label="Polar Chart"/>
      </div>
    );
  }
}

export default PolarChart;
