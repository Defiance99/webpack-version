import ShortInfoIssue from './index';

export default {
  title: 'TAsk',
  component: ShortInfoIssue,
};

const Template = (args) => ({
  components: { ShortInfoIssue },
  setup() {
    return { ...args };
  },
  template: '<ShortInfoIssue :task="task" />',
});

export const Bug = Template.bind({});
Bug.args = {
  task: {
    id: 1,
    project: 2,
    name: 'I am hard task',
    number: 5,
    type: 'bug',
  },
};

export const Story = Template.bind({});
Story.args = {
  task: {
    id: 1,
    project: 2,
    name: 'I am hard task',
    number: 5,
    type: 'story',
  },
};

export const Task = Template.bind({});
Task.args = {
  task: {
    id: 1,
    project: 2,
    name: 'I am hard task',
    number: 5,
    type: 'task',
  },
};
