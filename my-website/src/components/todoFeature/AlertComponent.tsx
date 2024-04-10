import React from 'react';
import { AlertCategoryMapping, AlertType } from '@site/src/components/todoFeature/TodoModel';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
const AlertComponent = ({ alertContent, removeAlert }) => {
	const type: AlertType = alertContent.type;
	return (
		<Snackbar open={alertContent.showAlert} autoHideDuration={1000} onClose={removeAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
			{type && (
				<Alert onClose={removeAlert} severity={AlertCategoryMapping[type]} variant="filled" sx={{ width: '100%' }}>
					{type.valueOf()}
				</Alert>
			)}
		</Snackbar>
	);
};

export default AlertComponent;
