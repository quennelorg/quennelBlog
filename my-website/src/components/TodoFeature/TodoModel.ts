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

export enum TaskType {
	normal = 0,
	important = 1,
	warning = 2,
}

export enum AlertType {
	createSuccess = '任务已记录，要做完哦！',
	updateSuccess = '任务已修改，别想通过修改任务来完成！',
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
