import { ForecastWeather, Temp, Weather } from '@site/src/components/service/weather/model';
import _ from 'lodash';

export const getCurrentWeather = (data: any): Weather => {
	return {
		airConditions: {
			clouds: _.get(data, 'clouds.all'),
			wind: _.get(data, 'wind'),
			humidity: _.get(data, 'main.humidity'),
		},
		description: _.get(data, 'weather[0].description'),
		icon: _.get(data, 'weather[0].icon'),
		temp: getTemp(_.get(data, 'main')),
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
