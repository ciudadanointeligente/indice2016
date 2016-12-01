#!/usr/bin/python
# coding=utf-8
import codecs
import unicodecsv as csv
import sys
import json
from slugify import slugify
headers_names = ['Normatividad', 'Labor', 'Presupuesto', 'Participacion']
descriptions = {
	'Normatividad': {
		'color':'#FECEA8',
		'label': u'Normatividad'
	} ,
	'Labor': {
		'color':'#FF847C',
		'label': u'Labor del Congreso o Asamblea'
	} ,
	'Presupuesto': {
		'color':'#ED5665',
		'label': u'Presupuesto y Gestión Administrativa'
	} ,
	'Participacion':{
		'color':'#45171D',
		'label': u'Participación, atención ciudadana y rendición de cuentas'
	}
	}
yaml_info = """---
layout: default_per_country
title: Indice %(name)s
slug: %(slug)s
country_name: %(name)s
---"""
def get_header_break_points(line):
	headers = {}
	column_numbers = []
	counter = 0
	for header in line:
		if header in headers_names:
			headers[header] = counter
			column_numbers.append(counter)
		counter += 1
	return headers, column_numbers


def country_name_slug_generator(country_name):
	other_names = {
		u'Costa Rica': 'costarica',
		u'República Dominicana': 'repdominicana'
	}
	if country_name in other_names.keys():
		return other_names[country_name]
	return slugify(country_name)

def file_parser(filename):
	reader = codecs.open(filename, 'r', encoding='utf-8')
	lines = []
	for line in reader:
		lines.append(line.split(u','))
	

	headers, column_numbers = get_header_break_points(lines[0])
	lines_ = lines[2:]
	result = []
	for line in lines_:
		country_name = line[0]
		country_result = []
		counter = 1
		for header_name in headers_names:

			country_data = {}
			starting_index = headers[header_name]
			value = line[headers[header_name]]
			counter += 1
			values = {}

			country_data['key'] = descriptions[header_name]['label']
			country_data['color'] = descriptions[header_name]['color']
			value = int(value.strip('%' ))
			values['value'] = float(value)/100
			values['n_palabras'] = value
			values['label'] = country_name
			country_data['values'] = [values]
			country_data['desgloce'] = get_desgloce(line, starting_index, header_name, column_numbers)
			country_result.append(country_data)
		result.append(country_result)
		country_slug = country_name_slug_generator(country_name)
		file_name = country_slug + u'/data-graph-' + country_slug + '.js'
		json_data = json.dumps(country_result, sort_keys=True, indent=4, separators=(',', ': '))
		javascript_bit = 'long_short_data = ' + json_data

		file_ = codecs.open(file_name, "w", "utf-8")
		file_.write(javascript_bit)
		file_.close

		
		country_data_for_yaml = {'name': country_name, 'slug': country_slug}

		file_name = country_slug + u'/index.html'
		file_ = codecs.open(file_name, "w", "utf-8")
		file_.write(yaml_info % country_data_for_yaml)
		file_.close
	return result

def get_desgloce(line, starting_index, dimension, column_numbers):
	line_ = line[starting_index + 1:]
	result = {}
	counter = 1
	for col in line_:
		
		if counter + starting_index in column_numbers:
			break
		result[dimension+'_'+ str(counter)] = col
		counter += 1
	return result

filename = sys.argv[1]
r = file_parser(filename)