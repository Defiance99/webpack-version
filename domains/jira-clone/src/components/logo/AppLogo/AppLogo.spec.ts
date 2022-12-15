import { mount } from '@vue/test-utils';
import AppLogo from './index';

describe('AppLogo.vue', () => {
  test('renders correctly', () => {
    const wrapper = mount(AppLogo);

    expect(wrapper.element).toMatchSnapshot();
  });
});
