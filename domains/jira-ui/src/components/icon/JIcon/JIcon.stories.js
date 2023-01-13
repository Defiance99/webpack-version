import JIcon from './JIcon.vue';

export default {
  title: 'Icons/JIcon',
  component: JIcon,
  argTypes: {
    iconWrapper: {
      options: [false, true],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => ({
  components: { JIcon },
  data() {
    return {
      iconsList: [
        { name: 'downArrow' },
        { name: 'search' },
        { name: 'notification' },
        { name: 'bug' },
        { name: 'task' },
        { name: 'story' },
        { name: 'projectWallet' },
        { name: 'themeColor' },
        { name: 'close' },
        { name: 'searchResultNotFound' },
        { name: 'purpleLightTheme' },
        { name: 'purpleDarkTheme' },
        { name: 'radio' },
        { name: 'activeRadio' },
        { name: 'check' },
        { name: 'trash' },
        { name: 'expand' },
        { name: 'checkbox' },
        { name: 'activeCheckbox' },
        { name: 'board' },
        { name: 'settings' },
        { name: 'backlog' },
        { name: 'reports' },
        { name: 'page' },
        { name: 'codeTag' },
        { name: 'highest' },
        { name: 'high' },
        { name: 'medium' },
        { name: 'low' },
        { name: 'lowest' },
      ],
    };
  },
  setup() {
    return { args };
  },
  template: `
  <div style="grid-template-columns: repeat(6, auto); display: grid; gap: 50px; background: #F5F5F5; padding: 20px">
    <div v-for="icon in iconsList" :key="icon.name" style="{ dispaly: flex; }">
      <JIcon v-bind="args" :icon="icon.name" />
      <div>name: <span class="text-subtitle-3 ml-1">{{ icon.name }}</span></div>
    </div>
  </div>
  `,
});

export const Icon = Template.bind({});
Icon.args = {
  size: '24px',
  iconWrapper: true,
  containerSize: true,
};
