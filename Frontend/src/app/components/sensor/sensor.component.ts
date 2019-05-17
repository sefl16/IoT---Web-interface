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
  show:boolean = false;
  id: any;
  apartment: any;
  sensor: any;
  idRoom: any;
  sensors: Sensor[];

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
    this.idRoom = this.route.snapshot.paramMap.get('idRoom')
    if (this.idRoom == 1) {
        this.sensor = sens[0].sensors
    } else if(this.idRoom == 2) {
        this.sensor = sens[1].sensors
    } else if(this.idRoom == 3) {
        this.sensor = sens[2].sensors
    }
    this.function = 'sound';
    this.location = 'Hallen';
    this.data = '10C';
    this.apiService.readSensors(this.id, 'readSensors').subscribe((sensors: Sensor[])=>
      {
        console.log(sensors);
        this.sensors = sensors;

        this.httpClient.post<any>("http://127.0.0.1:5003/influx", this.sensors).subscribe
        (data => {
          console.log(data);
        })
      })
  }


  showSensors(id){
    this.sensor = sens[id].sensors;
    console.log(this.idRoom);
    this.show = !this.show;
  }
sensSelect(option) {
    if(option == 'sound') {
      this.function = 'sound';
      this.location = 'Tvättstuga1';
      this.data = 'graph';
    } else if(option == 'co2') {
      this.function = 'CO2';
      this.location = 'Hallen';
      this.data = 'graph';
    } else if(option == 'hum') {
      this.function = 'Humidity';
      this.location = 'Tvättstuga1';
      this.data = '30 C';
    }

  }
}
