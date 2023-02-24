import IssuesApiService from '@/services/IssuesApiService';
import ApiClient from '@/interfaces/ApiClient.interface';
import {
  CreateIssue,
  Issue,
  IssueSearchParams,
  PreviewIssue,
  PatchIssuePayload,
} from '@/interfaces/Issue.interface';
import { TabsIssues } from '@/modules/home/interfaces/TabsIssues';
import useIssuesStore from '@/composables/store/useIssuesStore';

export default () => {
  const { updateIssue: updateIssueInStore } = useIssuesStore();

  const fetchTabsIssues = async () => {
    try {
      const recentlyIssuesRes: ApiClient<TabsIssues> = await IssuesApiService.fetchRecentActualIssuesIds();

      if (recentlyIssuesRes.status === 200) {
        return recentlyIssuesRes.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  const fetchPreviewIssues = async (params: IssueSearchParams): Promise<PreviewIssue[] | null> => {
    try {
      const issueRes: ApiClient<PreviewIssue[] | null> = await IssuesApiService.fetchPreviewIssues(params);

      if (issueRes.status === 200) {
        return issueRes.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  const fetchIssueById = async (id: number, projectKey: string): Promise<Issue | null> => {
    try {
      const issueRes: ApiClient<Issue> = await IssuesApiService.fetchIssueById(id, projectKey);

      if (issueRes.status === 200) {
        return issueRes.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  const patchIssue = async (
    id: number | undefined,
    keyName: string,
    value: number[] | string,
  ): Promise<PatchIssuePayload | null> => {
    if (id === undefined) return null;

    try {
      const updatableStatusRes: ApiClient<PatchIssuePayload> = await IssuesApiService.patchIssue({
        id,
        [keyName]: Array.isArray(value) ? [...value] : value,
      });

      if (updatableStatusRes.status === 204) {
        updateIssueInStore(id, updatableStatusRes.data);
        return updatableStatusRes.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  const deleteIssueById = async (issueId: number): Promise<boolean> => {
    try {
      const issueRes: ApiClient<null> = await IssuesApiService.deleteIssueById(issueId);

      if (issueRes.status === 200) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  };

  const createIssue = async (issueDialogForm: CreateIssue): Promise<Issue | null> => {
    try {
      const issueRes: ApiClient<Issue> = await IssuesApiService.createIssue(issueDialogForm);

      if (issueRes.status === 201) {
        return issueRes.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  const fetchProjectIssues = async (projectId: number): Promise<Issue[] | null> => {
    try {
      const issueRes: ApiClient<Issue[]> = await IssuesApiService.fetchProjectIssues(projectId);

      if (issueRes.status === 200) {
        return issueRes.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  return {
    fetchPreviewIssues,
    fetchIssueById,
    fetchTabsIssues,
    fetchProjectIssues,
    patchIssue,
    deleteIssueById,
    createIssue,
  };
};
