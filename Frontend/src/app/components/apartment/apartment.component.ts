import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {Complex} from '../../complex';
import {Apartment} from '../../apartment';
import {User} from '../../user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpClientModule }    from '@angular/common/http';
//import json from '../../apartments1.json';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit {
  id: any;
  complex: Complex[];
  selectedComplex: Complex = {adress: null, city: null, complexID: null, apartments: null};
  sensors:boolean = false;
  street: string;
  house:string;
  function:string;
  location:string;
  source:string;
  data:any;
  lgh:string;
  apartment: Apartment[];
  selectedApartment: Apartment = {appnumber: null, devEUI: null};
  appid: any;
  users: User[];
  selectedUser: User = {id: null, username: null, password: null, first_name:null, last_name:null, email:null, phone_number:null, address:null, op5_key:null, city:null}



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService

  ) { }

  ngOnInit() {
    this.id = 1;
    this.source = "readUserComplex"
    this.apiService.readUserComplex(this.id, this.source).subscribe((complex: Complex[])=>
    {
      this.complex = complex;
      console.log(this.complex);
    })
}
// sensSelect(option) {
//     if(option == 'sound') {
//         this.function = 'sound';
//         this.location = 'Ronnebygatan 43';
//         this.data = 'graph';
//     } else if(option == 'co2') {
//         this.function = 'CO2';
//         this.location = 'NOrra Smedjegatan 12';
//         this.data = 'graph';
//     } else if(option == 'hum') {
//         this.function = 'Humidity';
//         this.location = 'Centralbron';
//         this.data = 'graph';
//     }
//
// }



// showSensorsByStreet(str) {
//     if(str == 'Alamedan' ){
//         this.lgh ='24';
//         } else if(str  == 'Valhalavägen'){
//             this.lgh ='23';
//     } else if(str == 'Miner'){
//         this.lgh ='93';
//         }
//
// }


}
// interface Sensors {
//     function:string,
//     devEUI:string,
//     location:string,
//     data:any
// }

// interface Adress {
//         street:string,
//         house:string
// }
