import { IssueTypes } from '@/types/IssueTypes';
import { PriorityTypes } from '@/types/PriorityTypes';

interface IssueComment {
  id: number;
  userId: number;
  author: number;
  html: string;
  created: string;
  updated: string;
}

interface BaseIssue {
  project: string;
  name: string;
  status: string;
  reporters: number[];
  assignees: number[];
  description: string;
  priority: PriorityTypes;
  type: IssueTypes;
  deleted?: boolean;
}

interface Issue extends BaseIssue {
  id: number;
  key: string;
  created: string;
  updated: string;
  comments: IssueComment[];
}

interface UpdateIssue {
  id: number;
  name?: string;
  description?: string;
  status?: string;
  reporters?: number[];
  assignees?: number[];
  priority?: PriorityTypes;
}

interface CreateIssue {
  projectKey: string | undefined;
  userId: number | undefined;
  issueType: IssueTypes,
  reporters: number[],
  assignees: number[],
  title: string,
  description: string,
}

interface IssueSearchParams {
  name?: string;
  users?: number[];
}

export { Issue, IssueComment, CreateIssue, UpdateIssue, IssueSearchParams };
