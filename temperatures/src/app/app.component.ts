import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'temperatures';

  temperatures: string[];
  timeStamps: Date[];

  constructor(private api: ApiService) {
    this.temperatures = [];
    this.timeStamps = [];
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
  }
}
