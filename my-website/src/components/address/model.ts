export interface MainTextMatchedSubstrings {
	offset: number;
	length: number;
}
export interface StructuredFormatting {
	main_text: string;
	secondary_text: string;
	main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
export interface PlaceType {
	description: string;
	structured_formatting: StructuredFormatting;
}

export interface CityType {
	city: string;
	country: string;
	countryCode: string;
	id: number;
	latitude: number;
	longitude: number;
	name: string;
	population: number;
	region: string;
	regionCode: string;
	regionWdId: string;
	type: string;
	wikiDataId: string;
}
