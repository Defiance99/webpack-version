import apiClient from '@/composables/apiClient';
import { Project } from '@/interfaces/Project.interfcace';
import ApiClient from '@/interfaces/ApiClient.interface';

const baseProjectsPath = '/projects';

export default {
  async getProjectsById(projectIds: number[]): Promise<ApiClient<Project[]>> {
    return apiClient.get(baseProjectsPath, { params: { projectIds } });
  },
};
