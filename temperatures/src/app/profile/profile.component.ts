import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: string = '';
  location: string = '';
  contactNumber: string = '+14352162134';
  threshold: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProfileInfo();
  }

  updateProfile(): void {
    this.apiService.updateProfile(this.name, this.location, this.contactNumber, this.threshold).subscribe(response => {
      console.log(response)
    });
  }

  getProfileInfo(): void {
    this.apiService.getProfileInfo().subscribe((response: any) => {
      this.name = response.name;
      this.location = response.location;
      this.contactNumber = response.number;
      this.threshold = response.threshold;
    })
  }

}
