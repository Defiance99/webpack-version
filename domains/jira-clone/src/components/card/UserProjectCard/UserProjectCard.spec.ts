import { mount } from '@vue/test-utils';
import { UserProject } from '@/interfaces/UserProject.interface';
import UserProjectCard from './index';

describe('UserProjectCard.vue', () => {
  test('renders correctly', () => {
    const userProject: UserProject = {
      id: 1,
      name: 'Test project',
      totalTasks: 16,
      shortInfo: 'Software product',
    };

    const projectCardWrapper = mount(UserProjectCard, {
      props: {
        project: userProject,
      },
    } as any);

    expect(projectCardWrapper.element).toMatchSnapshot();
  });
});
