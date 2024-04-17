import { CityType, PlaceType } from '@site/src/components/address/model';
import _ from 'lodash';
import { fetchCities } from '@site/src/components/service/geo/geoService';

const transferCityDataToPlaceType = (cities: CityType[], inputValue: string): PlaceType[] => {
	if (!cities || cities.length === 0) {
		return [];
	}
	try {
		return cities.map((city): PlaceType => {
			return {
				description: city.name + ',' + city.region,
				structured_formatting: {
					main_text: city.name,
					secondary_text: city.region,
					main_text_matched_substrings: [{ offset: 0, length: inputValue.length }],
				},
				latitude: city.latitude,
				longitude: city.longitude,
			};
		});
	} catch (e) {
		return [];
	}
};

export const getCityAddress = (request: any, callback: Function) => {
	const key = _.get(request, 'key');
	const input = _.get(request, 'input');
	fetchCities(key, input)
		.then((res) => {
			const results = transferCityDataToPlaceType(res.data.data, input);
			console.log(results);
			callback(results);
		})
		.catch((error) => {
			console.log(error);
		});
};
