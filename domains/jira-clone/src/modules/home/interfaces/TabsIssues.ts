import { PreviewIssue } from '@/interfaces/Issue.interface';

interface TabsIssues {
  workedon: PreviewIssue[];
  toDo: PreviewIssue[];
  viewed: PreviewIssue[];
}

export { TabsIssues }