import apiClient from '@/composables/apiClient';
import ApiClient from '@/interfaces/ApiClient.interface';
import {
  Issue,
  UpdateIssue,
  CreateIssue,
  IssueSearchParams,
} from '@/interfaces/Issue.interface';
import { RecentIssues } from '@/modules/home/interfaces/RecentIssues';

const issueBasePath = '/issues';
const recentActualPath = `${issueBasePath}/recently`;
const detailsIssuePath = `${issueBasePath}'/details'`;
const createIssuePath = `${issueBasePath}/create`;

export default {
  async getIssues(params: IssueSearchParams): Promise<ApiClient<Issue[]>> {
    return apiClient.get(issueBasePath, { params });
  },

  async getRecentActualIssues(): Promise<ApiClient<RecentIssues>> {
    return apiClient.get(recentActualPath);
  },

  async getIssueById(id: number, projectKey: string): Promise<ApiClient<Issue>> {
    const params = {
      id,
      projectKey,
    };

    return apiClient.get(detailsIssuePath, { params });
  },

  async patchIssue(payload: UpdateIssue): Promise<ApiClient<Issue>> {
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
