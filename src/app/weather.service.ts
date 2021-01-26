import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from './models/weather';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weather: Weather = {
    temp: 0,
    sunrise: 0,
    sunset: 0,
    city: '',
    feelsLike: 0,
    description: '',
    icon: '',
    code: 0
  }

  
  apiKey: string = 'e35ceb4802b447929188d5693dfe31c0';
  apiURL: string = `https://api.weatherbit.io/v2.0/current?&key=${this.apiKey}&units=I&city=`;
  

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    
    return this.http.get(`${this.apiURL}${city}`)
  }

}
