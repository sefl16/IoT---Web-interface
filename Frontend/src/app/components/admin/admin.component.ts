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
  selectedUser: User = {id: null, username: null, password: null, firstname:null, lastname:null, email:null, phonenumber:null, address:null, op5Key:null, city:null, admin: null};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.readUsers()
  }
  readUsers() {
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
    if(confirm("Ta bort användare?")) {
      this.apiService.deleteUser(id, 'deleteUser').subscribe((users: User)=>
      {
        console.log("user deleted, ", users);
        this.readUsers();
      });
    }
  }

  createOrUpdateUser(form)
  {
    if(this.selectedUser && this.selectedUser.id)
      {
        form.value.id = this.selectedUser.id;
        this.apiService.updateUser(form.value).subscribe((users: User)=>
      {
        console.log("user updated", users);
        this.readUsers();
      });
    }
    else
    {
      this.apiService.createUser(form.value).subscribe((users: User)=>
    {
      console.log("user created, ", users);
      this.readUsers();
    });
    }
  }
}
