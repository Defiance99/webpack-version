import JButton from './JButton.vue';

export default {
  title: 'Buttons/JButton',
  component: JButton,
  argTypes: {
    size: {
      options: ['custom', 'm', 's', 'xs', 'xxs'],
      control: { type: 'radio' },
    },
    type: {
      options: ['primary', 'normal', 'stroked'],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => ({
  components: { JButton },
  setup() {
    return { args };
  },
  template: '<JButton v-bind="args">{{ args.text }}</JButton>',
});

export const Button = Template.bind({});
Button.args = {
  text: 'I am Button',
  size: 'm',
  type: 'primary',
};
