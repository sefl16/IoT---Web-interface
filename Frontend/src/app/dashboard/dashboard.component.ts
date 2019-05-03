import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {User} from '../user'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit
{
  users: User[];
  selectedUser: User = {id: null, username: null, password: null, first_name:null, last_name:null, op5_key:null}
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.readUser().subscribe((users: User[])=>
    {
      this.users = users;
      console.log(this.users);
    })
  }
  createOrUpdateUser(form)
  {
    if(this.selectedUser && this.selectedUser.id)
    {
      form.value.id = this.selectedUser.id;
      this.apiService.updateUser(form.value).subscribe((users: User)=>
    {
      console.log("user updated", users);
    });
  }
  else
  {
    this.apiService.createUser(form.value).subscribe((users: User)=>
  {
    console.log("user created, ", users);
  });
  }
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
  });
  }

}
