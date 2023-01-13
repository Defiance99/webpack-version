import ApiClient from '@/interfaces/ApiClient.interface';
import IssuesApiService from '@/services/IssuesApiService';
import { RecentIssues } from '@/modules/home/interfaces/RecentIssues';

export default () => {
  const fetchRecentIssues = async () => {
    try {
      const recentlyIssuesRes: ApiClient<RecentIssues> = await IssuesApiService.getRecentActualIssues();

      if (recentlyIssuesRes.status === 200) {
        return recentlyIssuesRes.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  return {
    fetchRecentIssues,
  };
};
