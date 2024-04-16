import React from 'react';
import Layout from '@theme/Layout';
import KeyFeature from '@site/src/components/keyFeature/main';
import { Typography } from '@mui/material';
import AddressInput from '@site/src/components/address/AddressInput';

export default function KeyManagement(): JSX.Element {
	return (
		<Layout>
			<Typography variant="h1" component="h2">
				Manage your key
			</Typography>
			<KeyFeature />
			<AddressInput />
		</Layout>
	);
}
