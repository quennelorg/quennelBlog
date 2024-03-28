import React from 'react';
import { ListItem, List, Checkbox, Typography, Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({ tasks, deleteTask, editTask, finishTask }) => {
	return (
		<List>
			{tasks.map((task) => {
				return (
					<>
						<ListItem
							divider={true}
							sx={{ width: '80%', margin: 'auto', display: 'flex', justifyContent: 'space-around', border: '1px solid light-gray' }}
						>
							<Checkbox onClick={() => finishTask(task.id)} checked={task.isOver} />
							<Typography sx={{ width: '70%' }} style={{ color: task.isOver ? 'green' : '' }} key={task.id}>
								{task.name}
							</Typography>
							<Button onClick={() => editTask(task.id)} variant="contained" sx={{ marginLeft: 4 }} endIcon={<ModeEditIcon />}>
								Edit
							</Button>
							<Button onClick={() => deleteTask(task.id)} color="secondary" variant="contained" sx={{ marginLeft: 4 }} endIcon={<DeleteIcon />}>
								delete
							</Button>
						</ListItem>
					</>
				);
			})}
		</List>
	);
};

export default TaskList;
