import React, { useState } from 'react';
import * as _ from 'lodash';
import { Alert, AlertType, Task, TaskType } from '@site/src/components/TodoFeature/TodoModel';
import AlertComponent from '@site/src/components/TodoFeature/AlertComponent';
import { Button, Checkbox, Container, List, ListItem, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';
import TaskList from '@site/src/components/TodoFeature/TaskList';

export default function TodoFeature() {
	const [taskName, setTaskName] = useState('');
	const [list, setList] = useState<Array<Task>>([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(null);
	const [alert, setAlert] = useState<Alert>({ showAlert: false });
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!taskName || _.isEmpty(taskName)) {
			showAlert({ showAlert: true, type: AlertType.emptyNameError });
			setTaskName('');
			return;
		}
		if (isEditing) {
			setList([...list, { id: editId, name: taskName, type: TaskType.normal, isOver: false }]);
			setIsEditing(false);
			showAlert({ showAlert: true, type: AlertType.updateSuccess });
			setTaskName('');
			return;
		}
		if (_.some(list, ['name', taskName])) {
			showAlert({ showAlert: true, type: AlertType.sameNameError });
			setTaskName('');
			return;
		}
		setList([...list, { id: new Date().getTime().toString(), name: taskName, type: TaskType.normal, isOver: false }]);
		showAlert({ showAlert: true, type: AlertType.createSuccess });
		setTaskName('');
	};
	const showAlert = (alert: Alert) => {
		setAlert(alert);
	};
	const removeAlert = () => {
		setAlert({ showAlert: false });
	};
	const deleteTask = (id) => {
		setList(list.filter((task) => task.id !== id));
		showAlert({ showAlert: true, type: AlertType.deleteSuccess });
	};

	const finishTask = (id) => {
		let isFinish = false;
		setList(
			_.map(list, (task) => {
				if (task.id === id) {
					isFinish = !task.isOver;
					return { ...task, isOver: !task.isOver };
				}
				return task;
			}),
		);
		if (isFinish) {
			showAlert({ showAlert: true, type: AlertType.finishSuccess });
		}
	};
	const editTask = (id) => {
		const newList = list.filter((task) => task.id !== id);
		const task = list.find((task) => task.id === id);
		setEditId(task.id);
		setTaskName(task.name);
		setList(newList);
		setIsEditing(true);
	};
	const clearList = () => {
		setAlert({ showAlert: true, type: AlertType.clearSuccess });
		setList([]);
	};
	const onChangeInputValue = (e) => {
		setTaskName(e.target.value);
	};
	return (
		<Container component="main" sx={{ textAlign: 'center', marginTop: 10 }}>
			<AlertComponent alertContent={alert} removeAlert={removeAlert} />
			<TextField
				variant="outlined"
				onChange={onChangeInputValue}
				label="今天准备做点什么"
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleSubmit(e);
					}
				}}
				value={taskName}
				sx={{ width: '70%', marginBottom: 10 }}
			/>
			<Button
				size="large"
				variant={isEditing ? 'outlined' : 'contained'}
				color="primary"
				onClick={handleSubmit}
				sx={{ height: 55, marginBottom: 30 }}
				disabled={!taskName}
				endIcon={isEditing ? <SendOutlinedIcon /> : <SendIcon />}
			>
				{isEditing ? 'Edit Task' : 'Add Task'}
			</Button>
			<Button
				disabled={_.some(list, ['isOver', false]) || list.length <= 0}
				variant="outlined"
				color="primary"
				size="large"
				endIcon={<FolderDeleteOutlinedIcon />}
				onClick={clearList}
			>
				只有都完成了才能解放
			</Button>
			<TaskList tasks={list} deleteTask={deleteTask} finishTask={finishTask} editTask={editTask} />
		</Container>
	);
}
