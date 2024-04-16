import { APITYPE, key } from '@site/src/components/keyFeature/KeyModel';

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

export const getApiKey = (list: [], type: APITYPE, name?: '') => {
	switch (type) {
		case APITYPE.geo:
			return getApiKeyIdByName(getGeoKey(list), name);
		case APITYPE.weather:
			return getApiKeyIdByName(getWeatherKey(list), name);
	}
	return '';
};

const getApiKeyIdByName = (list: key[], name?: '') => {
	return list.find((key) => key.name === (name ?? 'quennel1115')).id ?? '';
};
