var fs = require('fs');
var transform = require('stream-transform');
var csv = require("fast-csv");
var _ = require('lodash');
var slugify = require('slugify');
var config = require('../config').config;
var dimensions_names = _.keys(config.dimensions);


var parseHeaders = function(lines, cb){
}
function Parser(file, cb) {
    this.lines = [];
	this.file = file;
};
Parser.prototype.constructor = Parser;
Parser.prototype.slugify = function(text){
    if(_.indexOf(_.keys(config.slug_extras), text) > -1){
        return config.slug_extras[text];
    }
    return slugify(text.toLowerCase(),'_');
}
Parser.prototype.parseFile = function(cb){
    var result = [];
    var on_end = function(cb){
        this.lines = result;
        if(typeof cb === 'function'){
		   return cb(result);
        }
    }
    var bound_end = _.bind(on_end, this, cb);
	var c = csv
	 .fromPath(this.file)
	 .on("data", function(data){
	     result.push(data);
	 })
	 .on("end", bound_end);
    
};
Parser.prototype.parseHeaders = function(cb){
    var parsing = function(cb){
        var header_ = this.lines[0];
        var result = {};
        var current_dim;
        var sub_dim_counter;
        _.forEach(header_, function(value, index, collection){
            var index_ = _.indexOf(dimensions_names, value);
            if(index_ > -1){
                sub_dim_counter = 0;
                result[value] = index;
                current_dim = value;
            }
            else if (typeof current_dim !== 'undefined'){
                    sub_dim_counter++;
                    result[current_dim + '_' + sub_dim_counter] = result[current_dim] + sub_dim_counter;
            }
        })
        
        if(typeof cb === 'function'){
            this.headers = result;
            return cb(result);
        }
    };
    var bound_parsing = _.bind(parsing, this, cb)
    this.parseFile(bound_parsing);

};
Parser.prototype.parseCountries = function(cb){
    var parse_countries = function(cb){
        var result = {};
        var countries = _.slice(this.lines, 2);
        var each_country =  function(values, index){
            var slug = this.slugify(values[0]);
            result[slug] = {};
            result[slug]['long_short_data'] = []
            
            var country_constructor = function(values, column, dimension){
                var r = {
                    "color" : config.dimensions[column]['color'],
                    "desgloce": {},
                    "key": config.dimensions[column]['label'],
                    "values": [{
                        "label": values[0],
                        "n_palabras": parseInt(values[this.headers[column]].replace('%', '')),
                        "value": parseInt(values[this.headers[column]].replace('%', ''))/100
                    }]
                };
                r.key_slug = column;
                r.key_slug_value = values[this.headers[column]].replace('%', '');
                var headers_searcher = function(c, value, index){
                    if (_.startsWith(index, c + '_')){
                        r.desgloce[index] = values[value];
                    }
                }
                var bound_header_searcher = _.bind(headers_searcher, this, column);
                _.forEach(this.headers, bound_header_searcher);
                result[slug]['long_short_data'].push(r);

            };
            var bound_country_constructor = _.bind(country_constructor, this, values);
            _.forEach(dimensions_names, bound_country_constructor) 

        }
        var bound_each_country = _.bind(each_country, this)
        _.forEach(countries, bound_each_country);
        if(typeof cb === 'function'){
            return cb(result);
        }
    }
    var bound_parse_countries = _.bind(parse_countries, this, cb);
    this.parseHeaders(bound_parse_countries);
};
Parser.prototype.createJsonFiles = function(path, cb){
    var createFiles = function(path,cb , countries){
        _.each(countries ,function(values, slug){
            var p = path + slug + '/data-graph-' + slug + '.js';

            if(!fs.existsSync(path+slug)){
                fs.mkdirSync(path + slug);
            }
            
            var data = 'var long_short_data = ' + JSON.stringify(values, null, 2);
            fs.writeFile(p, data, { flag: 'w' }, function (err) {
                if (err) throw err;
            });
        });
        if(typeof cb === 'function'){
            return cb(countries);
        }
    }
    var bound_create_files = _.bind(createFiles, this, path, cb);
    this.parseCountries(bound_create_files);
    
}


exports.parser = Parser
