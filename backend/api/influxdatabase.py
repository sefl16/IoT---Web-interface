#!/usr/bin/env python3
from influxdb import InfluxDBClient
import http.client, urllib.parse
import json
import _thread
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
import requests
import io
import pycurl


app = Flask(__name__)
api = Api(app)
CORS(app)


def DBcon(DevEUIlist):
    client = InfluxDBClient(host = 'localhost', port=8086)
    client.switch_database('op5_test')

    callBefore = "SELECT value FROM temperature, humidity, light, motion, soundAvg, soundPeak, vdd, LrrLAT, LrrLON WHERE "
    callDynamic = ""
    for item in DevEUIlist:
        print(item.get('devEUI'))
        callDynamic += "DevEUI = '" + item.get('devEUI') + "' OR "
    callDynamic = callDynamic[:-3]
    callAfter = "ORDER BY ASC LIMIT 1"
    callFinal = callBefore + callDynamic + callAfter
    print(callFinal)
    results = client.query(callFinal)
    return results.raw

@app.route('/influx', methods=['POST'])
def parse_request():
    data = request.get_json() # data is empty
    print(data)
    # need posted data here
    test = DBcon(data)
    print(test)
    return json.dumps(DBcon(data))

if __name__ == '__main__':
    app.run(port = 5003)
