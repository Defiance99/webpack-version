import AppLogo from './index';

export default {
  title: 'Shared/Logo/App',
  component: AppLogo,
};

const Template = (args) => ({
  components: { AppLogo },
  setup() {
    return { args };
  },
  template: '<AppLogo v-bind="args" />',
});

export const Default = Template.bind({});
