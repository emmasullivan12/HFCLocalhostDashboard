// Dex last merged this code on 19th apr 2021

import React, { Component } from "react";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-adapter-date-fns';
import '../css/Charts.css';

class DoughnutChart extends Component {
  constructor(props) {
    super(props);
    this.doughnutChartRef = React.createRef();
  }

componentDidMount() {
  const {showDataLabelsOnSegment, data1Colour, data2Colour, data3Colour, data4Colour, data5Colour, data6Colour, data7Colour, data8Colour, data9Colour, data10Colour, data11Colour, data12Colour, data13Colour, titleText, showTitle, showTooltip, dataset1, dataset1Title, dataset1Colour, showLegend} = this.props;
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
          if (data6Colour) {
            backgroundColoursArr.push(data6Colour)
            if (data7Colour) {
              backgroundColoursArr.push(data7Colour)
              if (data8Colour) {
                backgroundColoursArr.push(data8Colour)
                if (data9Colour) {
                  backgroundColoursArr.push(data9Colour)
                  if (data10Colour) {
                    backgroundColoursArr.push(data10Colour)
                    if (data11Colour) {
                      backgroundColoursArr.push(data11Colour)
                      if (data12Colour) {
                        backgroundColoursArr.push(data12Colour)
                        if (data13Colour) {
                          backgroundColoursArr.push(data13Colour)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
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
    plugins: [ChartDataLabels], // Register the plugin to this chart only
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
        datalabels: {
          display: showDataLabelsOnSegment,
          labels: {
        /*    name: {
              align: 'center',
              anchor: 'center',
              formatter: (value, context) => {
                console.log(context)
                var label = context.chart.data.labels[context.dataIndex];
                return label
              },
              color: 'white',
              offset: 8
            },*/
            value: {
              align: 'start',
              anchor: 'end',
          //    offset: 8,
            /*  borderColor: '#3f3f3f',
              borderWidth: 2,
              borderRadius: 4,*/
              font: {
                size: 12,
              },
              padding: 4,
              formatter: (value, context) => {
                var dataset = context.dataset;
              //  var label = context.chart.data.labels[context.dataIndex];
                var percentage = Math.round(dataset.data[context.dataIndex] * 100) + '%';
              //  return percentage + ', ' + label;
              return percentage
              },
              color: 'white',
              /*color: (context) => {
                console.log(context)
                return context.dataset.backgroundColor[context.dataIndex];
              },*/
              //backgroundColor: '#3f3f3f'
            }
          },
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
            },
            labelTextColor: (item) => {
              if (item.dataset.backgroundColor[item.dataIndex] == "#00B0F0" || item.dataset.backgroundColor[item.dataIndex].includes("rgba(0,176,240")) { // blue which is ineligible on dark background
                return "#95e3ff"; // light blue
              }
              if (item.dataset.backgroundColor[item.dataIndex] == "#4E4ED6" || item.dataset.backgroundColor[item.dataIndex].includes("rgb(78,78,214")) { // purple which is ineligible on dark background
                return "#b0b0ff"; // show light purple
              }
              var backgroundColour = item.dataset.backgroundColor[item.dataIndex]
              var colourToUse = backgroundColour.includes("rgb(") ? (backgroundColour.substr(0,backgroundColour.lastIndexOf(",")) + ")") : backgroundColour // find the last comma i.e. where set transparency
              return colourToUse;
            },
          }
        },
      },
      layout: {
        padding: {
          top: 25,
          left: 35,
          right: 20,
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
  //this.myChart.data.datasets[1].data = dataset2.map(d => d.value);
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
