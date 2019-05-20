import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../api.service';
import { Complex } from '../../complex';
import { Apartment } from '../../apartment';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  id: any;
  complexes: Complex[];
  selectedComplexID: any;
  expanded: boolean = false;
  apartments: Apartment[];


  constructor(private route: ActivatedRoute,
              private apiService: ApiService,) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')

    this.apiService.readUserComplex(this.id, "readUserComplex").subscribe((complexes: Complex[])=>
    {
      console.log(complexes);
      this.complexes = complexes;
    })
  }

  readApartments(complexID) {
    this.apiService.readAdminComplex(complexID, "readAdminComplex").subscribe((apartments: Apartment[])=>
    {
      console.log(apartments);
      this.selectedComplexID = complexID;
      this.apartments = apartments;
    })
  }
  selectComplex(id) {
    console.log(this.complexes);
    this.readApartments(id);
    this.expanded = !this.expanded;
  }

  deleteComplex(complex)
  {
    if(confirm("Ta bort Complex?")) {
      this.apiService.deleteComplex(complex).subscribe((complex: any)=>
      {
        console.log("Complex deleted, ", complex);
        this.apiService.readUserComplex(this.id, "readUserComplex").subscribe((complexes: Complex[])=>
        {
          console.log(complexes);
          this.complexes = complexes;
        })
      });
    }
  }

  deleteApartment(apartment)
  {
    if(confirm("Ta bort Lägenhet?")) {
      this.apiService.deleteApartment(apartment).subscribe((msg: any)=>
      {
        console.log("Apartment removed", apartment.appNumber);
        this.readApartments(apartment.complexID)
      });
    }
  }

  createComplex(form)
  {
    this.apiService.createComplex(form.value).subscribe((complex: Complex)=>
    {
      console.log("Complex created, ", complex);
      this.apiService.readUserComplex(this.id, "readUserComplex").subscribe((complexes: Complex[])=>
      {
        console.log(complexes);
        this.complexes = complexes;
      })
    });
  }

  createApartment(form)
  {
    console.log(form)
    this.apiService.createApartment(form.value).subscribe((apartment: Apartment)=>
    {
      this.readApartments(form.value.complexID);
    });
  }
}
