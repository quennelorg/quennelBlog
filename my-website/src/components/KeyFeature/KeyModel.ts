export interface key {
	name: string;
	id: string;
	type: APITYPE;
}

export enum APITYPE {
	geo = 0,
	weather = 1,
}
