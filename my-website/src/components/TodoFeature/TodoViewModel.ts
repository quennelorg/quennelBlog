import { useState } from 'react';
import { Alert, OperationContent, Task, TaskType } from '@site/src/components/TodoFeature/TodoModel';
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
	return [...list, task];
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
