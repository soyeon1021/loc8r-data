import { Component, OnInit } from '@angular/core';
import { Loc8rDataService } from '../loc8r-data.service';
import { GeolocationService } from '../geolocation.service';

import { Location } from '../location';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})

export class HomeListComponent implements OnInit{
  constructor(
    private loc8rDataService: Loc8rDataService,
    private geolocationService: GeolocationService
  ) { }

  public locations: Location[] = [{
    _id: '652d05a725ad7179660da64f',
    name: 'GS25',
    distance: 5100.0,
    address: '경기 평택시 평택로32번길 34',
    rating: 4,
    facilities: ['Hot drinks', 'Premium wifi'],
    
    coords: [36.992087, 127.088533], 
    openingTimes: [{
      days: 'Monday - Friday', 
      opening: '7:00am', 
      closing: '8:00pm', 
      closed: false
    },{
      days: 'Saturday', 
      opening: '8:00am', 
      closing: '1:00pm', 
      closed: false
    },{
      days: 'Sunday', 
      opening: '', 
      closing: '', 
      closed: true
    }], 
      reviews: [{
        author: 'Soyeon Kim', 
        rating: 5,
        reviewText: 'What a great place.' 
      },{
        author: 'Soyeon Kim',
        rating: 3,
        reviewText: 'It was okay.'
      }
    ]
  }, {
    _id: '652bd682126432f272b58707',
    name: 'Cafe Hero',
    distance: 7200.0,
    address: '경기 평택시 중앙2로 13',
    rating: 5,
    facilities: ['Hot drinks', 'Food', 'Premium wifi'],
    
    coords: [36.992087, 127.088533], 
    openingTimes: [{
      days: 'Monday - Friday', 
      opening: '7:00am', 
      closing: '8:00pm', 
      closed: false
    },{
      days: 'Saturday', 
      opening: '8:00am', 
      closing: '1:00pm', 
      closed: false
    },{
      days: 'Sunday', 
      opening: '', 
      closing: '', 
      closed: true
    }], 
      reviews: [{
        author: 'Soyeon Kim', 
        rating: 5,
        reviewText: 'What a great place.' 
      },{
        author: 'Soyeon Kim',
        rating: 3,
        reviewText: 'It was okay.'
      }]
      
  }, {
    _id: '652bd671126432f272b58706',
    name: 'Starcups',
    distance: 10200.542,
    address: '경기 평택시 평택로 51',
    rating: 4,
    facilities: ['wifi', 'food', 'hot drinks'],
    
    coords: [36.992087, 127.088533], 
    openingTimes: [{
      days: 'Monday - Friday', 
      opening: '7:00am', 
      closing: '8:00pm', 
      closed: false
    },{
      days: 'Saturday', 
      opening: '8:00am', 
      closing: '1:00pm', 
      closed: false
    },{
      days: 'Sunday', 
      opening: '', 
      closing: '', 
      closed: true
    }], 
      reviews: [{
        author: 'Soyeon Kim', 
        rating: 5,
        reviewText: 'What a great place.' 
      },{
        author: 'Soyeon Kim',
        rating: 3,
        reviewText: 'It was okay.'
      }]
  }];
  
  

  public message: string = '';

  ngOnInit() {
    //this.getPosition();
  }

  
  //public locations: Location[];

  
  

  
  

  private getPosition(): void {
    this.message = 'Getting your location...';
    this.geolocationService.getPosition(
      this.getLocations.bind(this),
      this.showError.bind(this),
      this.noGeo.bind(this));
  }

  private getLocations(position: any): void {
    this.message = 'Searching for nearby places';
    const lat: number = position.coords.latitude;
    const lng: number = position.coords.longitude;
    this.loc8rDataService
      .getLocations(lat, lng)
        .then(foundLocations => {
          this.message = foundLocations.length > 0 ? '' :
          'No locations found';
          this.locations = foundLocations;
        });
  }

  private showError(error: any): void {
    this.message = error.message;
  };

  private noGeo(): void {
    this.message = 'Geolocation not supported by this browser.';
  };
  
  
}
