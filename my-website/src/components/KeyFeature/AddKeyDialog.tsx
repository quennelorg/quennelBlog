import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddKeyDialog = () => {
	const [open, setOpen] = React.useState(false);

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
					onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						const formData = new FormData(event.currentTarget);
						const formJson = Object.fromEntries((formData as any).entries());
						const key = formJson.key;
						console.log(key);
						handleClose();
					},
				}}
			>
				<DialogTitle>填写框</DialogTitle>
				<DialogContent>
					<DialogContentText>请输入你个人key用来享受服务</DialogContentText>
					<TextField autoFocus required margin="dense" id="name" name="key" label="在这里输入你的key" type="key" fullWidth variant="standard" />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>取消</Button>
					<Button type="submit">提交</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};
export default AddKeyDialog;
