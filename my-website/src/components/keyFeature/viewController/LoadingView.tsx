import * as React from 'react';
import { Box, Fab, CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import WarningIcon from '@mui/icons-material/Warning';

const LoadingView = ({ loading, success, handleButtonClick }) => {
	const buttonSx = {
		...(success && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700],
			},
		}),
	};
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ m: 1, position: 'relative' }}>
				<Fab aria-label="save" color="primary" sx={buttonSx} onClick={handleButtonClick}>
					{loading ? <SaveIcon /> : success ? <CheckIcon /> : <WarningIcon />}
				</Fab>
				{loading && (
					<CircularProgress
						size={68}
						sx={{
							color: green[500],
							position: 'absolute',
							top: -6,
							left: -6,
							zIndex: 1,
						}}
					/>
				)}
			</Box>
		</Box>
	);
};

export default LoadingView;
