import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Sensor } from '../../sensor'
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  id: any;
  sensors: Sensor[];
  influxData: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient,
              private apiService: ApiService
            ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
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
