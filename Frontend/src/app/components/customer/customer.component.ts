import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ApiService} from '../../api.service';
import {Sensor} from '../../sensor'


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    source:string;
    sensors:Sensor[];
    selectedSensor: Sensor = {appNumber: null, devEUI: null}
    id:any;
    // adress:string;
    // email:string;
    // apartment:any;
    options:string[];
    företag = ["SEB", "KarslkronaHem", "Sigma"];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private apiService: ApiService
) { }

  ngOnInit() {
      this.source = 'readSensors'
      this.id = 1;
      this.apiService.readSensors(this.id,this.source).subscribe((sensors: Sensor[])=>
      {
       this.sensors = sensors;
       console.log(this.sensors);
       })

      //this.id = this.route.snapshot.paramMap.get('id');
      // this.name ='name';
      // this.adress='adress';
      // this.email ='email';
      this.options =['sensor1', 'sensor2', 'sensor3'];
      //företag = ["SEB", "KarslkronaHem", "Sigma"];
  }



  addOne(option){
      this.options.unshift(option);
      return false;
  }

deleteOpt(opt){
    for(let i=0; i<this.sensors.length; i++) {
        if(this.sensors[i]==opt){
            this.sensors.splice(i, 1);
            break;
        }
    }
}

selectSensor(sensors: Sensor)
{
  this.selectedSensor = sensors;
}

deleteSensor(devEUI)
{
    this.source = 'deleteSensor';
    this.apiService.deleteSensor(devEUI, this.source).subscribe((sensors: Sensor)=>

{
  console.log("Sensor deleted, ", sensors);
});
}









}
