import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import './styles.scss';
import { Button } from 'components';

export const ErrorView: React.FC = () => {
	return (
		<section className="error-view">
			<ErrorOutlineIcon />
			<h1>Something went wrong!</h1>
			<p>Please refresh the page</p>
			<Button onClick={() => window.location.reload()}>Refresh Page</Button>
		</section>
	);
};
