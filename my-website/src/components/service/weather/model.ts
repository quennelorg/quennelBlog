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

export interface Weather {
	temp: Temp; // 温度
	airConditions: AirConditions; // 空气
	description: string; // 总体描述
	icon: string; // 图标
}

export interface ForecastWeather extends Weather {
	dateTime?: number; // 时间 unix
	ProbabilityOfPrecipitation?: number; // 降雨概率 0-1； 0%-100%
	rainVolumeInLastThreeHours?: number; // 过去3小时降雨量 mm
	snowVolumeInLastThreeHours?: number; // 过去3小时降雪量 mm
	PartOfDay?: PartOfDay;
}

export enum PartOfDay {
	day = 'd',
	night = 'n',
}

export interface Temp {
	mainTemp: number; // 平均温度
	tempMin: number; // 最小温度
	tempMax: number; // 最大温度
	feelTemp: number; // 人体感受温度
}

export interface AirConditions {
	wind: Wind; // 风
	clouds: number; // 云 %
	humidity: number; // 湿度 %
}
export interface Wind {
	speed: number; // 风速 meter/sec
	deg: number; // 风度
	gust: number; // 阵风 meter/sec
}
