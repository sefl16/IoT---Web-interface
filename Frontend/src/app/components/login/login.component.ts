import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loginUser(event){
      event.preventDefault()
      const target = event.target
      const inputEmail = target.querySelector('#inputEmail').value
      const inputPassword = target.querySelector('#inputPassword').value

      //this.Auth.getUserDetails(inputEmail,inputPassword)
      console.log(inputEmail,inputPassword)
  }
}
