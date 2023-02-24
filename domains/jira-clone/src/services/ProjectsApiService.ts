import apiClient from '@/services/apiClient';
import { Project, ProjectBoard, UpdateProject } from '@/interfaces/Project.interfcace';
import ApiClient from '@/interfaces/ApiClient.interface';

const baseProjectsPath = '/projects';
const projectBoardPath = `${baseProjectsPath}/board`;

export default {
  async getProjectsById(projectIds: number[]): Promise<ApiClient<Project[]>> {
    return apiClient.get(baseProjectsPath, { params: { projectIds } });
  },

  async getProjectBoard(projectKey: string): Promise<ApiClient<ProjectBoard>> {
    return apiClient.get(projectBoardPath, { params: { projectKey } });
  },

  async updateProject(updaateProjectForm: UpdateProject): Promise<ApiClient<Project>> {
    return apiClient.patch(baseProjectsPath, updaateProjectForm);
  },

};
