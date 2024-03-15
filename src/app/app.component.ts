import { Component, Injectable, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCloudSun,
  faSun,
  faCloudRain,
  faSnowflake,
  faWind,
  faTemperatureArrowDown,
} from '@fortawesome/free-solid-svg-icons';

import { InputComponent } from './components/input/input.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    FontAwesomeModule,
    DatePipe,
    DecimalPipe,
    InputComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
@Injectable()
export class AppComponent implements OnInit {
  title = 'weather-app';
  placeholderText = 'Enter a city name';

  dataItem: any = [];
  searchedCity: string = '';
  latitude: number = 0;
  longitude: number = 0;
  maxTemperature: any = [];
  minTemperature: any = [];
  date: any = [];
  percipitation: any = [];
  unitTemp: string = '';
  weatherCode: any = [];
  wind: any = [];

  //icons
  faCloudSun = faCloudSun;
  faSun = faSun;
  faCloudRain = faCloudRain;
  faSnowflake = faSnowflake;
  faWind = faWind;
  faTemperatureArrowDown = faTemperatureArrowDown;

  constructor(private api: ApiService) {}

  ngOnInit() {}

  onSearchCities(input: string) {
    // console.log(input);
    let res = this.api.cityApi(input);

    res
      .then((res) => {
        // console.log('city page', res.data.results[0]);
        this.dataItem = res.data.results[0];
        this.latitude = res.data.results[0].latitude;
        this.longitude = res.data.results[0].longitude;
        this.temperatureCity();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  temperatureCity() {
    let temp = this.api.temperature(this.latitude, this.longitude);

    temp.then((res) => {
      this.maxTemperature = res.data.daily.temperature_2m_max;
      this.unitTemp = res.data.daily_units.temperature_2m_max;
      this.date = res.data.daily.time;
      this.minTemperature = res.data.daily.temperature_2m_min;
      this.percipitation = res.data.daily.precipitation_sum;
      this.weatherCode = res.data.daily.weather_code;
      this.wind = res.data.daily.wind_speed_10m_max;

      // console.log(res.data);
    });
  }
}
