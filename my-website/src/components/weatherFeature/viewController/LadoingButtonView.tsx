import * as React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';

const LoadingButtonView = ({ loading, success, handleButtonClick }) => {
	const buttonSx = {
		...(success && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700],
			},
		}),
	};
	const text = success ? '已成功获取' : '获取当前天气';
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ m: 1, position: 'relative' }}>
				<Button variant="contained" sx={buttonSx} disabled={loading} onClick={handleButtonClick}>
					{text}
				</Button>
				{loading && (
					<CircularProgress
						size={24}
						sx={{
							color: green[500],
							position: 'absolute',
							top: '50%',
							left: '50%',
							marginTop: '-12px',
							marginLeft: '-12px',
						}}
					/>
				)}
			</Box>
		</Box>
	);
};

export default LoadingButtonView;
