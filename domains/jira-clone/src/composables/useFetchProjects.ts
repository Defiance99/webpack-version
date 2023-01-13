import { Project } from '@/interfaces/Project.interfcace';
import ApiClient from '@/interfaces/ApiClient.interface';
import useProjectsStore from '@/composables/store/useProjectsStore';
import ProjectsApiService from '@/services/ProjectsApiService';

export default () => {
  const { setProjects } = useProjectsStore();

  const initProjects = async (projectIds: number[]) => {
    try {
      const projectFetchRes: ApiClient<Project[]> = await ProjectsApiService.getProjectsById(projectIds);

      if (projectFetchRes.status === 200) {
        setProjects(projectFetchRes.data);
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  return {
    initProjects,
  };
};
