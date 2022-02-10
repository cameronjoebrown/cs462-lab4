import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  updateProfile():void {

  }

}
