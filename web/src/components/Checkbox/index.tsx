import { FormControl, FormControlLabel, FormHelperText, Checkbox as MUICheckbox } from '@material-ui/core';
import React from 'react';
import classNames from 'classnames';
import './styles.scss';

type Props = {
	className?: string;
	label: string;
	id?: string;
	name: string;
	value: boolean;
	disabled?: boolean;
	errorMessage?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox: React.FC<Props> = ({ className, label, name, id, value, disabled = false, errorMessage, onChange }) => {
	return (
		<FormControl className={classNames('form-control', 'checkbox', className)} disabled={disabled}>
			<FormControlLabel
				control={
					<>
						<MUICheckbox name={name} onChange={onChange} checked={value} id={id} className="checkbox-control" />
						<FormHelperText className={'currency-textbox-error-message'}>{errorMessage}</FormHelperText>
					</>
				}
				label={label}
			/>
		</FormControl>
	);
};
