import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here


@Injectable({
  providedIn: 'root'
})
export class DataService {
  serverData: JSON;
  employeeData: JSON;

  constructor(private http: HttpClient) { }

  getAllEmployees() {
    return this.http.get('http://127.0.0.1:5002/employees')
  }
}
