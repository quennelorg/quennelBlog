import React, { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { Alert, AlertType, OperationContent, Task, TaskType } from '@site/src/components/TodoFeature/TodoModel';
import AlertComponent from '@site/src/components/TodoFeature/AlertComponent';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';
import TaskList from '@site/src/components/TodoFeature/TaskList';
import { getNewlist, getTimeId, isEmptyList } from '@site/src/components/TodoFeature/TodoViewModel';
import { useColorMode } from '@docusaurus/theme-common';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useLocalStorage from '@site/src/hooks/useLocalStorage';

const TodoFeature = () => {
	const { colorMode, setColorMode } = useColorMode();
	const isDark: boolean = colorMode === 'dark';
	const darkTheme = createTheme({
		palette: {
			mode: isDark ? 'dark' : 'light',
		},
	});
	const [taskName, setTaskName] = useState('');
	const [taskType, setTaskType] = useState<TaskType>(TaskType.normal);
	const [list, setList] = useLocalStorage('list', []);
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(null);
	const [alert, setAlert] = useState<Alert>({ showAlert: false });
	const [oldTask, setOldTask] = useState<Task>();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!taskName || _.isEmpty(taskName)) {
			showAlert({ showAlert: true, type: AlertType.emptyNameError }, true);
			return;
		}
		if (isEditing) {
			modifyTask(editId, OperationContent.update);
			setIsEditing(false);
			return;
		}
		if (_.some(list, ['name', taskName])) {
			showAlert({ showAlert: true, type: AlertType.sameNameError }, true);
			return;
		}
		modifyTask(getTimeId(), OperationContent.create);
	};
	const editTask = (id) => {
		const newList = list.filter((task) => task.id !== id);
		const task = list.find((task) => task.id === id);
		setEditId(getTimeId());
		setTaskName(task.name);
		setTaskType(task.type);
		setList(newList);
		setIsEditing(true);
		setOldTask(task);
	};
	const finishTask = (id) => {
		modifyTask(id, OperationContent.finish);
	};
	const deleteTask = (id) => {
		modifyTask(id, OperationContent.delete);
	};
	const clearList = () => {
		modifyTask('', OperationContent.removeAll);
	};

	const modifyTask = (id: string, operationContent: OperationContent) => {
		if ([OperationContent.create, OperationContent.update].includes(operationContent)) {
			const task = { id: id, name: taskName, type: taskType, isOver: false };
			const needOldTask = _.isEqual(_.omit(oldTask, 'id'), _.omit(task, 'id')) && operationContent === OperationContent.update;
			setList(getNewlist(list, needOldTask ? oldTask : task));
			const alertType: AlertType =
				operationContent === OperationContent.create ? AlertType.createSuccess : needOldTask ? AlertType.updateFailed : AlertType.updateSuccess;
			showAlert({ showAlert: true, type: alertType }, true);
			return;
		}
		if (operationContent === OperationContent.delete) {
			setList(list.filter((task) => task.id !== id));
			showAlert({ showAlert: true, type: AlertType.deleteSuccess });
			return;
		}
		if (operationContent === OperationContent.removeAll) {
			showAlert({ showAlert: true, type: AlertType.clearSuccess });
			setList([]);
			return;
		}
		if (operationContent === OperationContent.finish) {
			const task = list.find((task) => task.id === id);
			const isFinish = task.isOver;
			setList(
				getNewlist(
					list.filter((task) => task.id !== id),
					{ ...task, isOver: !isFinish },
				),
			);
			if (!isFinish) {
				showAlert({ showAlert: true, type: AlertType.finishSuccess });
			}
		}
	};
	const showAlert = (alert: Alert, shouldClearTaskName: boolean = false) => {
		setAlert(alert);
		if (shouldClearTaskName) {
			setTaskName('');
		}
	};
	const removeAlert = () => {
		setAlert({ showAlert: false });
	};
	const onChangeInputValue = (e) => {
		setTaskName(e.target.value);
	};
	const onChangeSelectValue = (e) => {
		setTaskType(e.target.value);
	};
	return (
		<ThemeProvider theme={darkTheme}>
			<Container component="main" maxWidth="sm" sx={{ marginTop: 5 }}>
				<AlertComponent alertContent={alert} removeAlert={removeAlert} />
				<Box>
					<Grid container spacing={1}>
						<Grid item xs={8}>
							<TodoInput
								onChangeInputValue={onChangeInputValue}
								handleSubmit={handleSubmit}
								taskName={taskName}
								label={isEditing ? '别想通过修改来快速完成任务' : '今天准备做点什么'}
							/>
						</Grid>
						<Grid item xs={4}>
							<EditingButton isEditing={isEditing} taskName={taskName} handleSubmit={handleSubmit} />
						</Grid>
						<Grid item xs={8}>
							{!_.isEmpty(taskName) && <PrioritySelect taskType={taskType} handleChange={onChangeSelectValue} />}
						</Grid>
						<Grid item xs={4}>
							{!isEmptyList(list) && <ClearListButton list={list} clearList={clearList} />}
						</Grid>
						<Grid item xs={12} sx={{ opacity: isEditing ? 0.5 : 1, pointerEvents: isEditing ? 'none' : 'auto' }}>
							{!isEmptyList(list) && <TaskList tasks={list} deleteTask={deleteTask} finishTask={finishTask} editTask={editTask} />}
						</Grid>
					</Grid>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

const TodoInput = ({ onChangeInputValue, handleSubmit, taskName, label }) => {
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
			value={taskName}
			sx={{ width: '100%' }}
		/>
	);
};

const EditingButton = ({ handleSubmit, isEditing, taskName }) => {
	return (
		<Button
			size="large"
			variant={isEditing ? 'outlined' : 'contained'}
			color="primary"
			onClick={handleSubmit}
			sx={{ height: 56, width: '100%' }}
			disabled={!taskName}
			endIcon={isEditing ? <SendOutlinedIcon /> : <SendIcon />}
		>
			{isEditing ? 'Edit Task' : 'Add Task'}
		</Button>
	);
};

const PrioritySelect = ({ taskType, handleChange }) => {
	return (
		<FormControl sx={{ width: '100%' }}>
			<InputLabel id="demo-simple-select-autowidth-label">优先级</InputLabel>
			<Select
				labelId="demo-simple-select-autowidth-label"
				id="demo-simple-select-autowidth"
				value={taskType}
				onChange={handleChange}
				autoWidth
				label="Priority"
			>
				<MenuItem value={TaskType.normal}>{TaskType.normal.valueOf()}</MenuItem>
				<MenuItem value={TaskType.important}>{TaskType.important.valueOf()}</MenuItem>
				<MenuItem value={TaskType.warning}>{TaskType.warning.valueOf()}</MenuItem>
			</Select>
		</FormControl>
	);
};
const ClearListButton = ({ list, clearList }) => {
	const unFinishedListLength = list.filter((task) => !task.isOver).length;
	return (
		<Button
			disabled={unFinishedListLength > 0}
			variant="outlined"
			color="success"
			size="large"
			sx={{ height: 56 }}
			endIcon={<FolderDeleteOutlinedIcon />}
			onClick={clearList}
		>
			{unFinishedListLength > 0 ? `你还有${unFinishedListLength}个任务没有完成` : '你已经完成所有任务！点我!'}
		</Button>
	);
};
export default TodoFeature;
