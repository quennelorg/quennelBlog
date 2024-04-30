import { Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import CitySearch from '@site/src/components/weatherFeature/viewController/CitySearch';
import ClockTool from '@site/src/components/weatherFeature/viewController/ClockTool';
import CurrentWeather from '@site/src/components/weatherFeature/viewController/CurrentWeather';
import ForecastWeather from '@site/src/components/weatherFeature/viewController/ForecastWeather';
import { PlaceType } from '@site/src/components/address/model';
import { Weather } from '@site/src/components/service/weather/model';

const Item = styled(Paper)(({ theme }) => ({
	// backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	// textAlign: 'center',
	// color: theme.palette.text.secondary,
}));
const WeatherFeature = () => {
	const weather: Weather = {
		airConditions: {
			clouds: 100,
			wind: {
				speed: 8.29,
				deg: 10,
				gust: 12.58,
			},
			humidity: 84,
		},
		description: '阴，多云',
		descriptionEn: 'Clouds',
		iconCode: '04d',
		temp: {
			tempMax: 14.99,
			tempMin: 14.99,
			feelTemp: 14.74,
			mainTemp: 14.99,
		},
		sunrise: '2024-04-30 05:39:57',
		sunset: '2024-04-30 18:59:58',
		reactAnimatedWeather: {
			icon: 'PARTLY_CLOUDY_NIGHT',
			color: 'goldenrod',
			size: 128,
			animate: true,
		},
	};
	const [currentWeatherData, setCurrentWeatherData] = useState<Weather | null>(weather);
	const [loading, setLoading] = useState(false);
	const [forecastWeatherData, setForecastWeatherData] = useState<Weather[] | null>(null);
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
						<CitySearch setCurrentWeatherData={setCurrentWeatherData} loading={loading} setLoading={setLoading} />
					</Item>
				</Grid>
				{(currentWeatherData || loading) && (
					<Grid item xs={12}>
						<Item>
							<CurrentWeather currentWeatherData={currentWeatherData} loading={loading} />
						</Item>
					</Grid>
				)}
				{forecastWeatherData && (
					<Grid item xs={12}>
						<Item>
							<ForecastWeather />
						</Item>
					</Grid>
				)}
			</Grid>
		</Box>
	);
};

export default WeatherFeature;
