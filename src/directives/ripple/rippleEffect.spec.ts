import { mount } from '@vue/test-utils';
import { Ripple } from '@/directives/ripple/rippleEffect.directive';

const Component = {
  template: '<button v-ripple></button>',
};

const payload = {
  global: {
    directives: {
      Ripple,
    },
  },
};

describe('Ripple effect with single click', () => {
  jest.useFakeTimers();

  it('should create ripple span elements', () => {
    const wrapper = mount(Component, payload);

    wrapper.get('button').trigger('mousedown');
    const rippleContainer = wrapper.get('span.ui-ripple-container');

    expect(rippleContainer.find('span.ui-ripple-effect').exists()).toBe(true);
  });

  it('should add data-is-animated attr on ripple container', () => {
    const wrapper = mount(Component, payload);

    wrapper.get('button').trigger('mousedown');

    jest.runAllTimers();

    expect(wrapper.get('span.ui-ripple-container').attributes('data-is-animated')).toBe('1');
  });

  it('should add data-is-mouse-upped attr on ripple container', () => {
    const wrapper = mount(Component, payload);

    wrapper.get('button').trigger('mousedown');
    wrapper.get('button').trigger('mouseup');

    expect(wrapper.get('span.ui-ripple-container').attributes('data-is-mouse-upped')).toBe('1');
  });

  it('should remove ripple effect when mouse upped and animation time is over', () => {
    const wrapper = mount(Component, payload);

    wrapper.get('button').trigger('mousedown');

    jest.runAllTimers();

    expect(wrapper.get('span.ui-ripple-container').attributes('data-is-animated')).toBe('1');

    wrapper.get('button').trigger('mouseup');

    expect(wrapper.find('span.ui-ripple-container').exists()).toBe(false);
  });

  it('should remove ripple effect when mouse leave and animation time is over', () => {
    const wrapper = mount(Component, payload);

    wrapper.get('button').trigger('mousedown');

    jest.runAllTimers();

    expect(wrapper.get('span.ui-ripple-container').attributes('data-is-animated')).toBe('1');

    wrapper.trigger('mouseleave');

    expect(wrapper.find('span.ui-ripple-container').exists()).toBe(false);
  });
});

describe('Ripple effects with multiple clicks', () => {
  jest.useFakeTimers();

  const wrapper = mount(Component, payload);
  const clickCount = 5;

  it('should create multiple ripple elements', () => {
    for (let index = 0; index < clickCount; index += 1) {
      wrapper.get('button').trigger('mousedown');
      wrapper.get('button').trigger('mouseup');
    }

    expect(wrapper.findAll('span.ui-ripple-container').length).toBe(clickCount);
    expect(wrapper.findAll('span.ui-ripple-effect').length).toBe(clickCount);
  });

  it('should remove ripple elements on multiple click', () => {
    const rippleContainers = wrapper.findAll('span.ui-ripple-container');

    rippleContainers.forEach((rippleContainer) => {
      expect(rippleContainer.attributes('data-is-mouse-upped')).toBe('1');
    });

    jest.runAllTimers();

    expect(wrapper.findAll('span.ui-ripple-container').length).toBe(0);
    expect(wrapper.findAll('span.ui-ripple-effect').length).toBe(0);
  });
});
