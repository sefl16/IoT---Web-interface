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
  selector: 'app-apartment-view',
  templateUrl: './apartment-view.component.html',
  styleUrls: ['./apartment-view.component.css']
})
export class ApartmentViewComponent implements OnInit {
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
    this.readSensors();
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
    if(confirm("Ta bort sensor?")) {
      this.apiService.deleteSensor(sensor).subscribe((msg: any)=>
      {
        console.log(msg);
        this.readSensors();
      })
    }
  }
}
