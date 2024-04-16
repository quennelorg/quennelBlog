import { CityType, MainTextMatchedSubstrings, PlaceType } from '@site/src/components/address/model';

export const getOptions = (citys: CityType[], inputValue: string): PlaceType[] => {
	if (!citys || citys.length === 0) {
		return [];
	}
	try {
		return citys.map((city): PlaceType => {
			return {
				description: city.name + ',' + city.region,
				structured_formatting: {
					main_text: city.name,
					secondary_text: city.region,
					main_text_matched_substrings: [{ offset: 0, length: inputValue.length }],
				},
			};
		});
	} catch (e) {
		return [];
	}
};
