import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  constructor(private route: ActivatedRoute,
              private router: Router) { }

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
  }


  showSensors(id){
      //console.log(event.target.id);
      // if (this.idRoom == 1) {
      //     this.sensor = sens[0].sensors
      // } else if(this.idRoom == 2) {
      //     this.sensor = sens[1].sensors
      // } else if(this.idRoom == 3) {
      //     this.sensor = sens[2].sensors
      // }
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
