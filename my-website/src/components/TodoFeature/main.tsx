import React, { useState } from 'react';
import * as _ from 'lodash';
import { Alert, AlertType, OperationContent, Task, TaskType } from '@site/src/components/TodoFeature/TodoModel';
import AlertComponent from '@site/src/components/TodoFeature/AlertComponent';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';
import TaskList from '@site/src/components/TodoFeature/TaskList';
import { getNewlist, getTimeId } from '@site/src/components/TodoFeature/TodoViewModel';

const TodoFeature = () => {
	const [taskName, setTaskName] = useState('');
	const [taskType, setTaskType] = useState<TaskType>(TaskType.normal);
	const [list, setList] = useState<Array<Task>>([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(null);
	const [alert, setAlert] = useState<Alert>({ showAlert: false });
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
			setList(getNewlist(list, task));
			showAlert({ showAlert: true, type: operationContent === OperationContent.create ? AlertType.createSuccess : AlertType.updateSuccess }, true);
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
			if (isFinish) {
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
	const isEmptyTaskName = _.isEmpty(taskName);
	return (
		<Container component="main" maxWidth="sm" sx={{ marginTop: 10 }}>
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
						{!isEmptyTaskName && <PrioritySelect taskType={taskType} handleChange={onChangeSelectValue} />}
					</Grid>
					<Grid item xs={4}>
						{list.length > 0 && <ClearListButton list={list} clearList={clearList} />}
					</Grid>
					<Grid item xs={12}>
						<TaskList tasks={list} deleteTask={deleteTask} finishTask={finishTask} editTask={editTask} />
					</Grid>
				</Grid>
			</Box>
		</Container>
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
			sx={{ mt: 1 }}
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
	return (
		<Button
			disabled={_.some(list, ['isOver', false]) || list.length <= 0}
			variant="outlined"
			color="primary"
			size="large"
			sx={{ mt: 1 }}
			endIcon={<FolderDeleteOutlinedIcon />}
			onClick={clearList}
		>
			解放
		</Button>
	);
};
export default TodoFeature;
