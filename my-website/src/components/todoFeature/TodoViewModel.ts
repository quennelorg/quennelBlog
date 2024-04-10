import { useState } from 'react';
import { Alert, Task, TaskType } from '@site/src/components/todoFeature/TodoModel';
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

export const getNewlist = (list: Task[], task: Task): Task[] => {
	const newList = [...list, task];
	const [finishedTasks, unFinishedTasks] = _.partition(newList, 'isOver');
	const sortedUnFinishedTasks = _.orderBy(unFinishedTasks, 'id', 'asc');
	const groupedUnFinishedTasks = _.groupBy(sortedUnFinishedTasks, 'type');

	return [
		...(groupedUnFinishedTasks[TaskType.warning] || []),
		...(groupedUnFinishedTasks[TaskType.important] || []),
		...(groupedUnFinishedTasks[TaskType.normal] || []),
		...finishedTasks,
	];
};
export const getTimeId = (): string => {
	return new Date().getTime().toString();
};

export const isEmptyList = (list) => {
	return _.isEmpty(list) || !list;
};

export default TodoViewModel;
