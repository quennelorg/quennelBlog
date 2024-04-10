import { Box } from '@mui/material';
import React from 'react';
import AddKeyDialog from '@site/src/components/KeyFeature/AddKeyDialog';
import useLocalStorage from '@site/src/hooks/useLocalStorage';
import KeyBar from '@site/src/components/KeyFeature/KeyBar';
import { key } from '@site/src/components/KeyFeature/KeyModel';
import Button from '@mui/material/Button';

const KeyFeature = () => {
	const [open, setOpen] = React.useState(false);
	const [list, setList] = useLocalStorage('API_KEY_LIST', []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const formJson = Object.fromEntries((formData as any).entries());
		const key = formJson.keyId;
		console.log(formJson);
		setOpen(false);
		addList({ name: formJson.keyName, id: formJson.keyId, type: Number(formJson.APITYPE) });
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
			<AddKeyDialog open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
			<KeyBar list={list} handleClickOpen={handleClickOpen} />
		</Box>
	);
};

export default KeyFeature;
