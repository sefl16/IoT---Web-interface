#!/usr/bin/env python3
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


            apiurl = "http://127.0.0.1:8086/write?u=writeuser&p=test&db=test"
            data = recv["metrics"]
            for i in data:
                #print(type(i))

                #size = bytes(len(data))
                c = pycurl.Curl()
                #c.setopt(pycurl.WRITEFUNCTION, size)
                sendSubstring = i.replace('{', ',').replace('}', '').replace('"','').replace(" ", " value=", 1)
                print(sendSubstring)
                #sendSubstring = i.replace('}', '')
                #sending = requests.post(apiurl, data=sendSubstring)
                #print(sending.status_code, sending.reason)
                #print(sending.text[:300]+ '...')
                c.setopt(pycurl.URL, apiurl)
                c.setopt(pycurl.HTTPHEADER, ['Accept: appication/json'])
                c.setopt(pycurl.POST, 1)
                c.setopt(pycurl.POSTFIELDS, sendSubstring)
                #print(json.dumps(i))
                c.perform()
                c.getinfo(pycurl.RESPONSE_CODE)

            #print(data)

            #fout.getvalue()


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
    app.run(port=5003)




#Start the loops here..
#_thread.start_new_thread(do_post, (0,auth_token))
# do_post(auth_token)
