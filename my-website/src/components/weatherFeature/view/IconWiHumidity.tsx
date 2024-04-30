import { SvgIcon, SvgIconProps } from '@mui/material';

export interface IconProps extends SvgIconProps {}

const IconWiHumidity = (props: IconProps) => {
	return (
		<SvgIcon style={{ fill: '#000000' }} {...props}>
			<path d="M15.287 3.71a.548.548 0 0 0-.883.649c3.986 5.424 4.822 9.023 4.822 11.086 0 2.023-.604 3.856-1.7 5.163-1.28 1.524-3.14 2.297-5.526 2.297-5.334 0-7.226-4.019-7.226-7.46 0-3.814 2.052-7.54 3.774-9.993C10.437 2.762 12.354.967 12.373.95a.548.548 0 0 0-.746-.803c-.08.076-2.008 1.877-3.962 4.657-1.819 2.588-3.987 6.535-3.987 10.642 0 2.269.707 4.353 1.99 5.869C7.153 23.07 9.343 24 12 24c2.687 0 4.888-.93 6.364-2.688 1.263-1.503 1.958-3.587 1.958-5.867 0-4.036-2.738-8.61-5.035-11.735z" />
			<path d="m14.492 10.82-6.95 6.95a.548.548 0 1 0 .775.775l6.95-6.95a.548.548 0 1 0-.775-.775zm-.472 4.364c-.97 0-1.76.79-1.76 1.76s.79 1.761 1.76 1.761 1.76-.79 1.76-1.76-.79-1.761-1.76-1.761zm0 2.425a.666.666 0 1 1 .002-1.331.666.666 0 0 1-.002 1.331zM9.142 14.18c.971 0 1.76-.79 1.76-1.76s-.789-1.76-1.76-1.76-1.76.79-1.76 1.76.79 1.76 1.76 1.76zm0-2.425a.666.666 0 1 1-.001 1.331.666.666 0 0 1 .001-1.331z" />
		</SvgIcon>
	);
};

export default IconWiHumidity;