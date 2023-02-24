import { shallowRef, ref } from 'vue';
import { Issue, PreviewIssue, PatchIssuePayload } from '@/interfaces/Issue.interface';
import { IssueTypes } from '@/types/IssueTypes';

const issuesData = ref<(Issue | PreviewIssue)[]>([]);
// TODO: add to dynamic
const issueTypesData = shallowRef<IssueTypes[]>(['task', 'bug', 'story']);

export default () => {
  const setIssues = (issues: Issue[]): Issue[] => {
    issuesData.value = issues;

    return issues;
  };

  const updateIssue = (id: number, newProperties: PatchIssuePayload): Issue | PreviewIssue | null => {
    const updatableIssue = issuesData.value.find((issue: Issue | PreviewIssue) => issue.id === id);
    if (updatableIssue === undefined) return null;

    return Object.assign(updatableIssue, newProperties);
  };

  const setNewIssue = (newIssue: Issue | PreviewIssue): Issue | PreviewIssue => {
    const oldIssue = issuesData.value.find((issue: Issue | PreviewIssue) => issue.id === newIssue.id);

    if (oldIssue) {
      const assignedIssue = Object.assign(oldIssue, newIssue);

      return assignedIssue;
    }

    issuesData.value.push(newIssue);

    return newIssue;
  };

  const mergeIssues = (mergingIssues: (Issue | PreviewIssue)[]): (Issue | PreviewIssue)[] => {
    mergingIssues.forEach((mergingIssue: Issue | PreviewIssue): void => {
      setNewIssue(mergingIssue);
    });

    return mergingIssues;
  };

  const getIssueById = (issueKey: string): Issue | PreviewIssue | undefined => {
    return issuesData.value.find((issue: Issue | PreviewIssue) => issue.key === issueKey);
  };

  const deleteIssue = (issueId: number): void => {
    const removingIssue = issuesData.value.findIndex((issue: Issue | PreviewIssue) => issue.id === issueId);

    if (removingIssue !== undefined) {
      issuesData.value.splice(removingIssue, 1);
    }
  };

  const filterActualIssues = (issues: Issue[]): Issue[] => {
    return issues.filter((issue: Issue) => {
      return issuesData.value.some((issueInStore: Issue | PreviewIssue) => {
        return 'project' in issueInStore && issueInStore.id === issue.id && issueInStore.project === issue.project;
      });
    });
  };

  return {
    updateIssue,
    deleteIssue,
    mergeIssues,
    setIssues,
    setNewIssue,
    getIssues: issuesData,
    getIssueById,
    getIssueTypes: issueTypesData,
    filterActualIssues,
  };
};
