import AddressInput from '@site/src/components/address/AddressInput';
import { Stack, Box } from '@mui/material';
import LoadingButtonView from '@site/src/components/weatherFeature/viewController/LadoingButtonView';
import { useState } from 'react';
import { fetchCurrentWeather } from '@site/src/components/service/weather/weatherService';
import { GeoLatLon } from '@site/src/components/service/weather/model';
import { PlaceType } from '@site/src/components/address/model';

const CitySearch = () => {
	const [value, setValue] = useState<PlaceType | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const handleButtonClick = () => {
		if (!loading) {
			setLoading(true);
		}
		const key = 'f13d5af96be223d2a7b9d72f0a3dd2ce';
		const geoLatLon: GeoLatLon = { latitude: value.latitude, longitude: value.longitude };
		fetchCurrentWeather(key, geoLatLon)
			.then((res) => {
				setLoading(false);
				setSuccess(true);
				console.log(res.data);
				setTimeout(tick, 1000);
			})
			.catch((error) => {
				setLoading(false);
				setSuccess(false);
				console.log(error);
			});
	};

	const tick = () => {
		setSuccess(false);
		console.log('回到初始状态');
	};

	return (
		<Stack direction="row" spacing={1}>
			<Box>
				<AddressInput value={value} setValue={setValue} />
			</Box>
			<Box>
				<LoadingButtonView loading={loading} success={success} handleButtonClick={handleButtonClick} />
			</Box>
			<Box>Item 3</Box>
		</Stack>
	);
};
export default CitySearch;
