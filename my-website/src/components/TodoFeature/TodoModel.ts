export interface Task {
	id: string;
	name: string;
	type: TaskType;
}

export interface Alert {
	showAlert: boolean;
	type: AlertType;
}

export enum TaskType {
	normal = 0,
	important = 1,
	warning = 2,
}

export enum AlertType {
	default = '',
	createSuccess = '任务已记录，要做完哦！',
	updateSuccess = '任务已修改，别想通过修改任务来完成！',
	finishSuccess = '任务已完成🎉',
	deleteSuccess = '任务已删除',
	error = '你在加白日梦吗？',
}
