import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {Complex} from '../../complex';
import {Apartment} from '../../apartment';
import {User} from '../../user';
import {Sensor} from '../../sensor';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {HttpClientModule}    from '@angular/common/http';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  sensorList: Sensor[];
  id: any;
  sensors: Sensor[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService

  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')

    this.sensorList =[{appID: this.id, devEUI: "Sensor1"}, {appID: this.id, devEUI: "Sensor2"}];
    //this.id = JSON.parse(localStorage.getItem("currentUser")).id;
    this.readSensors();
  }

  readSensors() {
    this.apiService.readSensors(this.id, 'readSensors').subscribe((sensors: Sensor[])=>
    {
      console.log(sensors);
      this.sensors = sensors;
    })
  }

  addOne(sensor) {
    this.apiService.createSensor(sensor.value).subscribe((sensor: Sensor)=>
    {
      console.log(sensor);
      this.readSensors();
    })
  }

  deleteSensor(sensor) {
    this.apiService.deleteSensor(sensor).subscribe((msg: any)=>
    {
      console.log(msg);
      this.readSensors();
    })
  }
}
