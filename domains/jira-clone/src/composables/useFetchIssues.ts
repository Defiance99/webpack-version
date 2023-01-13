import IssuesApiService from '@/services/IssuesApiService';
import ApiClient from '@/interfaces/ApiClient.interface';
import {
  CreateIssue,
  Issue,
  IssueSearchParams,
  UpdateIssue,
} from '@/interfaces/Issue.interface';

export default () => {
  const getIssues = async (params: IssueSearchParams): Promise<Issue[] | null> => {
    try {
      const issueRes: ApiClient<Issue[] | null> = await IssuesApiService.getIssues(params);

      if (issueRes.status === 200) {
        return issueRes.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  const getIssueById = async (id: number, projectKey: string): Promise<Issue | null> => {
    try {
      const issueRes: ApiClient<Issue> = await IssuesApiService.getIssueById(id, projectKey);

      if (issueRes.status === 200) {
        return issueRes.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  const updateIssue = async (payload: UpdateIssue): Promise<Issue | null> => {
    try {
      const updateStatusRes: ApiClient<Issue> = await IssuesApiService.patchIssue(payload);

      if (updateStatusRes.status === 204) {
        return updateStatusRes.data;
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

  return {
    getIssues,
    getIssueById,
    updateIssue,
    deleteIssueById,
    createIssue,
  };
};
