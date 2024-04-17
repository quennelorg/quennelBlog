import config from '@site/configProxy/config';

export interface GeoLatLon {
	latitude: number;
	longitude: number;
}

export const getWeatherUrlOptions = (key: string, geoLatLon: GeoLatLon, isCurrent: boolean) => {
	return {
		method: 'GET',
		url: isCurrent ? config.CURRENT_WEATHER_API_URL : config.FORECAST_WEATHER_API_URL,
		params: {
			lat: geoLatLon.latitude,
			lon: geoLatLon.longitude,
			appid: key,
			units: 'metric',
			lang: 'zh_cn',
		},
	};
};
