import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';
import {ApiService} from '../../api.service';
import {User} from '../../user';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];
  selectedUser: User = {id: null, username: null, password: null, first_name:null, last_name:null, email:null, phone_number:null, address:null, op5_key:null, city:null};

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private apiService: ApiService
    ) { }

  ngOnInit() {
    this.apiService.readUser("readUsers").subscribe((users: User[])=>
    {
      console.log(users);
      this.users = users;
    })
  }

  selectUser(users: User)
  {
    this.selectedUser = users;
  }

  deleteUser(id)
  {
    this.apiService.deleteUser(id).subscribe((users: User)=>
  {
    console.log("user deleted, ", users);
    this.apiService.readUser("readUsers").subscribe((users: User[])=>
    {
      this.users = users;
    })
  });
  }

}
