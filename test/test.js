var assert = require('assert');
var expected_argentina = require('./fixtures/data-graph-argentina.js');
var Parser = require('../parser/parser.js').parser;
var _ = require('lodash');


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
    it('gets the right slugs for countries', function(done){
        var p = new Parser('./test/fixtures/datos.csv');
        var argentina_slug = p.slugify('Argentina');
        assert.equal(argentina_slug, 'argentina');
        var rep_dominicana = p.slugify('República Dominicana');
        assert.equal(rep_dominicana, 'repdominicana');
        var costarica = p.slugify('Costa Rica');
        assert.equal(costarica, 'costarica');
        var p = new Parser('./test/fixtures/datos.csv');
        p.parseCountries(function(countries){
            var arg = countries['argentina'];
            var keys_ = _.keys(countries);
            var i = _.indexOf(keys_, 'repdominicana');
            assert.ok(i > -1);
            var i = _.indexOf(keys_, 'costarica');
            assert.ok(i > -1);

            done();
        });


    })
  });
});


