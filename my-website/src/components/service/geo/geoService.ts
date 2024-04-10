import axios from 'axios';
import { getGeoCityUrlOptions } from '@site/src/components/service/geo/model';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

export const fetchCities = (key: string, input?: string) => {
	return axios.request(getGeoCityUrlOptions(key, input));
};
