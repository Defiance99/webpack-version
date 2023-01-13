import JRadio from './JRadio.vue';

export default {
  title: 'Input/JRadio',
  component: JRadio,
};

const Template = (args) => ({
  components: { JRadio },
  setup() {
    return { args };
  },
  template: `
  <div style="max-width: max-content;">
    <JRadio />
  </div>
  `,
});

export const Radio = Template.bind({});
