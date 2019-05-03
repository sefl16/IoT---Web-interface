#!/usr/bin/env python3
import http.client, urllib.parse
import json
import _thread
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
#from prometheus_client.parser import text_string_to_metric_families
import requests

app = Flask(__name__)
api = Api(app)
CORS(app)

#Omega Auth token
auth_token = "?AUTH_TOKEN=VwLYKMLzjW*mvKnOAACSEcyBfHsAWgmoxyWjiKrrVYiQeR*f"

def do_post(auth_token):
    headers = {"Content-Type": "application/json"}
    data = json.dumps({
        "auto.offset.reset": "earliest",
        "auto.commit.enable": False
    })
    conn = http.client.HTTPSConnection("omega-connect-api.hesiod.omega.gcp.op5.com")
    conn.request("POST", "/api/v0.1/consumers"+ auth_token, data, headers)
    recv = conn.getresponse()
    print(recv.status, recv.reason)
    if recv.status == 200:
        recv = json.loads(recv.read())
        if 'consumer_instance_id' in recv:
            consumer_instance_id = recv['consumer_instance_id']
            print(consumer_instance_id)
            conn.request("GET", "/api/v0.1/consumers/" + consumer_instance_id + "/metrics" + auth_token, "", headers)
            recv = conn.getresponse()
            print(recv.status, recv.reason)
            recv = json.loads(recv.read())
            print(recv)
            return json.dumps(recv)



    else:
        recv = recv.read()
        print(recv)

class Employees(Resource):
    def get(self):
        return do_post(auth_token)


api.add_resource(Employees, '/employees') # Route_1

hey = do_post(auth_token)
metrics = hey



if __name__ == '__main__':
    app.run(port=5002)




#Start the loops here..
#_thread.start_new_thread(do_post, (0,auth_token))
# do_post(auth_token)
