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
  id: any;
  complex: Complex[];
  selectedComplex: Complex = {address: null, city: null, complexID: null, apartments: null};
  source:string;
  //apartment: Apartment[];
  selectedApartment: Apartment = {appnumber: null, devEUI: null};
  users: User[];
  selectedUser: User = {id: null, username: null, password: null, firstname:null, lastname:null, email:null, phonenumber:null, address:null, op5Key:null, city:null, admin:null}
  selectedComplexID: any;
  expanded: boolean = false;
  apartments: Apartment[];


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

}
