const geo_city_url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

export const getGeoCityUrlOptions = (key: string, input?: string) => {
	return {
		method: 'GET',
		url: geo_city_url,
		headers: {
			'X-RapidAPI-Key': key,
			'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
		},
		params: {
			countryIds: 'CN',
			namePrefix: input ?? 'wuhan',
			minPopulation: '1000000',
			limit: '10',
			sort: 'population',
		},
	};
};
