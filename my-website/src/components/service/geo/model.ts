import config from '@site/configProxy/config';

export const getGeoCityUrlOptions = (key: string, input?: string) => {
	return {
		method: 'GET',
		url: config.GEO_API_URL,
		headers: {
			'X-RapidAPI-Key': key,
			'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
		},
		params: {
			countryIds: 'CN',
			namePrefix: input ?? 'wuhan',
			minPopulation: '1000000',
			limit: '10',
			sort: '-population',
		},
	};
};

export interface CityType {
	city: string;
	country: string;
	countryCode: string;
	id: number;
	latitude: number;
	longitude: number;
	name: string;
	population: number;
	region: string;
	regionCode: string;
	regionWdId: string;
	type: string;
	wikiDataId: string;
}
