import { useState } from 'react';
import { Alert, Task, TaskType } from '@site/src/components/TodoFeature/TodoModel';
import * as _ from 'lodash';

const TodoViewModel = () => {
	const [taskName, setTaskName] = useState('');
	const [list, setList] = useState<Array<Task>>([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(null);
	const [alert, setAlert] = useState<Alert>({ showAlert: false });

	const showAlert = (alert: Alert, shouldClearTaskName: boolean = false) => {
		setAlert(alert);
		if (shouldClearTaskName) {
			setTaskName('');
		}
	};
};

export const getNewlist = (list: Array<Task>, task: Task): Array<Task> => {
	const newList = [...list, task];
	const finishedTasks = newList.filter((task) => task.isOver);
	const unFinishedTasks = _.orderBy(
		newList.filter((task) => !task.isOver),
		['id'],
		['asc'],
	);
	const normalTasks = unFinishedTasks.filter((task) => task.type === TaskType.normal);
	const importantTasks = unFinishedTasks.filter((task) => task.type === TaskType.important);
	const warningTasks = unFinishedTasks.filter((task) => task.type === TaskType.warning);

	return [...warningTasks, ...importantTasks, ...normalTasks, ...finishedTasks];
};

export const getTimeId = (): string => {
	return new Date().getTime().toString();
};
export const sortList = (list: Array<Task>): Array<Task> => {
	return _.orderBy(
		list,
		[
			'isOver',
			(task) => {
				const typeOrder = {
					[TaskType.warning]: 0,
					[TaskType.important]: 1,
					[TaskType.normal]: 2,
				};
				return typeOrder[task.type];
			},
		],
		['asc', 'asc'], // 升序排序
	);
};

export default TodoViewModel;
