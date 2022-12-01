import JTooltip from './JTooltip.vue';

export default {
  title: 'UI/Tooltip',
  component: JTooltip,
  argTypes: {
    position: {
      options: ['bottom'],
      control: { type: 'radio' },
      defaultValue: 'bottom',
    },
  },
};

const Template = (args: any) => ({
  components: { JTooltip },
  setup() {
    return { args };
  },
  template: `
    <JTooltip v-bind="args">
      Helloy world!
    </JTooltip>
  `,
});

export const jTooltip: any = Template.bind({});
jTooltip.args = {
  openOnHover: true,
};
