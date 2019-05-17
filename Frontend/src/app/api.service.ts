import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { Sensor } from './sensor';
import { Complex } from './complex';
import { Apartment } from './apartment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://127.0.0.1:8080";
  readUser(source: string): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/api/read.php/?source=${source}`);
  }

  createUser(user: User): Observable<User>{
    return this.httpClient.post<User>(`${this.PHP_API_SERVER}/api/create.php`, user);
  }
  createApartment(apartment: Apartment): Observable<Apartment>{ //new
    return this.httpClient.post<Apartment>(`${this.PHP_API_SERVER}/api/create.php`, apartment);
  }

  createComplex(complex: Complex): Observable<Complex>{
    return this.httpClient.post<Complex>(`${this.PHP_API_SERVER}/api/createComplex.php`, complex);
  }

  createApartment(apartment: Apartment): Observable<Apartment>{
    return this.httpClient.post<Apartment>(`${this.PHP_API_SERVER}/api/createApartment.php`, apartment);
  }

  updateUser(user: User){
    return this.httpClient.put<User>(`${this.PHP_API_SERVER}/api/update.php`, user);
  }

  updateComplex(complex: Complex){
    return this.httpClient.put<Complex>(`${this.PHP_API_SERVER}/api/update.php`, complex);
  }

  deleteUser(id: number, source: string){
    return this.httpClient.delete<User>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}/&source=${source}`);
  }

  readSensors(id: number, source: string ){ //skriv till ett namn på php filen
      return this.httpClient.get<Sensor[]>(`${this.PHP_API_SERVER}/api/read.php/?id=${id}/&source=${source}`);
  }

  deleteSensor(id: number, source: string){ //skriv till ett namn på php filen
    return this.httpClient.delete<Sensor>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}/&source=${source}`);
  }
  deleteComplex(complex: any){ //skriv till ett namn på php filen
    return this.httpClient.post<Complex>(`${this.PHP_API_SERVER}/api/deleteComplex.php`, complex);
  }
  deleteApartment(apartment: Apartment){ //skriv till ett namn på php filen
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}/api/deleteApartment.php`, apartment);
  }
  readUserComplex(id: number, source: string){
    return this.httpClient.get<Complex[]>(`${this.PHP_API_SERVER}/api/read.php/?id=${id}&source=${source}`);
  }

  readAdminComplex(id: number, source: string){
    return this.httpClient.get<Apartment[]>(`${this.PHP_API_SERVER}/api/read.php/?id=${id}&source=${source}`);
  }
  displayComplexes(id: number, source:string){
      return this.httpClient.get<Complex[]>(`${this.PHP_API_SERVER}/api/read.php?=${id}&source=${source}`);
  }
constructor(private httpClient: HttpClient) { }
  }
