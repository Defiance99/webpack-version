import { IssueComment } from '@/interfaces/Issue.interface';
import ApiClient from '@/interfaces/ApiClient.interface';
import CommentsApiService from '@/services/CommentsApiService';

export default () => {
  const createComment = async (issueId: number, commentHtml: string): Promise<IssueComment | null> => {
    try {
      const commentFetchRes: ApiClient<IssueComment> = await CommentsApiService.createComment(issueId, commentHtml);

      if (commentFetchRes.status === 201) {
        return commentFetchRes.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  return {
    createComment,
  };
};
