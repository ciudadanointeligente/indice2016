long_short_data_pan = [ 
  {
    key: '2016',
    color: '#E84A5F',
    values: [
      { 
        "label" : "Normatividad" ,
        "n_palabras" : 1246 ,
        "value" : 0.45
      },
      { 
        "label" : "Labor del Congreso" ,
        "n_palabras" : 861 ,
        "value" : 0.38
      },
      { 
        "label" : "Presupuesto y Gestión" ,
        "n_palabras" : 42 ,
        "value" : 0.36
      },
      { 
        "label" : "Participación Ciudadana" ,
        "n_palabras" : 1178 ,
        "value" : 0.58
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

  d3.select('#chartavance-pan svg')
      .datum(long_short_data_pan)
      .call(chart);

  nv.utils.windowResize(chart.update);

  chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

  return chart;
});
