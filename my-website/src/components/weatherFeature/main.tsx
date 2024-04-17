import { Box } from '@mui/material';
import React from 'react';
import CitySearch from '@site/src/components/weatherFeature/viewController/CitySearch';
import ClockTool from '@site/src/components/weatherFeature/viewController/ClockTool';

const WeatherFeature = () => {
	return (
		<Box>
			<ClockTool />
			123
			<CitySearch />
		</Box>
	);
};

export default WeatherFeature;
