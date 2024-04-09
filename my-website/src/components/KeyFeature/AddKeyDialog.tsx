import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { APITYPE } from '@site/src/components/KeyFeature/KeyModel';

const AddKeyDialog = ({ open, setOpen, handleSubmit }) => {
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Button variant="outlined" onClick={handleClickOpen}>
				添加你的key
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					onSubmit: (event: React.FormEvent<HTMLFormElement>) => handleSubmit(event),
				}}
			>
				<DialogTitle>填写框</DialogTitle>
				<DialogContent>
					<DialogContentText>请输入你个人key用来享受服务</DialogContentText>
					<TextField
						autoFocus
						required
						margin="dense"
						id="keyName"
						name="keyName"
						label="请给你的key起一个名字"
						type="keyName"
						fullWidth
						variant="standard"
					/>
					<TextField required margin="dense" id="keyId" name="keyId" label="在这里输入你的key" type="keyId" fullWidth variant="standard" />
					<RadioButtonsGroup />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>取消</Button>
					<Button type="submit">提交</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

const RadioButtonsGroup = () => {
	return (
		<FormControl>
			<FormLabel id="demo-radio-buttons-group-label">API</FormLabel>
			<RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue={APITYPE.geo} name="APITYPE">
				<FormControlLabel value={APITYPE.geo} control={<Radio />} label="Geo" />
				<FormControlLabel value={APITYPE.weather} control={<Radio />} label="Weather" />
			</RadioGroup>
		</FormControl>
	);
};
export default AddKeyDialog;
