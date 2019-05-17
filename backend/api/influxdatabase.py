#!/usr/bin/env python3
from influx import influxDBclient
import http.client, urllib.parse
import json
import _thread
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
#from prometheus_client.parser import text_string_to_metric_families
import requests
#from StringIO import StringIO
import io
import pycurl


app = Flask(__name__)
api = Api(app)
CORS(app)


def DBcon():
    client = influxDBclient(host = 'localhost', port=8086)
    client.switch_database('op5_test')
    callBefore = "SELECT value FROM temperature, humidity, light, motion, soundAvg, soundPeak, vdd, LrrLAT, LrrLON, "
    callDynamic = ""
    client.query("SELECT value FROM temperature, humidity, light, motion, soundAvg, soundPeak, vdd, LrrLAT, LrrLON, WHERE DevEUI = "afna" ")


if __name__ == 'main':
    app.run()
