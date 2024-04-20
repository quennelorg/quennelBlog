import * as React from 'react';
import { Stack, Box, Card, CardHeader, Skeleton, Avatar, IconButton, CardContent, Typography, CardMedia } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReactAnimatedWeather from 'react-animated-weather';
const CurrentWeather = () => {
	return (
		<Box>
			<Stack direction="row">
				<WeatherCard loading={true} />
				<WeatherCard loading={false} />
			</Stack>
			<WeatherCard loading={true} />
			<WeatherCard loading={false} />
		</Box>
	);
};
export default CurrentWeather;

const WeatherCard = ({ loading }) => {
	const defaults = {
		icon: 'RAIN',
		color: 'goldenrod',
		size: 256,
		animate: true,
	};
	return (
		<Card sx={{ maxWidth: 345, m: 1 }}>
			<CardHeader
				avatar={
					loading ? (
						<Skeleton animation="wave" variant="circular" width={60} height={60} />
					) : (
						<Avatar alt="Ted talk" src="https://openweathermap.org/img/wn/02d@2x.png" />
					)
				}
				action={loading ? null : <IconButton aria-label="settings">{/*<MoreVertIcon />*/}</IconButton>}
				title={loading ? <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} /> : 'Ted'}
				subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : '5 hours ago'}
			/>
			{loading ? (
				<Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
			) : (
				<CardMedia sx={{ textAlign: 'center' }}>
					<ReactAnimatedWeather icon={defaults.icon} color={defaults.color} size={defaults.size} animate={defaults.animate} />
				</CardMedia>
			)}
			<CardContent>
				{loading ? (
					<React.Fragment>
						<Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
						<Skeleton animation="wave" height={10} width="80%" />
					</React.Fragment>
				) : (
					<Typography variant="body2" color="text.secondary" component="p">
						{"Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"}
					</Typography>
				)}
			</CardContent>
		</Card>
	);
};
