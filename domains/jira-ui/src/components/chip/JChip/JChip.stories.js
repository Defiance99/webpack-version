import JChip from './JChip.vue';

export default {
  title: 'Chips/JChip',
  component: JChip,
  argTypes: {
    size: {
      options: ['s'],
      control: { type: 'radio' },
    },
    radius: {
      options: ['custom', 'm', 's', 'xs', 'xxs'],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => ({
  components: { JChip },
  setup() {
    return { args };
  },
  template: `
    <JChip v-bind="args">
      {{ args.text }}
    </JChip>
  `,
});

export const Chip = Template.bind({});
Chip.args = {
  text: 'I am chip slot!',
  size: 's',
  radius: 'xs',
};
