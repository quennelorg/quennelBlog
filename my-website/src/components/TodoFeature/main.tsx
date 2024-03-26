import React, { useState } from 'react';
import Alert from '@site/src/components/TodoFeature/Alert';
import List from '@site/src/components/TodoFeature/List';

export default function TodoFeature() {
	const [name, setName] = useState('');
	const [list, setList] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(null);
	const [alert, setAlert] = useState({ show: false, message: '', type: '' });

	const handleSubmit = () => {};
	const showAlert = () => {};
	const removeItem = () => {};
	const editItem = () => {};
	const clearList = () => {};

	return (
		<section className="section-center">
			<form onSubmit={handleSubmit}>
				{alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
				<h3>Create your Todo App </h3>
				<div className="mb-3 form">
					<input
						type="text"
						className="form-control"
						placeholder="填点什么吧"
						onChange={(e) => {
							setName(e.target.value);
							console.log(e.target.value);
						}}
						value={name}
					/>
					<button type="submit" className="btn btn-success">
						{isEditing ? 'Edit' : 'Submit'}
					</button>
				</div>
				{list.length > 0 && (
					<div style={{ marginTop: '2rem' }}>
						<List items={list} removeItems={removeItem} editItems={editItem} />
						<div className="text-center">
							<button className="btn btn-warning" onClick={clearList}>
								{' '}
								Clear Items{' '}
							</button>
						</div>
					</div>
				)}
			</form>
		</section>
	);
}
