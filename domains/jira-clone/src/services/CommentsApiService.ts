import apiClient from '@/services/apiClient';
import ApiClient from '@/interfaces/ApiClient.interface';
import { IssueComment } from '@/interfaces/Issue.interface';

const baseCommentsPath = '/comments';

export default {
  async createComment(issueId: number, commentHtml: string): Promise<ApiClient<IssueComment>> {
    const payload = {
      id: issueId,
      comment: commentHtml,
    };
    return apiClient.post(baseCommentsPath, payload);
  },
};
