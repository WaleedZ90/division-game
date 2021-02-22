import { Button, Checkbox, Textbox } from 'components';
import { FormikValues, FormikHelpers, Formik, Form } from 'formik';
import { User } from 'models';
import React from 'react';
import { boolean, object, string } from 'yup';
import { v4 as uuidv4 } from 'uuid';
import './styles.scss';

type FormValues = {
	username: string;
	isSingleUser: boolean;
};

type Props = {
	onSubmit: (values: User) => void;
};

const INITIAL_VALUES: FormValues = {
	username: '',
	isSingleUser: false,
};

const VALIDATION_SCHEMA = object().shape({
	username: string().required('This field is required'),
	isSingleUser: boolean(),
});

export const UserForm: React.FC<Props> = ({ onSubmit }) => {
	const handleSubmit = (values: FormikValues, formikHelpers: FormikHelpers<FormValues>) => {
		const newUser: User = {
			id: uuidv4(),
			username: values.username,
			isSingleUser: values.isSingleUser,
		};
		onSubmit(newUser);
	};

	return (
		<Formik<FormValues> initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA} onSubmit={handleSubmit}>
			{({ values, errors, handleChange }) => (
				<Form className={`user-form`}>
					<Textbox
						label={'Username'}
						name="username"
						value={values.username}
						errorMessage={errors.username}
						onChange={handleChange}
					/>
					<Checkbox
						label="Playing alone"
						name="isSingleUser"
						value={values.isSingleUser}
						errorMessage={errors.isSingleUser}
						onChange={handleChange}
					/>
					<Button type="submit">Join game</Button>
				</Form>
			)}
		</Formik>
	);
};
