import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

    function:string;
    devEUI:string;
    location:string;
    data:any;

  constructor() { }

  ngOnInit() {
      this.function = 'sound';
      this.devEUI ='jfhf8n3b3v39dk3h2';
      this.location = 'Ronnebygatan 43';
      this.data = 'graph';
  }


sensSelect(option) {
    if(option == 'sound') {
        this.function = 'sound';
        this.devEUI ='jfhf8n3b3v39dk3h2';
        this.location = 'Ronnebygatan 43';
        this.data = 'graph';
    } else if(option == 'co2') {
        this.function = 'CO2';
        this.devEUI ='hshs8n327cn3hs9sj';
        this.location = 'NOrra Smedjegatan 12';
        this.data = 'graph';
    } else if(option == 'hum') {
        this.function = 'Humidity';
        this.devEUI ='hdhdj9362bf734kdy6';
        this.location = 'Centralbron';
        this.data = 'graph';
    }

}
}
