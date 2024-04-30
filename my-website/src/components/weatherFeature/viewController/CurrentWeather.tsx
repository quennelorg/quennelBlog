import * as React from 'react';
import { Box } from '@mui/material';

import WeatherCard from '@site/src/components/weatherFeature/view/WeatherCard';

const CurrentWeather = ({ currentWeatherData, loading }) => {
	return (
		<Box>
			<WeatherCard loading={loading} currentWeatherData={currentWeatherData} />
		</Box>
	);
};
export default CurrentWeather;
