import { mount } from 'enzyme';
import { Checkbox } from './index';
import React from 'react';

describe('<Checkbox />', () => {
	it('renders without crashing', () => {
		const wrapper = mount(<Checkbox value={true} label="Test" name="test" onChange={console.log} />);
	});

	it('changes values properly', () => {
		const wrapper = mount(<Checkbox value={true} label="Test" name="test" onChange={console.log} />);
		const checkBox = wrapper.find('.checkbox-control').first();
		expect(checkBox.props().checked).toBe(true);

		checkBox.simulate('change', { target: { checked: false } });

		wrapper.update();

		expect(checkBox.props().checked).toBe(true);
	});
});
