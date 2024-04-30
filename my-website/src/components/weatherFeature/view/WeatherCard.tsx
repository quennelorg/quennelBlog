import { Weather } from '@site/src/components/service/weather/model';
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import * as React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReactAnimatedWeather from 'react-animated-weather';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import WbTwilightTwoToneIcon from '@mui/icons-material/WbTwilightTwoTone';
import AirTwoToneIcon from '@mui/icons-material/AirTwoTone';
import LocalFireDepartmentTwoToneIcon from '@mui/icons-material/LocalFireDepartmentTwoTone';
import AcUnitTwoToneIcon from '@mui/icons-material/AcUnitTwoTone';
import CloudTwoToneIcon from '@mui/icons-material/CloudTwoTone';
import DeviceThermostatTwoToneIcon from '@mui/icons-material/DeviceThermostatTwoTone';
import IconWiHumidity from '@site/src/components/weatherFeature/view/IconWiHumidity';

const WeatherCard = ({ loading, currentWeatherData }) => {
	const data: Weather = currentWeatherData;
	return (
		<Card sx={{ m: 1 }}>
			<CardHeader
				avatar={
					loading ? (
						<Skeleton animation="wave" variant="circular" width={60} height={60} />
					) : (
						<Avatar alt={data.descriptionEn} src={require(`@site/static/img/weatherIcon/${data.iconCode}.png`).default} />
					)
				}
				action={loading ? null : <IconButton aria-label="settings">{<MoreVertIcon />}</IconButton>}
				title={loading ? <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} /> : data.description}
				subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : data.date}
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
						<Skeleton animation="wave" height={20} />
						<Skeleton animation="wave" height={20} />
						<Skeleton animation="wave" height={20} style={{ marginTop: 6 }} />
						<Skeleton animation="wave" height={20} />
					</React.Fragment>
				) : (
					<Box>
						<Grid container spacing={2}>
							<Grid item xs={6} md={3}>
								<Stack direction="column" spacing={2}>
									<Box>
										<Stack direction="row" spacing={1}>
											<LocalFireDepartmentTwoToneIcon />
											<Typography variant="body1" color="text.secondary" component="p">
												高温
											</Typography>
										</Stack>
										<Typography variant="h4" color="text.primary" component="p">
											{data.temp.tempMax}°C
										</Typography>
									</Box>
									<Box>
										<Stack direction="row" spacing={1}>
											<AcUnitTwoToneIcon />
											<Typography variant="body1" color="text.secondary" component="p" align="center">
												低温
											</Typography>
										</Stack>
										<Typography variant="h4" color="text.primary" component="p">
											{data.temp.tempMin}°C
										</Typography>
									</Box>
								</Stack>
							</Grid>

							<Grid item xs={6} md={3}>
								<Stack direction="column" spacing={2}>
									<Box>
										<Stack direction="row" spacing={1}>
											<CloudTwoToneIcon />
											<Typography variant="body1" color="text.secondary" component="p">
												云量
											</Typography>
										</Stack>
										<Typography variant="h4" color="text.primary" component="p">
											{data.airConditions.clouds}%
										</Typography>
									</Box>
									<Box>
										<Stack direction="row" spacing={1}>
											<DeviceThermostatTwoToneIcon />
											<Typography variant="body1" color="text.secondary" component="p" align="center">
												体感
											</Typography>
										</Stack>
										<Typography variant="h4" color="text.primary" component="p">
											{data.temp.feelTemp}°C
										</Typography>
									</Box>
								</Stack>
							</Grid>

							<Grid item xs={6} md={3}>
								<Stack direction="column" spacing={2}>
									<Box>
										<Stack direction="row" spacing={1}>
											<WbSunnyTwoToneIcon />
											<Typography variant="body1" color="text.secondary" component="p">
												日升
											</Typography>
										</Stack>
										<Typography variant="h4" color="text.primary" component="p">
											{data.sunrise}
										</Typography>
									</Box>
									<Box>
										<Stack direction="row" spacing={1}>
											<WbTwilightTwoToneIcon />
											<Typography variant="body1" color="text.secondary" component="p" align="center">
												日落
											</Typography>
										</Stack>
										<Typography variant="h4" color="text.primary" component="p">
											{data.sunset}
										</Typography>
									</Box>
								</Stack>
							</Grid>

							<Grid item xs={6} md={3}>
								<Stack direction="column" spacing={2}>
									<Box>
										<Stack direction="row" spacing={1}>
											<AirTwoToneIcon />
											<Typography variant="body1" color="text.secondary" component="p">
												风速
											</Typography>
										</Stack>
										<Typography variant="h4" color="text.primary" component="p">
											{data.airConditions.wind.speed}m/s
										</Typography>
									</Box>
									<Box>
										<Stack direction="row" spacing={1}>
											<IconWiHumidity />
											<Typography variant="body1" color="text.secondary" component="p" align="center">
												湿度
											</Typography>
										</Stack>
										<Typography variant="h4" color="text.primary" component="p">
											{data.airConditions.humidity}%
										</Typography>
									</Box>
								</Stack>
							</Grid>
						</Grid>
					</Box>
				)}
			</CardContent>
		</Card>
	);
};

export default WeatherCard;
