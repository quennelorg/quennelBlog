import axios from 'axios';
import { getWeatherUrlOptions } from '@site/src/components/service/weather/model';
import { GeoLatLon } from '@site/src/components/service/weather/model';

export const fetchCurrentWeather = (key: string, geoLatLon: GeoLatLon) => {
	return axios.request(getWeatherUrlOptions(key, geoLatLon, true));
};

export const fetchForecastWeather = (key: string, geoLatLon: GeoLatLon) => {
	return axios.request(getWeatherUrlOptions(key, geoLatLon, false));
};

export const fetchCurrentAndForecastWeather = (key: string, geoLatLon: GeoLatLon) => {
	return axios.all([fetchCurrentWeather(key, geoLatLon), fetchForecastWeather(key, geoLatLon)]);
};
