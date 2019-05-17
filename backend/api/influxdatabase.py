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
    #client.query(callFinal)

    #return json.loads(result)
    return results.raw

#DBcon()
# class Influx(Resource):
#     def post(self, request.data):
#         return DBcon(request.data)

@app.route('/influx', methods=['POST'])
def parse_request():
    data = request.get_json() # data is empty
    print(data)
    # need posted data here
    test = DBcon(data)
    print(test)
    return json.dumps(DBcon(data))
# api.add_resource(Influx, "/influx")

if __name__ == '__main__':
    app.run(port = 5003)
