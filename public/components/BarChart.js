// Dex last merged this code on 2nd june 2021

import React, { Component } from "react";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import '../css/Charts.css';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.barChartRef = React.createRef();
  }

componentDidMount() {
  const {showTitleAndPercentLabels, showDataLabelsOnBar, showTitle, titleText, showTooltip, showHorizontal, stacked, barLabelFont, datasetToShowBarLabel, barLabelToShow, dataset1, dataset1Title, dataset1Colour, dataset1Fill, dateset1HoverFill, dataset2, dataset2Title, dataset2Colour, dataset2Fill, dateset2HoverFill, dataset3, dataset3Title, dataset3Colour, dataset3Fill, dateset3HoverFill, dataset4, dataset4Title, dataset4Colour, dataset4Fill, dateset4HoverFill, dataset5, dataset5Title, dataset5Colour, dataset5Fill, dateset5HoverFill, dataset6, dataset6Title, dataset6Colour, dataset6Fill, dateset6HoverFill, dataset7, dataset7Title, dataset7Colour, dataset7Fill, dateset7HoverFill, showLegend} = this.props;
  const ctx = this.barChartRef.current;

  var datasetsArr = [{
    label: dataset1Title,
    data: dataset1.map(d => d.value),
    backgroundColor: dataset1Fill,
    hoverBackgroundColor: dateset1HoverFill,
    borderColor: dataset1Colour,
    borderWidth: 1,
    borderRadius: stacked ? 0 : 5
  }]

  if (dataset2) {
    datasetsArr.push({
      label: dataset2Title,
      data: dataset2.map(d => d.value),
      backgroundColor: dataset2Fill,
      hoverBackgroundColor: dateset2HoverFill,
      borderColor: dataset2Colour,
      borderWidth: 1,
      borderRadius: stacked ? 0 : 5
    })
    if (dataset3) {
      datasetsArr.push({
        label: dataset3Title,
        data: dataset3.map(d => d.value),
        backgroundColor: dataset3Fill,
        hoverBackgroundColor: dateset3HoverFill,
        borderColor: dataset3Colour,
        borderWidth: 1,
        borderRadius: stacked ? 0 : 5
      })
      if (dataset4) {
        datasetsArr.push({
          label: dataset4Title,
          data: dataset4.map(d => d.value),
          backgroundColor: dataset4Fill,
          hoverBackgroundColor: dateset4HoverFill,
          borderColor: dataset4Colour,
          borderWidth: 1,
          borderRadius: stacked ? 0 : 5
        })
        if (dataset5) {
          datasetsArr.push({
            label: dataset5Title,
            data: dataset5.map(d => d.value),
            backgroundColor: dataset5Fill,
            hoverBackgroundColor: dateset5HoverFill,
            borderColor: dataset5Colour,
            borderWidth: 1,
            borderRadius: stacked ? 0 : 5
          })
          if (dataset6) {
            datasetsArr.push({
              label: dataset6Title,
              data: dataset6.map(d => d.value),
              backgroundColor: dataset6Fill,
              hoverBackgroundColor: dateset6HoverFill,
              borderColor: dataset6Colour,
              borderWidth: 1,
              borderRadius: stacked ? 0 : 5
            })
            if (dataset7) {
              datasetsArr.push({
                label: dataset7Title,
                data: dataset7.map(d => d.value),
                backgroundColor: dataset7Fill,
                hoverBackgroundColor: dateset7HoverFill,
                borderColor: dataset7Colour,
                borderWidth: 1,
                borderRadius: stacked ? 0 : 5
              })
            }
          }
        }
      }
    }
  }

  this.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dataset1.map(d => d.label),
      datasets: datasetsArr
    },
    plugins: [ChartDataLabels], // Register the plugin to this chart only
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: showHorizontal == true ? 'y' : 'x',
      hover: {
        mode: null // not perfect but helps prevent flickering due to animation onComplete
      },
      animation: {
        easing: 'easeInOutQuad',
        duration: 520,
        onComplete: () => {
          ctx.getContext('2d').textBaseline = 'bottom';
          if (barLabelFont) {
            ctx.getContext('2d').font = barLabelFont;
          }

          if (showTitleAndPercentLabels == true) {

            var datasets = this.myChart.config.data.datasets

            // add left hand label
              var title = datasets[0].label
              var meta1 = this.myChart.getDatasetMeta(0);

              ctx.getContext('2d').textAlign = 'left';

              meta1.data.forEach((bar, index) => {
                ctx.getContext('2d').fillText(title, bar.base, bar.y - 10);
              });

            // add right hand label
              var percentage = Math.round(datasets[0].data[0] * 100) + "%"
              var meta2 = this.myChart.getDatasetMeta(0);

              ctx.getContext('2d').textAlign = 'right';

              meta2.data.forEach((bar1, index) => {
            //    at 860px to 1144px wide the padding increases for some reason, making text slightly offset
                ctx.getContext('2d').fillText(percentage, this.myChart.chartArea.right, bar1.y - 10);
              });

          } else {
            ctx.getContext('2d').textAlign = 'center';

            this.myChart.config.data.datasets.forEach((dataset, i) => {
              var meta = this.myChart.getDatasetMeta(i);
              ctx.getContext('2d').fillStyle = dataset.borderColor;

              if (datasetToShowBarLabel == 'all' || dataset.label == datasetToShowBarLabel) {
                meta.data.forEach((bar, index) => {
                  var data = barLabelToShow == 'data' ? dataset.data[index] : barLabelToShow;
                  ctx.getContext('2d').fillText(data, bar.x, bar.y - 5);
                });
              }
            });
          }

        }
      },
      interaction: {
        mode: 'point'
      },
      plugins: {
        title: {
          display: showTitle,
          text: titleText
        },
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
        datalabels: {
          display: showDataLabelsOnBar == true,
          color: (context) => {
            return context.dataset.borderColor;
          },
          formatter: (value, context) => {
            return Math.round(value * 100) + '%' // Show percentage
          },
          align: 'center',
          anchor: 'center'
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
            labelTextColor: (item) => {
              if (item.dataset.borderColor == "#00B0F0") { // blue which is ineligible on dark background
                return "#95e3ff"; // light blue
              }
              if (item.dataset.borderColor == "#4E4ED6") { // purple which is ineligible on dark background
                return "#b0b0ff"; // show light purple
              }
              return item.dataset.borderColor;
            },
            label: (item) => {
              var dataLabel = item.dataset.label
              var labelToShow = stacked == true ? (Math.round(item.formattedValue * 100) + "%") : (item.formattedValue + " " + dataLabel)
              return `${labelToShow}`
            }
          }
        }
      },
      layout: {
        padding: {
          top: 35,
          left: 35,
          right: 35,
          bottom: 20
        }
      },
      scales: {
        x: {
          categoryPercentage: 0.6,
          ticks: {
            display: showHorizontal == true ? false : true, // Hide x axes if is horizontal bar
            font: {
              size: 10,
            },
            padding: 2,
            autoSkip: false,
//            autoSkipPadding: 1,
            maxRotation: 90, // to keep horizontal
            minRotation: 0, // to keep horizontal
          },
          grid: {
            display: false,
            drawBorder: showHorizontal == true ? false : true, // Hide x axes if is horiztonal bar
          },
          stacked: stacked
        },
        y: {
          beginAtZero: true,
          ticks: {
            display: false,
            min: 0
          },
          grid: {
            display: false,
            drawBorder: false,
          },
          stacked: stacked
        }
      },
    }
  });
}

componentDidUpdate() {
  const {dataset1, dataset2} = this.props;

  // On re-render, mutate the data arrays and then update the chart
  // if doesnt work see https://www.chartjs.org/docs/latest/developers/updates.html
  this.myChart.data.labels = dataset1.map(d => d.label);
  this.myChart.data.datasets[0].data = dataset1.map(d => d.value);
  this.myChart.data.datasets[1].data = dataset2.map(d => d.value);
  this.myChart.update();
}

render() {
    return (
      <div className="barChart-container">
        <canvas ref={this.barChartRef} aria-label="Bar Chart" />
      </div>
    );
  }
}

export default BarChart;
