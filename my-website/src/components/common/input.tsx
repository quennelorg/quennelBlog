import { TextField } from '@mui/material';
import React from 'react';

const CustomizeInput = ({ onChangeInputValue, handleSubmit, inputValue, label }) => {
	return (
		<TextField
			variant="outlined"
			onChange={onChangeInputValue}
			label={label}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					handleSubmit(e);
				}
			}}
			value={inputValue}
			sx={{ width: '100%' }}
		/>
	);
};

export default CustomizeInput;
