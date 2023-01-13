import { Issue } from '@/interfaces/Issue.interface';

interface RecentIssues {
  recentInProgress: Issue[];
  toDo: Issue[];
  viewed: Issue[];
}

export { RecentIssues }