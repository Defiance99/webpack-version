import apiClient from '@/services/apiClient';
import ApiClient from '@/interfaces/ApiClient.interface';
import {
  Issue,
  PreviewIssue,
  PatchIssuePayload,
  CreateIssue,
  IssueSearchParams,
} from '@/interfaces/Issue.interface';
import { TabsIssues } from '@/modules/home/interfaces/TabsIssues';

const issueBasePath = '/issues';
const issuesByProjectPath = `${issueBasePath}/project`;
const searchIssuePath = `${issueBasePath}/search`;
const recentActualPath = `${issueBasePath}/recently`;
const detailsIssuePath = `${issueBasePath}/details`;
const createIssuePath = `${issueBasePath}/create`;

export default {
  async fetchPreviewIssues(params: IssueSearchParams): Promise<ApiClient<PreviewIssue[]>> {
    return apiClient.get(searchIssuePath, { params });
  },

  async fetchRecentActualIssuesIds(): Promise<ApiClient<TabsIssues>> {
    return apiClient.get(recentActualPath);
  },

  async fetchIssueById(id: number, projectKey: string): Promise<ApiClient<Issue>> {
    const params = {
      id,
      projectKey,
    };

    return apiClient.get(detailsIssuePath, { params });
  },

  async fetchProjectIssues(id: number): Promise<ApiClient<Issue[]>> {
    return apiClient.get(issuesByProjectPath, { params: { projectId: id } });
  },

  async patchIssue(payload: PatchIssuePayload): Promise<ApiClient<Issue>> {
    return apiClient.patch(issueBasePath, payload);
  },

  async deleteIssueById(issueId: number): Promise<ApiClient<null>> {
    const params = {
      id: issueId,
    };
    return apiClient.delete(issueBasePath, { params });
  },

  async createIssue(issueForm: CreateIssue): Promise<ApiClient<Issue>> {
    return apiClient.post(createIssuePath, issueForm);
  },
};
