import JAvatar from './JAvatar.vue';

export default {
  title: 'Avatars/JAvatar',
  component: JAvatar,
  argTypes: {
    size: {
      options: ['xs', 's', 'full'],
      control: { type: 'radio' },
    },
    rounded: {
      options: ['full'],
      control: { type: 'radio' },
    },
    image: {
      options: [
        'https://res.cloudinary.com/doqir4zpe/image/upload/v1672093406/ironman_c3jrbc_ej99co.jpg',
        'https://res.cloudinary.com/doqir4zpe/image/upload/v1672093431/captain_e8s9nk_dkwygr.jpg',
      ],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => ({
  components: { JAvatar },
  setup() {
    return { args };
  },
  template: `
    <JAvatar v-bind="args">
      <img :src="args.image" />
    </JAvatar>
  `,
});

export const Avatar = Template.bind({});
Avatar.args = {
  size: 'xs',
  rounded: 'full',
image: 'https://res.cloudinary.com/doqir4zpe/image/upload/v1672093406/ironman_c3jrbc_ej99co.jpg',
};
