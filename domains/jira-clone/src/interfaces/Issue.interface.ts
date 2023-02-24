import { IssueTypes } from '@/types/IssueTypes';
import { PriorityTypes } from '@/types/PriorityTypes';

interface IssueComment {
  id: number;
  userId: number;
  author: string;
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
}

interface PreviewIssue {
  id: number;
  name: string;
  assignees: number[];
  projectName: string;
  projectKey: string;
  isPreview: true;
  key: string;
  type: IssueTypes;
}

interface Issue extends BaseIssue {
  id: number;
  key: string;
  isDetails: true;
  created: string;
  updated: string;
  comments: IssueComment[];
}

interface PatchIssuePayload {
  id?: number;
  name?: string;
  description?: string;
  status?: string;
  reporters?: number[];
  assignees?: number[];
  priority?: PriorityTypes;
  updated?: string;
  comments?: IssueComment[];
}

interface CreateIssue {
  projectKey: string | undefined;
  userId: number | undefined;
  issueType: IssueTypes;
  reporters: number[];
  assignees: number[];
  title: string;
  description: string;
}

interface IssueSearchParams {
  name?: string;
  users?: number[];
}

export { Issue, IssueComment, CreateIssue, PatchIssuePayload, IssueSearchParams, PreviewIssue };
