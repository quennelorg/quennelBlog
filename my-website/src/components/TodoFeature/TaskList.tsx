import React from 'react';
import { Stack, ListItem, List, Checkbox, Typography, ListItemButton, ListItemIcon, IconButton, Paper } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskPriorityColorMapping } from '@site/src/components/TodoFeature/TodoModel';
import * as _ from 'lodash';
const TaskList = ({ tasks, deleteTask, editTask, finishTask }) => {
	return (
		<Paper elevation={6} square={false} sx={{ bgcolor: 'background.paper' }}>
			<List sx={{ p: 1, width: '100%' }}>
				{tasks.map((task) => {
					return (
						<TaskListItem
							task={task}
							taskPriorityColor={TaskPriorityColorMapping[task.type]}
							deleteTask={deleteTask}
							editTask={editTask}
							finishTask={finishTask}
						/>
					);
				})}
			</List>
		</Paper>
	);
};

const TaskListItem = ({ task, taskPriorityColor, deleteTask, editTask, finishTask }) => {
	return (
		<ListItem
			key={task.id}
			divider={true}
			sx={{ width: '100%', margin: 'auto', display: 'flex', justifyContent: 'space-around', border: '1px solid light-gray' }}
			secondaryAction={
				<Stack direction="row" spacing={2}>
					<IconButton edge="end" aria-label="edit" onClick={() => editTask(task.id)} disabled={task.isOver} color={taskPriorityColor.editButtonColor}>
						<ModeEditIcon />
					</IconButton>
					<IconButton
						edge="end"
						aria-label="delete"
						onClick={() => deleteTask(task.id)}
						disabled={task.isOver}
						color={taskPriorityColor.deleteButtonColor}
					>
						<DeleteIcon />
					</IconButton>
				</Stack>
			}
			disablePadding
		>
			<ListItemButton onClick={() => finishTask(task.id)} sx={{ bgcolor: _.get(taskPriorityColor, task.isOver ? 'disableColor' : 'textColor') }}>
				<ListItemIcon>
					<Checkbox
						onClick={() => finishTask(task.id)}
						edge="start"
						checked={task.isOver}
						tabIndex={-1}
						disableRipple
						inputProps={{ 'aria-labelledby': task.id }}
					/>
				</ListItemIcon>
				<Typography
					sx={{ width: '70%' }}
					style={{ color: task.isOver ? 'white' : 'text.secondary', textDecoration: task.isOver ? 'line-through' : '' }}
					key={task.id}
				>
					{task.name}
				</Typography>
			</ListItemButton>
		</ListItem>
	);
};
export default TaskList;
