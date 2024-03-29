import { useState } from 'react';
import { Alert, OperationContent, Task } from '@site/src/components/TodoFeature/TodoModel';

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
export const setList = (list: Array<Task>, operation: OperationContent): Array<Task> => {
	const newList = [];
	if (operation === OperationContent.create) {
	}
	return newList;
};

export default TodoViewModel;
