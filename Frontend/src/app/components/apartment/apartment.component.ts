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
  selectedComplex: Complex = {address: null, city: null, id: null, apartments: null};
  currentApartments: Apartment[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('currentUser')).id
    this.apiService.readUserComplex(this.id, "readUserComplex").subscribe((complex: Complex[])=>
    {
      this.complex = complex;

      for (let data of this.complex)
      {
        this.selectComplex(data.id)
      }
      console.log(this.complex)
    })
  }

  selectComplex(complexID) {
    this.apiService.readAdminComplex(complexID, "readAdminComplex").subscribe((apartments: Apartment[])=>
    {
      this.currentApartments = apartments
      this.selectedComplex = this.complex.find(i => i.id === complexID)
      this.selectedComplex.apartments = this.currentApartments
      //console.log(apartments);
    })
  }
}
