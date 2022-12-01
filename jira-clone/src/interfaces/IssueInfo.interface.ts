import type { IssueTypes } from '@/types/IssueTypes';

interface IssueInfo {
  id: number;
  project: number;
  name: string;
  number: string;
  type: IssueTypes;
}

export default IssueInfo;
