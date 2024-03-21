import { weatherInfo } from './../weather.interface';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { WeatherServiceService } from '../weather-service/weather-service.service';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public weatherInfo$: Observable<weatherInfo> | undefined;
  tempType = signal('F');

  constructor(private _weather: WeatherServiceService) { }

  ngOnInit(): void {
    this.getFarenheitTemps();
  }

  convertToFarenheitFromKelvin(kelvinTemperature: number) {
    return Math.round((kelvinTemperature - 273.15) * (9 / 5) + 32);
  }

  convertToCelsiusFromKelvin(kelvinTemperature: number) {
    return Math.round(kelvinTemperature - 273.15);
  }

  getCelciusTemps() {
    this.weatherInfo$ = this._weather.getUserLocation().pipe(
      map((data) => {
        let info: weatherInfo = {
          currentTemp: this.convertToCelsiusFromKelvin(data.main.temp),
          feelsLike: this.convertToCelsiusFromKelvin(data.main.feels_like),
          maxTemp: this.convertToCelsiusFromKelvin(data.main.temp_max),
          minTemp: this.convertToCelsiusFromKelvin(data.main.temp_min)
      }
      this.tempType.set('C');
      return info;
      })
    );
  }

  getFarenheitTemps() {
    this.weatherInfo$ = this._weather.getUserLocation().pipe(
      map((data) => {
        let info: weatherInfo = {
          currentTemp: this.convertToFarenheitFromKelvin(data.main.temp),
          feelsLike: this.convertToFarenheitFromKelvin(data.main.feels_like),
          maxTemp: this.convertToFarenheitFromKelvin(data.main.temp_max),
          minTemp: this.convertToFarenheitFromKelvin(data.main.temp_min)
      }
      this.tempType.set('F');
      return info;
      })
    );
  }

}
