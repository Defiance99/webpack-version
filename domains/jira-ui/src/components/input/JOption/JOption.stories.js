import JOption from './JOption.vue';

export default {
  title: 'Input/JOption',
  component: JOption,
  argTypes: {
    type: {
      options: ['checkbox', 'radio'],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => ({
  components: { JOption },
  setup() {
    return { args };
  },
  template: `
  <div style="display: flex; align-items: center; border: 1px black solid; width: max-content; padding: 0 15px;">
    <JOption v-bind="args">
      <h1>{{ args.text }}</h1>
    </JOption>
  </div>
  `,
});

export const Option = Template.bind({});
Option.args = {
  type: 'checkbox',
  active: false,
  text: 'i am slot',
};
