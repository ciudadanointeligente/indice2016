long_short_data = [ 
  {
    key: 'Normatividad',
    color: '#8ac733',
    values: [
      { 
        "label" : "Argentina" ,
        "n_palabras" : 2160 ,
        "value" : 0.57
      } ,
      { 
        "label" : "Bolivia" ,
        "n_palabras" : 1679 ,
        "value" : 0.62
      } ,
      { 
        "label" : "Chile" ,
        "n_palabras" : 904 ,
        "value" : 0.57
      } ,
      { 
        "label" : "Colombia" ,
        "n_palabras" : 882 ,
        "value" : 0.54
      } ,
      { 
        "label" : "Ecuador" ,
        "n_palabras" : 818 ,
        "value" : 0.62
      } ,
      { 
        "label" : "Guatemala" ,
        "n_palabras" : 806 ,
        "value" : 0.51
      } ,
      { 
        "label" : "México" ,
        "n_palabras" : 789 ,
        "value" : 0.79
      } , 
      { 
        "label" : "Perú" ,
        "n_palabras" : 764 ,
        "value" : 0.53
      } ,
      { 
        "label" : "Venezuela" ,
        "n_palabras" : 649 ,
        "value" : 0.44
      }
    ]
  },
  {
    key: 'Labor del Congreso o Asamblea',
    color: '#00a64b',
    values: [
      { 
        "label" : "Argentina" ,
        "n_palabras" : 1246 ,
        "value" : 0.53
      },
      { 
        "label" : "Bolivia" ,
        "n_palabras" : 861 ,
        "value" : 0.39
      },
      { 
        "label" : "Chile" ,
        "n_palabras" : 42 ,
        "value" : 0.75
      },
      { 
        "label" : "Colombia" ,
        "n_palabras" : 1178 ,
        "value" : 0.55
      },
      { 
        "label" : "Ecuador" ,
        "n_palabras" : 1181 ,
        "value" : 0.46
      },
      { 
        "label" : "Guatemala" ,
        "n_palabras" : 1329 ,
        "value" : 0.56
      },
      { 
        "label" : "México" ,
        "n_palabras" : 301 ,
        "value" : 0.41
      }, 
      { 
        "label" : "Perú" ,
        "n_palabras" : 1324 ,
        "value" : 0.48
      },
      { 
        "label" : "Venezuela" ,
        "n_palabras" : 1947 ,
        "value" : 0.20
      }
    ]
  },
  {
    key: 'Presupuesto y Gestión Administrativa',
    color: '#006fbd',
    values: [
      { 
        "label" : "Argentina" ,
        "n_palabras" : 713 ,
        "value" : 0.27
      },
      { 
        "label" : "Bolivia" ,
        "n_palabras" : 1326 ,
        "value" : 0.31
      },
      { 
        "label" : "Chile" ,
        "n_palabras" : 506 ,
        "value" : 0.61
      },
      { 
        "label" : "Colombia" ,
        "n_palabras" : 522 ,
        "value" : 0.55
      },
      { 
        "label" : "Ecuador" ,
        "n_palabras" : 314 ,
        "value" : 0.47
      },
      { 
        "label" : "Guatemala" ,
        "n_palabras" : 1094 ,
        "value" : 0.56
      },
      { 
        "label" : "México" ,
        "n_palabras" : 339 ,
        "value" : 0.44
      }, 
      { 
        "label" : "Perú" ,
        "n_palabras" : 118 ,
        "value" : 0.37
      },
      { 
        "label" : "Venezuela" ,
        "n_palabras" : 0 ,
        "value" : 0.07
      }
    ]
  },
  {
    key: 'Participación, atención ciudadana y rendición de cuentas',
    color: '#00b4f2',
    values: [
      { 
        "label" : "Argentina" ,
        "n_palabras" : 713 ,
        "value" : 0.32
      },
      { 
        "label" : "Bolivia" ,
        "n_palabras" : 1326 ,
        "value" : 0.64
      },
      { 
        "label" : "Chile" ,
        "n_palabras" : 506 ,
        "value" : 0.59
      },
      { 
        "label" : "Colombia" ,
        "n_palabras" : 522 ,
        "value" : 0.52
      },
      { 
        "label" : "Ecuador" ,
        "n_palabras" : 314 ,
        "value" : 0.73
      },
      { 
        "label" : "Guatemala" ,
        "n_palabras" : 1094 ,
        "value" : 0.69
      },
      { 
        "label" : "México" ,
        "n_palabras" : 339 ,
        "value" : 0.57
      }, 
      { 
        "label" : "Perú" ,
        "n_palabras" : 118 ,
        "value" : 0.63
      },
      { 
        "label" : "Venezuela" ,
        "n_palabras" : 0 ,
        "value" : 0.25
      }
    ]
  }
];


var chart;
nv.addGraph(function() {
  chart = nv.models.multiBarHorizontalChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .margin({top: 0, right: 0, bottom: 0, left: 230})
      .showValues(true)
      .tooltip(false)
      // .barColor(d3.scale.category20().range())
      .transitionDuration(250)
      .stacked(false)
      .showControls(false);

  chart.valueFormat(d3.format('%'));
  chart.xAxis
      .showMaxMin(false)

  // chart.yAxis
  //     .tickFormat(d3.format('%'));

  chart.forceY([0,1]);

  d3.select('#chart1 svg')
      .datum(long_short_data)
      .call(chart);

  nv.utils.windowResize(chart.update);

  chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

  return chart;
});
