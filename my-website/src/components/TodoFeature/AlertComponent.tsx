import React, { useEffect } from 'react';
import Admonition from '@theme/Admonition';
import { AlertType } from '@site/src/components/TodoFeature/TodoModel';
import { FcHighPriority, FcSms } from 'react-icons/fc';
const AlertComponent = ({ alertContent, removeAlert, list }) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			removeAlert();
		}, 3000);
		return () => clearTimeout(timeout);
	}, [list]);
	const type: AlertType = alertContent.type;
	const isError = type === AlertType.error;
	const title = isError ? '这是一个错误' : '这是一个提示';
	const admoitionType = isError ? 'danger' : 'tip';
	const icon = isError ? <FcHighPriority /> : <FcSms />;
	return (
		<Admonition type={admoitionType} icon={icon} title={title}>
			{type.valueOf()}
		</Admonition>
	);
};

export default AlertComponent;
