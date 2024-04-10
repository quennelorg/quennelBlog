import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { AppBar, Tabs, Tab, Typography, Zoom, Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { SxProps } from '@mui/system';
import { getGeoKey, getWeatherKey } from '@site/src/components/KeyFeature/KeyViewModel';
import { TabPanelProps, a11yProps, fabGreenStyle, fabStyle } from '@site/src/components/KeyFeature/KeyModel';

const KeyBar = ({ list }) => {
	const geoKeyList = getGeoKey(list);
	const weatherKeyList = getWeatherKey(list);
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: unknown, newValue: number) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
	};

	const transitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen,
	};

	return (
		<Box
			sx={{
				bgcolor: 'background.paper',
				width: 500,
				position: 'relative',
				minHeight: 200,
			}}
		>
			<AppBar position="static" color="default">
				<Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth" aria-label="action tabs example">
					<Tab label="Geo" {...a11yProps(0)} />
					<Tab label="Weather" {...a11yProps(1)} />
					<Tab label="Other" {...a11yProps(2)} />
				</Tabs>
			</AppBar>
			<SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
				<TabPanel value={value} index={0} dir={theme.direction}>
					{geoKeyList.length > 0 ? <KeyTypography keys={geoKeyList} /> : '请去增加你的key'}
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					{weatherKeyList.length > 0 ? <KeyTypography keys={weatherKeyList} /> : '请去增加你的key'}
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					持续更新
				</TabPanel>
			</SwipeableViews>
			{fabs.map((fab, index) => (
				<Zoom
					key={fab.color}
					in={value === index}
					timeout={transitionDuration}
					style={{
						transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
					}}
					unmountOnExit
				>
					<Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
						{fab.icon}
					</Fab>
				</Zoom>
			))}
		</Box>
	);
};

const fabs = [
	{
		color: 'primary' as 'primary',
		sx: fabStyle as SxProps,
		icon: <AddIcon />,
		label: 'Add',
	},
	{
		color: 'secondary' as 'secondary',
		sx: fabStyle as SxProps,
		icon: <EditIcon />,
		label: 'Edit',
	},
	{
		color: 'inherit' as 'inherit',
		sx: { ...fabStyle, ...fabGreenStyle } as SxProps,
		icon: <UpIcon />,
		label: 'Expand',
	},
];

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`action-tabpanel-${index}`}
			aria-labelledby={`action-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</Typography>
	);
};

const KeyTypography = ({ keys }) => {
	return (
		<>
			{keys.map((key) => {
				return (
					<Typography sx={{ width: '70%' }} style={{ color: 'text.secondary' }} key={key.id}>
						{key.name}
					</Typography>
				);
			})}
		</>
	);
};

export default KeyBar;
