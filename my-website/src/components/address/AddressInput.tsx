import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import parse from 'autosuggest-highlight/parse';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PlaceType } from '@site/src/components/address/model';
import { getCityAddress } from '@site/src/components/address/viewModel';
import { debounce } from '@mui/material/utils';
import { getApiKey } from '@site/src/components/keyFeature/KeyViewModel';
import { APITYPE } from '@site/src/components/keyFeature/KeyModel';

const AddressInput = () => {
	const [value, setValue] = useState<PlaceType | null>(null);
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState<readonly PlaceType[]>([]);
	const apiKey = getApiKey(APITYPE.geo);

	const fetch = useCallback(
		debounce((request: { input: string; key: string }, callback: (results?: readonly PlaceType[]) => void) => {
			getCityAddress(request, callback);
		}, 600),
		[],
	);

	useEffect(() => {
		let active = true;
		if (inputValue === '') {
			setOptions(value ? [value] : []);
			return undefined;
		}
		console.log(apiKey);
		fetch({ input: inputValue, key: apiKey }, (results?: readonly PlaceType[]) => {
			if (active) {
				let newOptions: readonly PlaceType[] = [];

				if (value) {
					newOptions = [value];
				}

				if (results) {
					newOptions = [...newOptions, ...results];
				}

				setOptions(newOptions);
			}
		});

		return () => {
			active = false;
		};
	}, [value, inputValue, fetch]);

	return (
		<Autocomplete
			id="getCitiesAddress"
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
