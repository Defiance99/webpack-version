import { computed, Ref } from 'vue';
import { Issue, PreviewIssue } from '@/interfaces/Issue.interface';
import { Project } from '@/interfaces/Project.interfcace';
import { User } from '@/interfaces/User.interface';

export default (project?: Project, issue?: Issue | PreviewIssue, usersIds?: Ref<number[]>) => {
  const findUser = (users: User[], findingUserId: number): User => {
    return users.find((user) => user.id === findingUserId) as User;
  };

  const issueReporters = computed(() => {
    if (typeof issue === 'object' && 'reporters' in issue && project) {
      return issue.reporters.map((reporterId: number) => findUser(project?.users, reporterId));
    }

    return [];
  });

  const issueAssignees = computed(() => {
    if (typeof issue === 'object' && project) {
      return issue.assignees.map((assigneeId: number) => findUser(project?.users, assigneeId));
    }

    return [];
  });

  const getProjectUsers = computed(() => {
    if (typeof usersIds === 'object' && project) {
      return usersIds.value.map((userId: number) => findUser(project?.users, userId));
    }

    return [];
  });

  const transformIssuesToIdsArray = (issues: (Issue | PreviewIssue)[]): number[] => issues.map((currentIssue) => currentIssue.id);

  return {
    issueReporters,
    issueAssignees,
    getProjectUsers,
    transformIssuesToIdsArray,
  };
};
