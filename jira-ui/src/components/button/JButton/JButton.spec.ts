import { mount } from '@vue/test-utils';
import { Ripple } from '@/directives/ripple/rippleEffect.directive';
import JButton from './index';

describe('JButton.vue', () => {
  const slotText = 'I am Slotius';
  const buttonType = 'primary';
  const buttonSize = 'size-m';

  const wrapper = mount(JButton, {
    global: {
      directives: {
        Ripple,
      },
    },
    slots: {
      default: slotText,
    },
    props: {
      type: buttonType,
      size: 'm',
    },
  });

  // test('click must be create ripple effect', () => {
  //   wrapper.find('button').trigger('click');
  //   // wrapper.find('span.ui-ripple-container');

  //   expect(wrapper.get('span.ui-ripple-container'));
  // });

  test('has a button', () => {
    expect(wrapper.get('button'));
  });

  test('it must be contain slot', () => {
    expect(wrapper.html()).toContain(slotText);
  });

  test('it must be contain class by property type', () => {
    expect(wrapper.classes(buttonType)).toBe(true);
  });

  test('it must be contain class by property size', () => {
    expect(wrapper.classes(buttonSize)).toBe(true);
  });
});
