import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Textbox } from './index';

describe('<Textbox />', () => {
	let shallow: any;

	beforeAll(() => {
		shallow = createShallow();
	});

	it('renders without crashing', () => {
		shallow(<Textbox name={'testBox'} value={'testBox'} />);
	});

	it('triggers onChange events', () => {
		const onTextChange = jest.fn();
		const textBox = shallow(<Textbox name={'testBox'} value={'testBox'} onChange={onTextChange} />);
		textBox.find('.textbox').simulate('change');
		expect(onTextChange).toBeCalled();
	});
});
