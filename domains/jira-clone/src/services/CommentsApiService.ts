import apiClient from '@/composables/apiClient';
import ApiClient from '@/interfaces/ApiClient.interface';
import { Issue } from '@/interfaces/Issue.interface';

const baseCommentsPath = '/comments';

export default {
  async createComment(issueId: number, commentHtml: string): Promise<ApiClient<Issue>> {
    const payload = {
      id: issueId,
      comment: commentHtml,
    };
    return apiClient.post(baseCommentsPath, payload);
  },
};
