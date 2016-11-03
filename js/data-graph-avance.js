long_short_data = [ 
  {
    key: '2014',
    color: '#00b4f2',
    values: [
      { 
        "label" : "Argentina" ,
        "n_palabras" : 2160 ,
        "value" : 0.34
      } ,
      { 
        "label" : "Bolivia" ,
        "n_palabras" : 1679 ,
        "value" : 0.23
      } ,
      { 
        "label" : "Chile" ,
        "n_palabras" : 904 ,
        "value" : 0.54
      } ,
      { 
        "label" : "Colombia" ,
        "n_palabras" : 882 ,
        "value" : 0.39
      } ,
      { 
        "label" : "Ecuador" ,
        "n_palabras" : 818 ,
        "value" : 0.49
      } ,
      { 
        "label" : "Guatemala" ,
        "n_palabras" : 806 ,
        "value" : 0.46
      } ,
      { 
        "label" : "México" ,
        "n_palabras" : 789 ,
        "value" : 0.35
      } , 
      { 
        "label" : "Perú" ,
        "n_palabras" : 764 ,
        "value" : 0.54
      } ,
      { 
        "label" : "Venezuela" ,
        "n_palabras" : 649 ,
        "value" : 0.19
      }
    ]
  },
  {
    key: '2016',
    color: '#E84A5F',
    values: [
      { 
        "label" : "Argentina" ,
        "n_palabras" : 1246 ,
        "value" : 0.39
      },
      { 
        "label" : "Bolivia" ,
        "n_palabras" : 861 ,
        "value" : 0.47
      },
      { 
        "label" : "Chile" ,
        "n_palabras" : 42 ,
        "value" : 0.64
      },
      { 
        "label" : "Colombia" ,
        "n_palabras" : 1178 ,
        "value" : 0.54
      },
      { 
        "label" : "Ecuador" ,
        "n_palabras" : 1181 ,
        "value" : 0.56
      },
      { 
        "label" : "Guatemala" ,
        "n_palabras" : 1329 ,
        "value" : 0.59
      },
      { 
        "label" : "México" ,
        "n_palabras" : 301 ,
        "value" : 0.50
      }, 
      { 
        "label" : "Perú" ,
        "n_palabras" : 1324 ,
        "value" : 0.50
      },
      { 
        "label" : "Venezuela" ,
        "n_palabras" : 1947 ,
        "value" : 0.20
      }
    ]
  }
];

nv.addGraph(function() {
  var chart = nv.models.multiBarHorizontalChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .margin({top: 0, right: 0, bottom: 0, left: 20})
      .showValues(true)
      .tooltip(true)
      .transitionDuration(250)
      .stacked(false)
      .showControls(false);

  chart.valueFormat(d3.format('%'));
  chart.xAxis
      .showMaxMin(false)

  chart.yAxis
      .tickFormat(d3.format('%'));

  chart.forceY([0,1]);

  d3.select('#chartavance svg')
      .datum(long_short_data)
      .call(chart);

  nv.utils.windowResize(chart.update);

  chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

  return chart;
});
