import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Admonition from '@theme/Admonition';

const List = ({ tasks, removeTask, editTask }) => {
	return (
		<div className="container">
			{tasks.map((item) => {
				const { id, title, type } = item;
				return (
					<ul className="list-group list-group-flush" key={id}>
						<li className="list-group-item d-flex justify-content-between align-items-center">
							<Admonition type="tip" icon="💡" title="赶紧完成这个任务">
								{title}
								<div style={{ float: 'right' }}>
									<button type="button" className="edit-btn" onClick={() => editTask(id)}>
										<FaEdit />
									</button>
									<button type="button" className="delete-btn" onClick={() => removeTask(id)}>
										<FaTrash />
									</button>
								</div>
							</Admonition>
						</li>
					</ul>
				);
			})}
		</div>
	);
};

export default List;
