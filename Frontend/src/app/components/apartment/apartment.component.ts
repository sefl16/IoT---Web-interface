import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {Complex} from '../../complex';
import {Apartment} from '../../apartment';
import {User} from '../../user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpClientModule }    from '@angular/common/http';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit {

  options: string[];
  tempsens: string[];
  id: any;
  complex: Complex[];
  selectedComplex: Complex = {address: null, city: null, complexID: null, apartments: null};
  sensors:boolean = false;
  street: string;
  house:string;
  function:string;
  location:string;
  source:string;
  data:any;
  lgh:string;
  apartment: Apartment[];
  //selectedApartment: Apartment = {appnumber: null, devEUI: null};
  appid: any;
  users: User[];
  selectedUser: User = {id: null, username: null, password: null, firstname:null, lastname:null, email:null, phonenumber:null, address:null, op5_key:null, city:null, admin:null}



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService

  ) { }

  ngOnInit() {
      this.options = ['Test1', 'Test2', 'Test3'];
      this.tempsens =['DEVeui1', 'DEVeui2', 'DEVeui3'];
    //this.id = JSON.parse(localStorage.getItem("currentUser")).id;
    this.source = "readUserComplex"
    this.apiService.readUserComplex(this.id, this.source).subscribe((complex: Complex[])=>
    {
      this.complex = complex;
      console.log(this.complex);
    })
  }
}
