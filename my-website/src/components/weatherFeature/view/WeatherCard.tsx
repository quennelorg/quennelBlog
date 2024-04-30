import { Weather } from '@site/src/components/service/weather/model';
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Skeleton, Typography } from '@mui/material';
import * as React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReactAnimatedWeather from 'react-animated-weather';

const WeatherCard = ({ loading, currentWeatherData }) => {
	const data: Weather = currentWeatherData;
	return (
		<Card sx={{ maxWidth: 860, m: 1 }}>
			<CardHeader
				avatar={
					loading ? (
						<Skeleton animation="wave" variant="circular" width={60} height={60} />
					) : (
						<Avatar alt={data.descriptionEn} src={require(`@site/static/img/weatherIcon/${data.iconCode}.png`).default} />
					)
				}
				action={loading ? null : <IconButton aria-label="settings">{/*<MoreVertIcon />*/}</IconButton>}
				title={loading ? <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} /> : data.description}
				subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : data.temp.feelTemp}
			/>
			{loading ? (
				<Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
			) : (
				<CardMedia sx={{ textAlign: 'center' }}>
					<ReactAnimatedWeather
						icon={data.reactAnimatedWeather.icon}
						color={data.reactAnimatedWeather.color}
						size={data.reactAnimatedWeather.size}
						animate={data.reactAnimatedWeather.animate}
					/>
				</CardMedia>
			)}
			<CardContent>
				{loading ? (
					<React.Fragment>
						<Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
						<Skeleton animation="wave" height={10} width="80%" />
					</React.Fragment>
				) : (
					<Box>
						<Typography variant="body2" color="text.secondary" component="p">
							日升时间：{data.sunrise}
						</Typography>
						<Typography variant="body2" color="text.secondary" component="p">
							日落时间：{data.sunset}
						</Typography>
					</Box>
				)}
			</CardContent>
		</Card>
	);
};

export default WeatherCard;
