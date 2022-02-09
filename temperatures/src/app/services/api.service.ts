import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  temperatures: any;

  cloudUrl = "http://localhost:3000/sky/cloud/cky9r3iga000vw7zva2fb7v1z";
  headerOptions: any;

  constructor(private http: HttpClient) {
    this.headerOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
      }),
      body: {}
    }
  }

  getTemperatures() {
    return this.http.get(this.cloudUrl + '/temperature_store/temperatures', this.headerOptions);
  }

  getViolations() {
    return this.http.get(this.cloudUrl + '/temperature_store/threshold_violations', this.headerOptions);
  }
}
