import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import AddKeyDialog from '@site/src/components/keyFeature/viewController/AddKeyDialog';
import useLocalStorage from '@site/src/hooks/useLocalStorage';
import KeyBar from '@site/src/components/keyFeature/viewController/KeyBar';
import { key } from '@site/src/components/keyFeature/model';
import config from '@site/configProxy/config';

const KeyFeature = () => {
	const [open, setOpen] = useState(false);
	const [testing, setTesting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [list, setList] = useLocalStorage(config.API_KEY_LIST, []);

	const handleClickOpen = () => {
		setTesting(false);
		setSuccess(false);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const addList = (key: key) => {
		setList([...list, key]);
	};
	const handleRemove = (e) => {
		e.preventDefault();
		setList([]);
	};
	return (
		<Box>
			<Button variant="outlined" onClick={handleRemove}>
				清除你的key
			</Button>
			<AddKeyDialog
				open={open}
				handleClose={handleClose}
				testing={testing}
				setTesting={setTesting}
				success={success}
				setSuccess={setSuccess}
				addList={addList}
			/>
			<KeyBar list={list} handleClickOpen={handleClickOpen} />
		</Box>
	);
};

export default KeyFeature;
