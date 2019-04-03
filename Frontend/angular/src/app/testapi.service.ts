import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'Auth_token': 'TN0nrSTsg5FHOUa53jOE'
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class TestApi {
  private heroesUrl = 'https://omega-connect-api.hesiod.omega.gcp.op5.com/api/v1.0/health';  // URL to web api
  private data = {"auto.offset.reset": "earliest"}

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  getHeroes() {
    return this.http.get(this.heroesUrl, httpOptions)
  }
}
