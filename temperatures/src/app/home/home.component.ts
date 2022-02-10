import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  temperatures: string[];
  timeStamps: Date[];

  violations: string[];
  violationTimeStamps: Date[];

  constructor(private api: ApiService) {
    this.temperatures = [];
    this.timeStamps = [];
    this.violations = [];
    this.violationTimeStamps = [];
  }

  ngOnInit(): void {
    this.api.getTemperatures().subscribe((response: any) => {
      this.temperatures.splice(0, this.temperatures.length);
      this.timeStamps.splice(0, this.timeStamps.length);
      Object.keys(response).forEach(key => {
        let newDate = new Date(key);
        this.timeStamps.push(newDate);
        this.temperatures.push(response[key]);
      })
    })

    this.api.getViolations().subscribe((response: any) => {
      this.violations.splice(0, this.temperatures.length);
      this.violationTimeStamps.splice(0, this.timeStamps.length);
      Object.keys(response).forEach(key => {
        let newDate = new Date(key);
        this.violationTimeStamps.push(newDate);
        this.violations.push(response[key]);
      })
    })
  }
}
