import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ApiService} from '../../api.service';
import {Sensor} from '../../sensor'
import {User} from '../../user';
import {Complex} from '../../complex';
import {Apartment} from '../../apartment';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
    selectedComplex: Complex = { apartments: null, city: null, adress: null, complexID: null};
    selectedApartment: Apartment = {appnumber: null, devEUI: null}
    complex: Complex[];
    apartments: Apartment[];
    users: User[];
    source:string;
    sensors:Sensor[];
    selectedSensor: Sensor = {appNumber: null, devEUI: null};
    selectedUser: User = {id: null, username: null, password: null, first_name:null, last_name:null, email:null, phone_number:null, address:null, op5_key:null, city:null};
    id:any;
    // adress:string;
    // email:string;
    // apartment:any;
    //options:string[];
    företag = ["SEB", "KarslkronaHem", "Sigma"];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private apiService: ApiService
) { }

  ngOnInit() {
      this.source = 'readSensors'
      this.id = 1;
      // this.apiService.readSensors(this.id,this.source).subscribe((sensors: Sensor[])=>
      // {
      //  this.sensors = sensors;
      //  console.log(this.sensors);
      //  })

      //this.id = this.route.snapshot.paramMap.get('id');
      // this.name ='name';
      // this.adress='adress';
      // this.email ='email';
      //this.options =['sensor1', 'sensor2', 'sensor3'];
      //företag = ["SEB", "KarslkronaHem", "Sigma"];
  }


  updateComplex(option) //delete and add new rooms
  {
      if(this.selectedComplex && this.selectedComplex.complexID)
      {
          option.value.complexID = this.selectedComplex.complexID;
          this.apiService.readUserComplex(this.id, option.value).subscribe((complex: Complex[])=>
          {

          });
      }
  }


  // addOne(option){
  //     this.sensors.unshift(option);
  //     return false;
  // }


selectSensor(sensors: Sensor)
{
  this.selectedSensor = sensors;
}

// deleteSensor(devEUI)
// {
//     this.source = 'deleteSensor';
//     this.apiService.deleteSensor(devEUI, this.source).subscribe((sensors: Sensor)=>
//
// {
//   console.log("Sensor deleted, ", sensors);
// });
// }


}
