import { ForecastWeather, Temp, Weather } from '@site/src/components/service/weather/model';
import _ from 'lodash';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const getCurrentWeather = (data: any): Weather => {
	return {
		airConditions: {
			clouds: _.get(data, 'clouds.all'),
			wind: _.get(data, 'wind'),
			humidity: _.get(data, 'main.humidity'),
		},
		description: _.get(data, 'weather[0].description'),
		descriptionEn: _.get(data, 'weather[0].main'),
		iconCode: _.get(data, 'weather[0].icon'),
		temp: getTemp(_.get(data, 'main')),
		sunrise: getTimeString(_.get(data, 'sys.sunrise'), 'HH:mm:ss'),
		sunset: getTimeString(_.get(data, 'sys.sunset'), 'HH:mm:ss'),
		date: getTimeString(_.get(data, 'sys.sunset'), 'YYYY-MM-DD'),
		reactAnimatedWeather: {
			icon: iconMapping[_.get(data, 'weather[0].icon')] || '',
			color: 'goldenrod',
			size: 128,
			animate: true,
		},
	};
};

export const getForecastWeather = (data: any): ForecastWeather => {
	return {
		dateTime: _.get(data, 'dt'),
		ProbabilityOfPrecipitation: _.get(data, 'pop'),
		rainVolumeInLastThreeHours: _.get(data, 'rain.3h'),
		snowVolumeInLastThreeHours: _.get(data, 'snow.3h'),
		PartOfDay: _.get(data, 'sys.pod'),
		...getCurrentWeather(data),
	};
};

const getTemp = (data: any): Temp => {
	return {
		tempMax: _.get(data, 'temp_max'),
		tempMin: _.get(data, 'temp_min'),
		feelTemp: _.get(data, 'feels_like'),
		mainTemp: _.get(data, 'temp'),
	};
};

const iconURL = (icon, isUseWebResource = false) =>
	isUseWebResource ? `https://openweathermap.org/img/wn/${icon}@2x.png` : `@site/static/img/weatherIcon/${icon}.png`;

const getTimeString = (time: number, template: string): string => {
	return dayjs.unix(time).utc().local().format(template);
};

const iconMapping = {
	'01d': 'CLEAR_DAY',
	'01n': 'CLEAR_DAY',
	'02d': 'PARTLY_CLOUDY_DAY',
	'02n': 'PARTLY_CLOUDY_DAY',
	'03d': 'CLOUDY',
	'03n': 'CLOUDY',
	'04d': 'PARTLY_CLOUDY_NIGHT',
	'04n': 'PARTLY_CLOUDY_NIGHT',
	'09d': 'SLEET',
	'09n': 'SLEET',
	'10d': 'RAIN',
	'10n': 'RAIN',
	'11d': 'RAIN',
	'11n': 'RAIN',
	'13d': 'SNOW',
	'13n': 'SNOW',
	'50d': 'FOG',
	'50n': 'FOG',
};
