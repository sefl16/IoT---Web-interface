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
    this.id = JSON.parse(localStorage.getItem("currentUser")).id;
    this.source = "readUserComplex"
    this.apiService.readUserComplex(this.id, this.source).subscribe((complex: Complex[])=>
    {
      this.complex = complex;
      console.log(this.complex);
    })
}

deleteApartment(appnumber)
{
    this.apiService.deleteApartment(appnumber).subscribe((apartments: Apartment)=>

{
  console.log("Apartment deleted, ", apartments);
});
}
createApartment(form)
{
    this.apiService.createApartment(form.value).subscribe((apartments: Apartment)=>
    {
         console.log("Apartment created", apartments);


});
}
}
