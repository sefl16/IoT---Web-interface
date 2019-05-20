import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Sensor } from '../../sensor'
import {ApiService} from '../../api.service';


var data = [{"id": 1, "rooms": ["Tvättstuga", "Sovrum", "Kök"]},
{"id": 2, "rooms": ["Tvättstuga"]}]

var sens = [{"idRoom":1, "sensors":["Sound"]},
{"idRoom":2, "sensors":["CO2"]}, {"idRoom":3, "sensors":["Humidity"]}]
@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  function:string;
  location:string;
  data:any;
  id: any;
  apartment: any;
  sensor: any;
  sensors: Sensor[];
  influxData: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient,
              private apiService: ApiService
            ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id == 1) {
        this.apartment = data[0].rooms

    } else if(this.id == 2) {
        this.apartment = data[1].rooms
    }
    this.location = 'Hallen';
    this.data = '10C';
    this.apiService.readSensors(this.id, 'readSensors').subscribe((sensors: Sensor[])=>
      {
        console.log(sensors);
        this.sensors = sensors;

        this.httpClient.post<any>("http://127.0.0.1:5003/influx", this.sensors).subscribe
        (data => {
          this.influxData = data.series;
          console.log(data.series);
        })
      })
  }
}
