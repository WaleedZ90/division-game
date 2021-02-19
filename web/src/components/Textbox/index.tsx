import { TextField } from '@material-ui/core';
import React from 'react';
import classNames from 'classnames';
import './styles.scss';

type Props = {
	className?: string;
	label?: string;
	id?: string;
	name: string;
	value?: any;
	disabled?: boolean;
	errorMessage?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	type?: 'text';
	showCurrency?: boolean;
	multiline?: boolean;
};

export const Textbox: React.FC<Props> = ({
	className,
	label,
	id,
	value,
	disabled = false,
	errorMessage,
	onChange,
	type = 'text',
	name,
	multiline = false,
}) => {
	return (
		<TextField
			id={id}
			label={label}
			name={name}
			type={type}
			value={value ?? ''}
			className={classNames('form-control', 'textbox', className)}
			error={errorMessage != null}
			disabled={disabled}
			onChange={onChange}
			autoComplete={'off'}
			multiline={multiline}
			helperText={errorMessage}
		/>
	);
};
