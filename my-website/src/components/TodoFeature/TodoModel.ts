export interface Task {
	id: string;
	name: string;
	type: TaskType;
	isOver: boolean;
}

export interface Alert {
	showAlert: boolean;
	type?: AlertType;
}

export enum OperationContent {
	create = 0,
	update = 1,
	delete = 2,
	finish = 3,
	removeAll = 4,
}

export enum TaskType {
	normal = '普通',
	important = '重要',
	warning = '第一个完成这个',
}
export const TaskPriorityColorMapping: Record<TaskType, TaskPriorityColor> = {
	[TaskType.normal]: { textColor: 'info.main', disableColor: 'text.disabled', editButtonColor: 'warning', deleteButtonColor: 'error' },
	[TaskType.important]: { textColor: 'warning.main', disableColor: 'text.disabled', editButtonColor: 'primary', deleteButtonColor: 'primary' },
	[TaskType.warning]: { textColor: 'error.main', disableColor: 'text.disabled', editButtonColor: 'success', deleteButtonColor: 'success' },
};

export interface TaskPriorityColor {
	textColor: string;
	editButtonColor: string;
	deleteButtonColor: string;
	disableColor: string;
}

export enum AlertType {
	createSuccess = '任务已记录，要做完哦！',
	updateSuccess = '任务已修改，要快点做完哦！',
	finishSuccess = '任务已完成🎉',
	deleteSuccess = '任务已删除',
	clearSuccess = '恭喜你！你已经完成了所有的任务',
	emptyNameError = '你在做白日梦吗？',
	sameNameError = '你已经做这个任务的计划了，赶紧去完成吧',
}

export type AlertCategory = 'success' | 'error' | 'warning';

export const AlertCategoryMapping: Record<AlertType, AlertCategory> = {
	[AlertType.createSuccess]: 'success',
	[AlertType.updateSuccess]: 'success',
	[AlertType.finishSuccess]: 'success',
	[AlertType.deleteSuccess]: 'success',
	[AlertType.clearSuccess]: 'success',
	[AlertType.emptyNameError]: 'error',
	[AlertType.sameNameError]: 'warning',
};
