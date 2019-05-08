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

  updateUser(user: User){
    return this.httpClient.put<User>(`${this.PHP_API_SERVER}/api/update.php`, user);
  }

  deleteUser(id: number){
    return this.httpClient.delete<User>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}`);
  }

  readSensors(id: number, source: string ){ //skriv till ett namn på php filen
      return this.httpClient.get<Sensor[]>(`${this.PHP_API_SERVER}/api/read.php/?id=${id}/&source=${source}`);
  }

  deleteSensor(id: number, source: string){ //skriv till ett namn på php filen
    return this.httpClient.delete<Sensor>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}/&source=${source}`);
  }
  readUserComplex(id: number, source: string){
    return this.httpClient.get<Complex[]>(`${this.PHP_API_SERVER}/api/read.php/?id=${id}&source=${source}`);
  }
  createSensor(sensors: Sensor): Observable<Sensor>{
    return this.httpClient.post<Sensor>(`${this.PHP_API_SERVER}/api/create.php`, sensors);
  }
  deleteApartment(appnumber: string){ //new
     return this.httpClient.delete<Apartment>(`${this.PHP_API_SERVER}/api/delete.php/?id=${appnumber}`);
  }
constructor(private httpClient: HttpClient) { }
  }
