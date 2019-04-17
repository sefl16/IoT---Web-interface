import { Component, OnInit } from '@angular/core';
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
  //apartments: [];
  sensors:boolean = false;
  street: string;
  house:string;
  function:string;
  location:string;
  data:any;
  lgh:string;
  streets = ["Gata1", "Gata2", "Gata3"]


  constructor(
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {
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
