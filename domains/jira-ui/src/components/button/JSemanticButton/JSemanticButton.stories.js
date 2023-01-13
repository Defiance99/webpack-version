import JSemanticButton from './JSemanticButton.vue';

export default {
  title: 'Buttons/JSemanticButton',
  component: JSemanticButton,
};

const Template = (args) => ({
  components: { JSemanticButton },
  setup() {
    return { args };
  },
  template: '<JSemanticButton v-bind="args">{{ args.text }}</JSemanticButton>',
});

export const Button = Template.bind({});
Button.args = {
  text: 'I am semantic button slot!',
};
