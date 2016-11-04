long_short_data = [ 
  {
    key: 'Normatividad',
    color: '#8ac733',
    values: [
      { 
        "label" : "Colombia" ,
        "n_palabras" : 35 ,
        "value" : 0.35
      }
    ]
  },
  {
    key: 'Labor del Congreso o Asamblea',
    color: '#00a64b',
    values: [
      { 
        "label" : "Colombia" ,
        "n_palabras" : 46 ,
        "value" : 0.46
      }
    ]
  },
  {
    key: 'Presupuesto y Gestión Administrativa',
    color: '#006fbd',
    values: [
      { 
        "label" : "Colombia" ,
        "n_palabras" : 25 ,
        "value" : 0.25
      }
    ]
  },
  {
    key: 'Participación, atención ciudadana y rendición de cuentas',
    color: '#00b4f2',
    values: [
      { 
        "label" : "Colombia" ,
        "n_palabras" : 45 ,
        "value" : 0.45
      },
    ]
  }
];


var chart;
nv.addGraph(function() {
  chart = nv.models.multiBarHorizontalChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .margin({top: 0, right: 0, bottom: 0, left: 0})
      .showValues(true)
      // .showLegend(false)
      .tooltip(function(key, x, y, e, graph, n_palabras, link_ley) {
        var text_for_twitter = encodeURIComponent(y + '% de cumplimiento en ' + x + ',');
        return '<p>' + e.point.label + ' tiene un ' + e.point.n_palabras + '% de transparencia en ' + key + '</p>'
               // '<p> De las ' + e.point.n_promesas + ' promesas en ' + x + ' entre ' + key + '.</p>' +
               // '<div><a target="_blank" href="'+ e.point.link_ley +'">¿Cómo cumple la promesa? </a></div>'
               // '<div style="float:right;"><a href="https://twitter.com/share?text='+text_for_twitter+'&via=ciudadanoi&hashtags=21mayo" target="_blank" class="twitter-share-button"><i class="fa fa-twitter"></i> Twittear</a></div>'
    })
      // .barColor(d3.scale.category20c().range())
      .transitionDuration(250)
      .stacked(false)
      .showControls(false);

  chart.valueFormat(d3.format('%'));
  chart.xAxis
      .showMaxMin(false)

  // chart.yAxis
  //     .tickFormat(d3.format('%'));

  chart.forceY([0,1]);

  d3.select('#chartColombia svg')
      .datum(long_short_data)
      .call(chart);

  nv.utils.windowResize(chart.update);

  chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

  return chart;
});
