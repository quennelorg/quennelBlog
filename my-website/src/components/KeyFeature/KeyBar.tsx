import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { getGeoKey, getWeatherKey } from '@site/src/components/KeyFeature/KeyViewModel';

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: number;
	value: number;
}

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

const a11yProps = (index: any) => {
	return {
		id: `action-tab-${index}`,
		'aria-controls': `action-tabpanel-${index}`,
	};
};

const fabStyle = {
	position: 'absolute',
	bottom: 16,
	right: 16,
};

const fabGreenStyle = {
	color: 'common.white',
	bgcolor: green[500],
	'&:hover': {
		bgcolor: green[600],
	},
};

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
					{geoKeyList.length > 0 ? '你有多个key' : '请去增加你的key'}
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					{weatherKeyList.length > 0 ? '你有多个key' : '请去增加你的key'}
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

const keyTypography = ({ keys }) => {
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
