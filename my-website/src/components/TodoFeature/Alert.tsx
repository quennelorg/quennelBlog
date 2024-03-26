import React, { useEffect } from 'react';
import Admonition from '@theme/Admonition';

const Alert = ({ type, message, removeAlert, list }) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			removeAlert();
		}, 3000);
		return () => clearTimeout(timeout);
	}, [list]);
	return (
		<Admonition type="tip" icon="💡" title="这是提示">
			{message}
		</Admonition>
	);
};

export default Alert;
