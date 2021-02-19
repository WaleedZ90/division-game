import React from 'react';
import MaterialButton from '@material-ui/core/Button';
import './styles.scss';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {
	onClick?: (e: any) => void;
	color?: 'default' | 'primary' | 'secondary';
	variant?: 'contained' | 'outlined' | 'text';
	size?: 'small' | 'medium' | 'large';
	disabled?: boolean;
	href?: string;
	startIcon?: any;
	endIcon?: any;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	id?: string;
	isLoading?: boolean;
};

export const Button: React.FC<Props> = ({
	onClick,
	color = 'primary',
	disabled = false,
	variant = 'contained',
	href,
	size = 'large',
	startIcon,
	endIcon,
	children,
	className,
	type = 'button',
	id,
	isLoading = false,
}) => {
	if (isLoading) {
		return (
			<MaterialButton
				disabled
				variant={variant}
				size={size}
				startIcon={<CircularProgress />}
				className={classNames('button', 'button--loading', className)}
				type={type}
				id={id}
			></MaterialButton>
		);
	}

	return (
		<MaterialButton
			color={color}
			onClick={onClick}
			disabled={disabled}
			variant={variant}
			href={href}
			size={size}
			startIcon={startIcon}
			endIcon={endIcon}
			className={classNames('button', className)}
			type={type}
			id={id}
		>
			{children}
		</MaterialButton>
	);
};
