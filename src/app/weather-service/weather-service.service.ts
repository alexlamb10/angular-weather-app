import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  private apiKey = environment.WEATHER_API_KEY;
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';


  constructor(private _http: HttpClient) { }

  getUserLocation(): Observable<any> {
    return new Observable(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.getWeatherByLocation(latitude, longitude).subscribe(
              weatherData => observer.next(weatherData),
              error => observer.error(`Error getting weather: ${error.message}`)
            );
          },
          (error) => {
            observer.error(`Error getting weather: ${error.message}`);
          }
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

  private getWeatherByLocation(latitude: number, longitude: number): Observable<any> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`;

    return this._http.get(apiUrl);
  }

  // getWeatherByZipCode(zipcode: number): Observable<any> {
  //   console.log("in get weather by coordinates", zipcode)
  //   const url = `${this.apiUrl}?zip=${zipcode}&appid=${this.apiKey}`;
  //   return this._http.get(url);
  // }
}
