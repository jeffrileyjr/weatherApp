import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weather } from '../models/weather'
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  isStorm: boolean = false;
  isRain: boolean = false;
  isFog: boolean = false;
  isSnow: boolean = false;
  isCloudy: boolean = false;

  get weather(): Weather {
    return this.weatherService.weather;
  }
  
  today: number;
  

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeather('Detroit').subscribe((data: any) => {
      this.setWeather(data);
    });
    

  }

  findCity(city: string) {
     this.weatherService.getWeather(city).subscribe((data: any) => {
      this.setWeather(data);
    });
  }

  setWeather(data: any) {
    this.weatherService.weather.temp = data.data[0].temp;
    this.weatherService.weather.city = data.data[0].city_name;
    this.weatherService.weather.feelsLike = data.data[0].app_temp;
    this.weatherService.weather.sunrise = data.data[0].sunrise;
    this.weatherService.weather.sunset = data.data[0].sunset;
    this.weatherService.weather.description = data.data[0].weather.description;
    this.weatherService.weather.icon = data.data[0].weather.icon;
    this.weatherService.weather.code = data.data[0].weather.code;
    if (this.weatherService.weather.code >= 200 && this.weatherService.weather.code <= 122) {
      this.isStorm = true;
      this.isRain = false;
      this.isSnow = false;
      this.isFog = false;
      this.isCloudy = false;
    } else if (this.weatherService.weather.code >= 300 && this.weatherService.weather.code <= 522) {
      this.isStorm = false;
      this.isRain = true;
      this.isSnow = false;
      this.isFog = false;
      this.isCloudy = false;
    } else if (this.weatherService.weather.code >= 600 && this.weatherService.weather.code <= 623) {
      this.isStorm = false;
      this.isRain = false;
      this.isSnow = true;
      this.isFog = false;
      this.isCloudy = false;
    } else if (this.weatherService.weather.code >= 741 && this.weatherService.weather.code <= 751) {
      this.isStorm = false;
      this.isRain = false;
      this.isSnow = false;
      this.isFog = true;
      this.isCloudy = false;
    } else if (this.weatherService.weather.code >= 801 && this.weatherService.weather.code <= 804) {
      this.isStorm = false;
      this.isRain = false;
      this.isSnow = false;
      this.isFog = false;
      this.isCloudy = true;
    } else {
      this.isStorm = false;
      this.isRain = false;
      this.isSnow = false;
      this.isFog = false;
      this.isCloudy = false;
    }
    console.log(this.weatherService.weather.code)

  }

}
