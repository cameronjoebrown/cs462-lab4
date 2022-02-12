import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: string = 'Bob';
  location: string = 'Location';
  contactNumber: string = '+14352162134';
  threshold: string = '72';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  updateProfile():void {
    this.apiService.updateProfile(this.name, this.location, this.contactNumber, this.threshold);
  }

}
