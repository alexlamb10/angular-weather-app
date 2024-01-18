import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherServiceService } from '../weather-service/weather-service.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private _weather: WeatherServiceService) { }

  ngOnInit(): void {
    this._weather.getUserLocation();
  }



}
