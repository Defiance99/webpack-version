import { computed, shallowRef } from 'vue';
import { Project } from '@/interfaces/Project.interfcace';

const projectsData = shallowRef<Project[] | null>(null);

export default () => {
  const setProjects = (projects: Project[]): Project[] => {
    projectsData.value = projects;

    return projects;
  };

  const getProjects = computed(() => projectsData.value);

  const getProjectByKey = (projectKey: string): Project | undefined => {
    return getProjects.value?.find((project: Project): boolean => project.key === projectKey);
  };

  return {
    setProjects,
    getProjects,
    getProjectByKey,
  };
};
