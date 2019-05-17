#!/usr/bin/env python3
#from influxdb import influxDBclient
from influxdb import InfluxDBClient
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
    client = InfluxDBClient(host = 'localhost', port=8086)
    client.switch_database('op5_test')
    DevEUI = []
    DevEUI.append("A81758FFFE03CC78")
    DevEUI.append("A81758FFFE0377EB")
    callBefore = "SELECT value FROM temperature, humidity, light, motion, soundAvg, soundPeak, vdd, LrrLAT, LrrLON WHERE "
    callDynamic = ""
    for item in DevEUI:
        callDynamic += "DevEUI = '" + item + "' OR "
    callDynamic = callDynamic[:-3]
    callAfter = "ORDER BY ASC LIMIT 1"
    callFinal = callBefore + callDynamic + callAfter
    print(callFinal)
    result = client.query(callFinal)
    print(result)

DBcon()
if __name__ == 'main':
    DBcon()
    app.run()
