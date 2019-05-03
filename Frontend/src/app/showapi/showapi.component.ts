import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type': 'application/json','Auth-Token': 'TN0nrSTsg5FHOUa53jOE'}
  )};

@Component({
  selector: 'app-showapi',
  templateUrl: './showapi.component.html',
  styleUrls: ['./showapi.component.css']
})
export class ShowapiComponent implements OnInit {
  heroes: any;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get('https://api.github.com/users/northernberg', httpOptions).subscribe(data => {
      console.log(data);
    });
    this.heroes = this.http.get('https://omega-connect-api.hesiod.omega.gcp.op5.com/api/v1.0/health', httpOptions)
      .subscribe(data => {
        console.log(data);
      })
    console.log(httpOptions);
    // this.getHeroes();
  }
  getHeroes() {
  }
}
