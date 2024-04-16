import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CityType, PlaceType } from '@site/src/components/address/model';
import { getLocalStorageByKey } from '@site/src/hooks/useLocalStorage';
import config from '@site/configProxy/config';
import { getApiKey } from '@site/src/components/keyFeature/KeyViewModel';
import { APITYPE } from '@site/src/components/keyFeature/KeyModel';
import { fetchCities } from '@site/src/components/service/geo/geoService';
import { getOptions } from '@site/src/components/address/viewModel';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = 'AIzaSyC3aviU6KHXAjoSnxcw6qbOhjnFctbxPkE';

// function loadScript(src: string, position: HTMLElement | null, id: string) {
// 	if (!position) {
// 		return;
// 	}
//
// 	const script = document.createElement('script');
// 	script.setAttribute('async', '');
// 	script.setAttribute('id', id);
// 	script.src = src;
// 	position.appendChild(script);
// }

const autocompleteService = { current: null };

const AddressInput = () => {
	const [value, setValue] = useState<PlaceType | null>(null);
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState<readonly PlaceType[]>([]);
	const loaded = useRef(false);
	// const apiKey = getApiKey(getLocalStorageByKey(config.API_KEY_LIST), APITYPE.geo);
	const apiKey = 'process.env.RAPID_API_KEY_1';
	// if (typeof window !== 'undefined' && !loaded.current) {
	// 	if (!document.querySelector('#google-maps')) {
	// 		loadScript(
	// 			`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
	// 			document.querySelector('head'),
	// 			'google-maps',
	// 		);
	// 	}
	//
	// 	loaded.current = true;
	// }

	const fetch = useMemo(
		() =>
			debounce((request: { input: string }, callback: (results?: readonly PlaceType[]) => void) => {
				(autocompleteService.current as any).getPlacePredictions(request, callback);
			}, 600),
		[],
	);

	const fetchCityData = useMemo(() => debounce((key: string, inputValue: string) => getCityAddress(key, inputValue), 400), []);

	const [cities, setCities] = useState<CityType[]>([]);
	const [cityValue, setCityValue] = useState<CityType | null>(null);
	const getCityAddress = (key: string, inputValue: string) => {
		fetchCities(key, inputValue)
			.then((res) => {
				console.log(res);
				setCities(res.data);
				const results = getOptions(res.data.data, inputValue);
				console.log(results);
				let newOptions: readonly PlaceType[] = [];
				if (value) {
					newOptions = [value];
				}

				if (cities) {
					newOptions = [...newOptions, ...results];
				}

				setOptions(newOptions);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		let active = true;

		// if (!autocompleteService.current && (window as any).google) {
		// 	autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
		// }
		// if (!autocompleteService.current) {
		// 	return undefined;
		// }

		if (inputValue === '') {
			setOptions(value ? [value] : []);
			return undefined;
		}
		console.log(apiKey);
		fetchCityData(apiKey, inputValue);
		// fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
		// 	if (active) {
		// 		let newOptions: readonly PlaceType[] = [];
		//
		// 		if (value) {
		// 			newOptions = [value];
		// 		}
		//
		// 		if (results) {
		// 			newOptions = [...newOptions, ...results];
		// 		}
		//
		// 		setOptions(newOptions);
		// 	}
		// });

		if (!cities || cities.length === 0) {
			return undefined;
		}

		return () => {
			active = false;
		};
	}, [value, inputValue, fetch]);

	return (
		<Autocomplete
			id="google-map-demo"
			sx={{ width: 300 }}
			getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			value={value}
			noOptionsText="No locations"
			onChange={(event: any, newValue: PlaceType | null) => {
				setOptions(newValue ? [newValue, ...options] : options);
				setValue(newValue);
			}}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			renderInput={(params) => <TextField {...params} label="Add a location" fullWidth />}
			renderOption={(props, option) => {
				const matches = option.structured_formatting.main_text_matched_substrings || [];

				const parts = parse(
					option.structured_formatting.main_text,
					matches.map((match: any) => [match.offset, match.offset + match.length]),
				);

				return (
					<li {...props}>
						<Grid container alignItems="center">
							<Grid item sx={{ display: 'flex', width: 44 }}>
								<LocationOnIcon sx={{ color: 'text.secondary' }} />
							</Grid>
							<Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
								{parts.map((part, index) => (
									<Box key={index} component="span" sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}>
										{part.text}
									</Box>
								))}
								<Typography variant="body2" color="text.secondary">
									{option.structured_formatting.secondary_text}
								</Typography>
							</Grid>
						</Grid>
					</li>
				);
			}}
		/>
	);
};

export default AddressInput;
