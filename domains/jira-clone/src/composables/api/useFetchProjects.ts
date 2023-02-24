import { Project, ProjectBoard, UpdateProject } from '@/interfaces/Project.interfcace';
import ApiClient from '@/interfaces/ApiClient.interface';
import useProjectsStore from '@/composables/store/useProjectsStore';
import ProjectsApiService from '@/services/ProjectsApiService';

export default () => {
  const { setProjects } = useProjectsStore();

  const initProjects = async (projectIds: number[]): Promise<Project[] | null> => {
    try {
      const projectsFetchRes: ApiClient<Project[]> = await ProjectsApiService.getProjectsById(projectIds);

      if (projectsFetchRes.status === 200) {
        return setProjects(projectsFetchRes.data);
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  const fetchProjectBoard = async (projectKey: string): Promise<ProjectBoard | null> => {
    try {
      const projectBoardFetchRes: ApiClient<ProjectBoard> = await ProjectsApiService.getProjectBoard(projectKey);

      if (projectBoardFetchRes.status === 200) {
        return projectBoardFetchRes.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  const updateProject = async (projectForm: UpdateProject): Promise<Project | null> => {
    try {
      const projectUpdateFetchRes: ApiClient<Project> = await ProjectsApiService.updateProject(projectForm);

      if (projectUpdateFetchRes.status === 204) {
        return projectUpdateFetchRes.data;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  return {
    initProjects,
    updateProject,
    fetchProjectBoard,
  };
};
