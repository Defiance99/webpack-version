import { User } from '@/interfaces/User.interface';
import { Issue } from '@/interfaces/Issue.interface';
import { PriorityTypes } from '@/types/PriorityTypes';
import { ProjectTypes } from '@/types/ProjectTypes';

interface ProjectColumn {
  id: number;
  name: string;
  issues: Issue[];
}

interface ProjectBoard {
  id: number;
  name: string;
  columns: ProjectColumn[];
}

interface BaseProject {
  id: number;
  name: string;
  category: ProjectTypes;
  description: string;
}

interface Project extends BaseProject {
  key: string;
  issues: number[];
  users: User[];
  statuses: string[];
  priorities: PriorityTypes[];
  totalIssues: number;
  totalCompleteIssues: number;
}

interface CreateProject extends BaseProject {}
interface UpdateProject extends BaseProject {}

export { Project, CreateProject, UpdateProject, ProjectBoard, ProjectColumn };
