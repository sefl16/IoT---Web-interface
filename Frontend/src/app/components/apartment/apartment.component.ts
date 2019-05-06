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
  selectedComplex: Complex = {address: null, city: null};
  sensors:boolean = false;
  street: string;
  house:string;
  function:string;
  location:string;
  data:any;
  lgh:string;
  streets = ["Gata1", "Gata2", "Gata3"]
  apartment: Apartment[];
  selectedApartment: Apartment={appnumber: null, debEUI: null};
  appid: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService

  ) { }

  ngOnInit() {
    this.id = 1;
    this.appid = 1;
    this.apiService.readUserComplex(this.id).subscribe((complex: Complex[])=>
    {
      this.complex = complex;
      console.log(this.complex);
    })
    // this.apiService.readUserApartments(this.appid).subscribe((apartment: Apartment[])=>
    // {
    //   this.apartment = apartment;
    //   console.log(this.apartment);
    // })
    this.id = this.route.snapshot.paramMap.get('id');
    this.street =  "Valhalavägen";
    this.house = '10';
    this.function = "Sound";
    this.location = "loundry1";
    this.data = "smthng";
    //this.apartments= JSON.parse(require('fs').readFileSync('../../apartments1.json', 'utf8'));
}

// showSensors(){
//     this.sensors = !this.sensors;
// }
sensSelect(option) {
    if(option == 'sound') {
        this.function = 'sound';
        this.location = 'Ronnebygatan 43';
        this.data = 'graph';
    } else if(option == 'co2') {
        this.function = 'CO2';
        this.location = 'NOrra Smedjegatan 12';
        this.data = 'graph';
    } else if(option == 'hum') {
        this.function = 'Humidity';
        this.location = 'Centralbron';
        this.data = 'graph';
    }

}



showSensorsByStreet(str) {
    if(str == 'Alamedan' ){
        this.lgh ='24';
        } else if(str  == 'Valhalavägen'){
            this.lgh ='23';
    } else if(str == 'Miner'){
        this.lgh ='93';
        }

}


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
