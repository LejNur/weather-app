import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}
  

  cityApi(cityName: string) {
    return axios.get('https://geocoding-api.open-meteo.com/v1/search?', {
      params: {
        name: cityName,
        // count : '10',
        format: 'json',
        language: 'en',
      },
    });
  }

  temperature(latitude: number, longitude: number) {
    return axios.get('https://api.open-meteo.com/v1/forecast?', {
      params: {
        latitude: latitude,
        longitude: longitude,
        daily: [
          'temperature_2m_max',
          'temperature_2m_min',
          'precipitation_sum',
          'weather_code',
          'wind_speed_10m_max',
        ],
      },
    });
  }
}
