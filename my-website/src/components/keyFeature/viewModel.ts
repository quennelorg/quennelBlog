import { APITYPE, Key } from '@site/src/components/keyFeature/model';
import config from '@site/configProxy/config';
import { getLocalStorageByKey } from '@site/src/hooks/useLocalStorage';
import _ from 'lodash';
import { fetchCities } from '@site/src/components/service/geo/geoService';
import { GeoLatLon } from '@site/src/components/service/weather/model';
import { fetchForecastWeather } from '@site/src/components/service/weather/weatherService';
import { AxiosResponse } from 'axios';

const isGeoKey = (type: string) => {
	return Number(type) === APITYPE.geo;
};
const isWeatherKey = (type: string) => {
	return Number(type) === APITYPE.weather;
};

export const getGeoKey = (list) => {
	return _.filter(list, (key) => isGeoKey(key.type));
};

export const getWeatherKey = (list) => {
	return _.filter(list, (key) => isWeatherKey(key.type));
};

export const getApiKey = (type: APITYPE, name?: '') => {
	const list = getLocalStorageByKey(config.API_KEY_LIST);
	switch (type) {
		case APITYPE.geo:
			return getApiKeyIdByName(getGeoKey(list), name);
		case APITYPE.weather:
			return getApiKeyIdByName(getWeatherKey(list), name);
	}
	return '';
};

const getApiKeyIdByName = (list: Key[], name?: '') => {
	if (name) {
		return list.find((key) => key.name === (name ?? 'quennel1115')).id ?? '';
	}
	return _.get(list[0], 'id', '');
};

export const fetchData = (key: Key): Promise<AxiosResponse<any>> => {
	if (key.type === APITYPE.geo) {
		return fetchCities(key.id);
	}
	if (key.type === APITYPE.weather) {
		const geoLatLon: GeoLatLon = { latitude: config.DEFAULT_GEO.latitude, longitude: config.DEFAULT_GEO.longitude };
		return fetchForecastWeather(key.id, geoLatLon);
	}
};
