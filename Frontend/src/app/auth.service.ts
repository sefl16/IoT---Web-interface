import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      //private http: HttpClientModule
  ) { }

  getUserDetails(inputEmail,inputPassword){
      //return this.http.post('/api')

  }
}
