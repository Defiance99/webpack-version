import { User } from '@/interfaces/User.interface';
import { PriorityTypes } from '@/types/PriorityTypes';
import { ProjectTypes } from '@/types/ProjectTypes';

interface BaseProject {
  name: string;
  category: ProjectTypes;
  description: string;
}

interface Project extends BaseProject {
  readonly id: number;
  readonly key: string;
  issues: number[];
  users: User[];
  statuses: string[];
  priorities: PriorityTypes[];
  totalIssues: number;
  totalCompleteIssues: number;
}

interface CreateProject extends BaseProject {}

export { Project, CreateProject };
