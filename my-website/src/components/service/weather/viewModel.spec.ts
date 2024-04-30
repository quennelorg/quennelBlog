import { describe, it, expect } from '@jest/globals';
import { getCurrentWeather } from '../weather/viewModel';

describe('test getCurrentWeather', function () {
	it('should return correct value', function () {
		const apiCallReturn = {
			coord: {
				lon: 114.2881,
				lat: 30.5872,
			},
			weather: [
				{
					id: 804,
					main: 'Clouds',
					description: '阴，多云',
					icon: '04n',
				},
			],
			base: 'stations',
			main: {
				temp: 24.99,
				feels_like: 25.14,
				temp_min: 22.99,
				temp_max: 24.99,
				pressure: 1007,
				humidity: 61,
				sea_level: 1007,
				grnd_level: 1003,
			},
			visibility: 10000,
			wind: {
				speed: 4.77,
				deg: 116,
				gust: 10.11,
			},
			clouds: {
				all: 100,
			},
			dt: 1713446425,
			sys: {
				type: 2,
				id: 2042365,
				country: 'CN',
				sunrise: 1713390717,
				sunset: 1713437519,
			},
			timezone: 28800,
			id: 1791247,
			name: 'Wuhan',
			cod: 200,
		};
		const result = {
			airConditions: { clouds: 100, humidity: 61, wind: { deg: 116, gust: 10.11, speed: 4.77 } },
			description: '阴，多云',
			descriptionEn: 'Clouds',
			iconCode: '04n',
			sunrise: '2024-04-18 05:51:57',
			sunset: '2024-04-18 18:51:59',
			reactAnimatedWeather: {
				animate: true,
				color: 'goldenrod',
				icon: 'PARTLY_CLOUDY_NIGHT',
				size: 128,
			},
			temp: { feelTemp: 25.14, mainTemp: 24.99, tempMax: 24.99, tempMin: 22.99 },
		};
		expect(result).toStrictEqual(getCurrentWeather(apiCallReturn));
	});
});
