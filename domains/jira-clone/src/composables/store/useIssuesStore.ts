import { shallowRef } from 'vue';
import { Issue } from '@/interfaces/Issue.interface';
import { IssueTypes } from '@/types/IssueTypes';

const issuesData = shallowRef<Issue[]>([]);
// TODO: add to dynamic
const issueTypesData = shallowRef<IssueTypes[]>(['task', 'bug', 'story']);

export default () => {
  const setIssues = (issues: Issue[]): Issue[] => {
    issuesData.value = issues;

    return issues;
  };

  const setNewIssue = (newIssue: Issue): Issue => {
    const oldIssue = issuesData.value?.find((issue) => issue.id === newIssue.id);

    if (oldIssue) {
      return Object.assign(oldIssue, newIssue);
    }

    issuesData.value.push(newIssue);

    return newIssue;
  };

  const mergeIssues = (mergingIssues: Issue[]): Issue[] => {
    mergingIssues.forEach((mergingIssue: Issue): void => {
      setNewIssue(mergingIssue);
    });

    return issuesData.value;
  };

  const getIssueById = (issueKey: string): Issue | undefined => {
    return issuesData.value.find((issue) => issue.key === issueKey);
  };

  const deleteIssue = (issueId: number): void => {
    const removingIssue = issuesData.value.find((issue: Issue) => issue.id === issueId);

    if (removingIssue) {
      setNewIssue({ ...removingIssue, deleted: true });
    }
  };

  return {
    setIssues,
    mergeIssues,
    getIssues: issuesData,
    setNewIssue,
    getIssueById,
    deleteIssue,
    getIssueTypes: issueTypesData,
  };
};
