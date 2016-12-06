var assert = require('assert');
var expected_argentina = require('./fixtures/data-graph-argentina.js');
var Parser = require('../parser/parser.js').parser;


describe('Parser', function() {
  describe('when talking about csv', function() {
    it('stores the csv in an array', function(done) {
      
      var p = new Parser('./test/fixtures/datos.csv');
      p.parseFile(function(result){
      	assert.equal(result[0][0], 'índice');
        assert.equal(p.lines, result);
	    done();
      })
    });
    it('parses headers',function(done){
        var p = new Parser('./test/fixtures/datos.csv');
        p.parseHeaders(function(headers){
            assert.equal(headers['Normatividad'], 2);
            assert.equal(headers['Normatividad_1'], 3);
            assert.equal(headers['Normatividad_15'], 17);
            assert.equal(headers['Labor'], 18);
            assert.equal(headers['Presupuesto'], 32);
            assert.equal(headers['Participacion'], 43);
            assert.equal(headers, p.headers);
            done();
        })
    })
    it('parses a country', function(done){
        var p = new Parser('./test/fixtures/datos.csv');
        p.parseCountries(function(countries){
            var arg = countries['argentina'];
            assert.deepEqual(arg, expected_argentina);

            done();
        });

    });
  });
});


