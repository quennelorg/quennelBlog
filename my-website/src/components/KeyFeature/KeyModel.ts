import * as React from 'react';
import { green } from '@mui/material/colors';

export interface key {
	name: string;
	id: string;
	type: APITYPE;
}

export enum APITYPE {
	geo = 0,
	weather = 1,
}

export interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: number;
	value: number;
}

export const a11yProps = (index: any) => {
	return {
		id: `action-tab-${index}`,
		'aria-controls': `action-tabpanel-${index}`,
	};
};

export const fabStyle = {
	position: 'absolute',
	bottom: 16,
	right: 16,
};

export const fabGreenStyle = {
	color: 'common.white',
	bgcolor: green[500],
	'&:hover': {
		bgcolor: green[600],
	},
};
