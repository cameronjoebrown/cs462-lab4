import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'temperatures';

  temperatures: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
      this.api.getTemperatures().subscribe((response: any) => {
        this.temperatures = response;
        console.log(this.temperatures);
      })
  }
}
