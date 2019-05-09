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
  selectedComplex: Complex = {apartments: null, city: null, address: null, complexID: null};
  expanded: boolean = false;
  apartments: Apartment[];


  constructor(private route: ActivatedRoute,
              private apiService: ApiService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')

    this.apiService.readUserComplex(this.id, "readUserComplex").subscribe((complexes: Complex[])=>
    {
      console.log(complexes);
      this.complexes = complexes;
    })
  }

  selectComplex(id) {
    this.apiService.readAdminComplex(id, "readAdminComplex").subscribe((apartments: Apartment[])=>
    {
      this.expanded = !this.expanded;
      this.apartments = apartments
    })
  }

  deleteComplex(complex)
  {
    this.apiService.deleteComplex(complex).subscribe((complex: any)=>
    {
      console.log("user deleted, ", complex);
      this.apiService.readUserComplex(this.id, "readUserComplex").subscribe((complexes: Complex[])=>
      {
        console.log(complexes);
        this.complexes = complexes;
      })
    });
  }

  // createOrUpdateComplex(form)
  // {
  //   if(this.selectedComplex && this.selectedComplex.id)
  //     {
  //       form.value.id = this.selectedComplex.id;
  //       this.apiService.updateComplex(form.value).subscribe((complex: Complex)=>
  //     {
  //       console.log("Updated complex", complex);
  //     });
  //   }
  //   else
  //   {
  //     this.apiService.createComplex(form.value).subscribe((complex: Complex)=>
  //   {
  //     console.log("Complex created, ", complex);
  //   });
  //   }
  // }

}
