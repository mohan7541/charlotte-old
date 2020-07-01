function loadMyStatPolarChart(){
    new Chart(document.getElementById("chart-0"),{
        "type":"polarArea",
        "data":{"labels":["Recycle","ReUse","ReFill"],
                "datasets":[{"label":"My Stats",
                             "data":[10,25,15],
                             "backgroundColor":["rgb(75, 192, 192)","rgb(255, 205, 86)","rgb(54, 162, 235)"]
                            }]
                }
        });
}

function loadMyCircleRadarChart(){
    new Chart(document.getElementById("chart-0"),
        {"type":"radar",
         "data":{"labels":["Me","Razikh","Priya","Melody","Frank","May","Faith"],
         "datasets":[{"label":"Recycle",
                     "data":[65,59,90,81,56,55,40],
                     "fill":true,
                     "backgroundColor":"rgba(75, 192, 192, 0.2)",
                     "borderColor":"rgb(75, 192, 192)",
                     "pointBackgroundColor":"rgb(75, 192, 192)",
                     "pointBorderColor":"#fff",
                     "pointHoverBackgroundColor":"#fff",
                     "pointHoverBorderColor":"rgb(75, 192, 192)"},
                     {"label":"ReUse",
                       "data":[28,48,40,19,96,27,100],
                       "fill":true,
                       "backgroundColor":"rgba(255, 205, 86, 0.2)",
                       "borderColor":"rgb(255, 205, 86)",
                       "pointBackgroundColor":"rgb(255, 205, 86)",
                       "pointBorderColor":"#fff",
                       "pointHoverBackgroundColor":"#fff",
                       "pointHoverBorderColor":"rgb(255, 205, 86)"},
                     {"label":"ReFill",
                       "data":[38,58,50,29,86,37,90],
                       "fill":true,
                       "backgroundColor":"rgba(54, 162, 235, 0.2)",
                       "borderColor":"rgb(54, 162, 235)",
                       "pointBackgroundColor":"rgb(54, 162, 235)",
                       "pointBorderColor":"#fff",
                       "pointHoverBackgroundColor":"#fff",
                       "pointHoverBorderColor":"rgb(54, 162, 235)"}
                    ]},"options":{"elements":{"line":{"tension":0,"borderWidth":3}}}});
}


function testStackedRadial(){
    var options = {
  chart: {
    height: 280,
    type: "radialBar",
  },

  series: [67],
  colors: ["#20E647"],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "70%",
        background: "#293450"
      },
      track: {
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 4,
          opacity: 0.15
        }
      },
      dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "13px"
        },
        value: {
          color: "#fff",
          fontSize: "30px",
          show: true
        }
      }
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      gradientToColors: ["#87D4F9"],
      stops: [0, 100]
    }
  },
  stroke: {
    lineCap: "round"
  },
  labels: ["Progress"]
};
}

function loadMyDashboardRadial(){
    var options = {
          series: [75, 85, 95], colors: ["rgb(107,142,35)","rgb(30,144,255)","rgb(255,165,0)"],
          chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
           track: {
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  blur: 4,
                  opacity: 0.15
                }
              },   
            dataLabels: {
              name: {
                fontSize: '22px',
              },
              value: {
                fontSize: '16px',
              },
              total: {
                show: true,
                label: 'Ambassador',
                //image:'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return '';
                  //
                }
              }
            }
          },
        },
        stroke: {
           lineCap: "round"
        },
        labels: ['Reuse', 'Recycle', 'Refill'],
        };

        var chart = new ApexCharts(document.querySelector("#myScoreRingChart"), options);
        chart.render();
}


function loadMyDashboardRounds(seriesData,seriesColor,gradientColor,seriesLabel,objID){
    var options = {
          series: [seriesData], colors: [seriesColor],
          chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
           track: {
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  blur: 4,
                  opacity: 0.15
                }
              },   
            dataLabels: {
              name: {
                fontSize: '45px',
              },
              value: {
                fontSize: '26px',
              },
              total: {
                show: true,
                label: seriesLabel,
                //image:'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return '';
                  //
                }
              }
            }
          },
        },
        
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      gradientToColors: [gradientColor],
      stops: [0, 100]
    }
  },
        stroke: {
           lineCap: "round"
        },
        labels: [seriesLabel],
        };

        var chart = new ApexCharts(document.querySelector("#"+objID), options);
        chart.render();
}


function loadChartRound(seriesData,seriesColor,gradientColor,seriesValue,seriesLabel,objID){
    var options = {
          series: [seriesData],
          chart: {
          height: 350,
          type: 'radialBar',
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
             hollow: {
              margin: 0,
              size: '70%',
              background: '#fff',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: '#fff',
              strokeWidth: '67%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
        
            dataLabels: {
              show: true,
             
              value: {
                formatter: function(val) {
                  //return parseInt(val);
                  return seriesValue;
                },
                color: '#111',
                fontSize: '60px',
                show: true,
              },name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '34px'
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#ABE5A1'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: [seriesLabel],
        };

        var chart = new ApexCharts(document.querySelector("#"+objID), options);
        chart.render();
}