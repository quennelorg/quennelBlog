import React, { useState } from 'react';
import Layout from '@theme/Layout';
import KeyFeature from '@site/src/components/keyFeature/main';
import { Typography } from '@mui/material';
import AddressInput from '@site/src/components/address/AddressInput';
import { PlaceType } from '@site/src/components/address/model';

export default function KeyManagement(): JSX.Element {
	const [value, setValue] = useState<PlaceType | null>(null);
	return (
		<Layout>
			<Typography variant="h1" component="h2">
				Manage your key
			</Typography>
			<KeyFeature />
			<AddressInput value={value} setValue={setValue} />
		</Layout>
	);
}
