import { createShallow } from '@material-ui/core/test-utils';
import { Button } from './index';
import React from 'react';

describe('<Button />', () => {
	let shallow: any;

	beforeAll(() => {
		shallow = createShallow();
	});

	it('renders without crashing', () => {
		shallow(<Button>Test</Button>);
	});

	it('executes onClick event', () => {
		const onClick = jest.fn();
		const button = shallow(<Button onClick={onClick}>Test</Button>);
		button.find('.button').first().simulate('click');
		expect(onClick).toBeCalled();
	});

	it('disables button', () => {
		const wrapper = shallow(<Button disabled>Test</Button>);
		const button = wrapper.find('.button');
		expect(button.first().hasClass('Mui-disabled'));
	});
});
