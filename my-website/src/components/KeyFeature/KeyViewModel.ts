import { APITYPE } from '@site/src/components/KeyFeature/KeyModel';

const isGeoKey = (type: string) => {
	return Number(type) === APITYPE.geo;
};
const isWeatherKey = (type: string) => {
	return Number(type) === APITYPE.weather;
};

export const getGeoKey = (list) => {
	return list.filter((key) => isGeoKey(key.type));
};

export const getWeatherKey = (list) => {
	return list.filter((key) => isWeatherKey(key.type));
};
