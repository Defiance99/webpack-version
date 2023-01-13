import { Issue } from '@/interfaces/Issue.interface';
import ApiClient from '@/interfaces/ApiClient.interface';
import useIssuesStore from '@/composables/store/useIssuesStore';
import CommentsApiService from '@/services/CommentsApiService';

export default () => {
  const { setNewIssue } = useIssuesStore();

  const createComment = async (issueId: number, commentHtml: string): Promise<Issue | null> => {
    try {
      const commentFetchRes: ApiClient<Issue> = await CommentsApiService.createComment(issueId, commentHtml);

      if (commentFetchRes.status === 201) {
        setNewIssue(commentFetchRes.data);
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
