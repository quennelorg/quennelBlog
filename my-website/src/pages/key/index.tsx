import React from 'react';
import Layout from '@theme/Layout';
import WeatherFeature from '@site/src/components/weatherFeature/main';
import KeyFeature from '@site/src/components/keyFeature/main';
import { Typography } from '@mui/material';

export default function KeyManagement(): JSX.Element {
	return (
		<Layout>
			<Typography variant="h1" component="h2">
				Manage your key
			</Typography>
			<KeyFeature />
		</Layout>
	);
}
