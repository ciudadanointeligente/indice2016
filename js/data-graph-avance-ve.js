long_short_data_ve = [ 
  {
    key: '2014',
    color: '#00b4f2',
    values: [
      { 
        "label" : "Normatividad" ,
        "n_palabras" : 2160 ,
        "value" : 0.34
      } ,
      { 
        "label" : "Labor del Congreso" ,
        "n_palabras" : 1679 ,
        "value" : 0.12
      } ,
      { 
        "label" : "Presupuesto y Gestión" ,
        "n_palabras" : 904 ,
        "value" : 0.12
      } ,
      { 
        "label" : "Participación Ciudadana" ,
        "n_palabras" : 882 ,
        "value" : 0.27
      }
    ]
  },
  {
    key: '2016',
    color: '#E84A5F',
    values: [
      { 
        "label" : "Normatividad" ,
        "n_palabras" : 1246 ,
        "value" : 0.44
      },
      { 
        "label" : "Labor del Congreso" ,
        "n_palabras" : 861 ,
        "value" : 0.20
      },
      { 
        "label" : "Presupuesto y Gestión" ,
        "n_palabras" : 42 ,
        "value" : 0.07
      },
      { 
        "label" : "Participación Ciudadana" ,
        "n_palabras" : 1178 ,
        "value" : 0.25
      }
    ]
  }
];

nv.addGraph(function() {
  var chart = nv.models.multiBarHorizontalChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .margin({top: 0, right: 0, bottom: 0, left: 140})
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

  d3.select('#chartavance-ve svg')
      .datum(long_short_data_ve)
      .call(chart);

  nv.utils.windowResize(chart.update);

  chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

  return chart;
});
