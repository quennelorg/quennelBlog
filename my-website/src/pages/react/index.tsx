import React from 'react';
import Layout from '@theme/Layout';
import WeatherFeature from '@site/src/components/weatherFeature/main';

export default function MyReactPage(): JSX.Element {
	return (
		<Layout>
			<h1>My React page</h1>
			<p>This is a React page</p>
			<WeatherFeature />
		</Layout>
	);
}
