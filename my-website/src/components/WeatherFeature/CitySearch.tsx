import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '@site/configProxy/config';

const CitySearch = () => {
	const [cityResult, setCityResult] = useState([]);

	useEffect(() => {
		console.log(getCityData('china') + 'adsad');
	}, []);
};

const getCityData = async (city: string) => {
	const getCityUrlByCity = `https://api.weatherapi.com/v1/search.json?key=${config.WEATHER_API_KEY}&q=${city}`;
	return await getAPIData(getCityUrlByCity);
};
const getAPIData = (url: string) => {
	console.log(url);
	return axios
		.get(url)
		.then((res) => console.log(res))
		.catch((error) => console.log(error));
};
export default CitySearch;
