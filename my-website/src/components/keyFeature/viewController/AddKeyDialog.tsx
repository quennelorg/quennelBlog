import * as React from 'react';
import { useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';
import { APITYPE, DIALOGTITLE } from '@site/src/components/keyFeature/model';
import { fetchCities } from '@site/src/components/service/geo/geoService';
import LoadingView from '@site/src/components/keyFeature/viewController/LoadingView';
import { fetchCurrentWeather, fetchForecastWeather } from '@site/src/components/service/weather/weatherService';
import { GeoLatLon } from '@site/src/components/service/weather/model';

const AddKeyDialog = ({ open, handleClose, testing, setTesting, success, setSuccess, addList }) => {
	const [loading, setLoading] = useState(false);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const formJson = Object.fromEntries((formData as any).entries());
		setTesting(true);
		setLoading(true);
		getData(formJson);
	};

	const getData = (formJson: any) => {
		console.log(formJson);
		const { keyId: key, keyName: name, APITYPE: type } = formJson;
		if (type === APITYPE.geo.toString()) {
			fetchCities(key)
				.then((res) => {
					console.log(res.data);
					setSuccess(true);
					setLoading(false);
					addList({ name: name, id: key, type: Number(type) });
				})
				.catch((error) => {
					console.log(error);
					setLoading(false);
					setSuccess(false);
				});
		}
		if (type === APITYPE.weather.toString()) {
			const geoLatLon: GeoLatLon = { latitude: 30.587222222, longitude: 114.288055555 };
			fetchForecastWeather(key, geoLatLon)
				.then((res) => {
					console.log(res.data);
					setSuccess(true);
					setLoading(false);
					addList({ name: name, id: key, type: Number(type) });
				})
				.catch((error) => {
					console.log(error);
					setLoading(false);
					setSuccess(false);
				});
		}
	};

	const handleButtonClick = () => {
		if (loading) {
			setSuccess(true);
			setLoading(false);
			return;
		}
		if (success) {
			handleClose();
		} else {
			setTesting(false);
		}
	};

	const getDialogTitle = () => {
		if (!testing) {
			return DIALOGTITLE.edit;
		}
		if (loading) {
			return DIALOGTITLE.test;
		}
		if (success) {
			return DIALOGTITLE.success;
		}
		return DIALOGTITLE.fail;
	};

	return (
		<React.Fragment>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					onSubmit: (event: React.FormEvent<HTMLFormElement>) => handleSubmit(event),
				}}
			>
				<DialogTitle>{getDialogTitle()}</DialogTitle>
				<ApiDialogContent testing={testing} loading={loading} success={success} handleButtonClick={handleButtonClick} />
				<ApiDialogActions testing={testing} handleClose={handleClose} />
			</Dialog>
		</React.Fragment>
	);
};

const ApiDialogActions = ({ testing, handleClose }) => {
	return (
		<>
			{!testing && (
				<DialogActions>
					<Button onClick={handleClose}>取消</Button>
					<Button type="submit">提交</Button>
				</DialogActions>
			)}
		</>
	);
};

const ApiDialogContent = ({ testing, loading, success, handleButtonClick }) => {
	return (
		<>
			{testing ? (
				<DialogContent>
					<LoadingView loading={loading} success={success} handleButtonClick={handleButtonClick} />
				</DialogContent>
			) : (
				<DialogContent>
					<DialogContentText>请输入你个人key用来享受服务</DialogContentText>
					<TextField
						autoFocus
						required
						margin="dense"
						id="keyName"
						name="keyName"
						label="请给你的key起一个名字,例如注册key的邮箱"
						type="keyName"
						fullWidth
						variant="standard"
					/>
					<TextField required margin="dense" id="keyId" name="keyId" label="在这里输入你的key" type="keyId" fullWidth variant="standard" />
					<RadioButtonsGroup />
				</DialogContent>
			)}
		</>
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
