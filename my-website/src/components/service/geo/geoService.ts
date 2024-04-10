import axios from 'axios';
import { getGeoCityUrlOptions } from '@site/src/components/service/geo/model';

export const fetchCities = (key: string, input?: string) => {
	return axios
		.request(getGeoCityUrlOptions(key, input))
		.then((res) => console.log(res.data))
		.catch((error) => console.log(error));
};
