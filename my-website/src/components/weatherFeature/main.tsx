import { Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import CitySearch from '@site/src/components/weatherFeature/viewController/CitySearch';
import ClockTool from '@site/src/components/weatherFeature/viewController/ClockTool';
import CurrentWeather from '@site/src/components/weatherFeature/viewController/CurrentWeather';
import ForecastWeather from '@site/src/components/weatherFeature/viewController/ForecastWeather';
import { PlaceType } from '@site/src/components/address/model';

const Item = styled(Paper)(({ theme }) => ({
	// backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	// textAlign: 'center',
	// color: theme.palette.text.secondary,
}));
const WeatherFeature = () => {
	const [currentWeatherData, setCurrentWeatherData] = useState<PlaceType | null>(null);
	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Item>
						<ClockTool />
					</Item>
				</Grid>
				<Grid item xs={6}>
					<Item>
						<CitySearch />
					</Item>
				</Grid>
				<Grid item xs={12}>
					<Item>
						<CurrentWeather />
					</Item>
				</Grid>
				<Grid item xs={12}>
					<Item>
						<ForecastWeather />
					</Item>
				</Grid>
			</Grid>
		</Box>
	);
};

export default WeatherFeature;
