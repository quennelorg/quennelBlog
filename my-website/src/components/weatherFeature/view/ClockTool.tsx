import { Box } from '@mui/material';
import Clock from 'react-live-clock';
const ClockTool = () => {
	return (
		<Box>
			<h1>
				<Clock format="HH:mm:ss" interval={1000} ticking={true} />
			</h1>
		</Box>
	);
};
export default ClockTool;
