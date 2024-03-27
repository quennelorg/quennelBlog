import React, { useState } from 'react';
import List from '@site/src/components/TodoFeature/List';
import * as _ from 'lodash';
import { Alert, AlertType } from '@site/src/components/TodoFeature/TodoModel';
import AlertComponent from '@site/src/components/TodoFeature/AlertComponent';

export default function TodoFeature() {
	const [taskName, setTaskName] = useState('');
	const [list, setList] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(null);
	const [alert, setAlert] = useState<Alert>({ showAlert: false, type: AlertType.default });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!taskName || _.isEmpty(taskName)) {
			showAlert({ showAlert: true, type: AlertType.error });
			return;
		}
		if (isEditing) {
			setList(
				list.map((item) => {
					if (item.id === editId) {
						return { ...item, title: taskName };
					}
					return item;
				}),
			);
			setTaskName('');
			setEditId(null);
			setIsEditing(false);
			showAlert({ showAlert: true, type: AlertType.updateSuccess });
			return;
		}
		showAlert({ showAlert: true, type: AlertType.createSuccess });
		const newItem = { id: new Date().getTime().toString(), title: taskName };
		setList([...list, newItem]);
		setTaskName('');
	};
	const showAlert = (alert: Alert) => {
		setAlert(alert);
	};
	const removeAlert = () => {
		setAlert({ showAlert: false, type: AlertType.default });
	};
	const removeItem = () => {};
	const editItem = () => {};
	const clearList = () => {};

	return (
		<section className="section-center">
			<form onSubmit={handleSubmit}>
				{alert.showAlert && <AlertComponent alertContent={alert} removeAlert={removeAlert} list={list} />}
				<h3>Create your Todo App </h3>
				<div className="mb-3 form">
					<input
						type="text"
						className="form-control"
						placeholder="填点什么吧"
						onChange={(e) => {
							setTaskName(e.target.value);
							console.log(e.target.value);
						}}
						value={taskName}
					/>
					<button type="submit" className="btn btn-success">
						{isEditing ? 'Edit' : 'Submit'}
					</button>
				</div>
				{list.length > 0 && (
					<div style={{ marginTop: '2rem' }}>
						<List tasks={list} removeTask={removeItem} editTask={editItem} />
						<div className="text-center">
							<button className="btn btn-warning" onClick={clearList}>
								Clear Items
							</button>
						</div>
					</div>
				)}
			</form>
		</section>
	);
}
