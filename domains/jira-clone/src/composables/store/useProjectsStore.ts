import { shallowRef, triggerRef } from 'vue';
import { Project } from '@/interfaces/Project.interfcace';

const projectsData = shallowRef<Project[] | null>(null);
const currentProjectPage = shallowRef<Project | null>(null);

export default () => {
  const setProjects = (projects: Project[]): Project[] => {
    projectsData.value = projects;

    return projects;
  };

  const setCurrentProjectPage = (currentProject: Project | null): void => {
    currentProjectPage.value = currentProject;
    triggerRef(currentProjectPage);
  };

  const getProjectById = (projectId: number): Project | undefined => {
    return projectsData.value?.find((project: Project): boolean => project.id === projectId);
  };

  const getProjectByKey = (projectKey: string): Project | undefined => {
    return projectsData.value?.find((project: Project): boolean => project.key === projectKey);
  };

  const setNewProject = (newProject: Project) => {
    const oldProject = projectsData.value?.find((project: Project) => project.id === newProject.id);

    if (oldProject) {
      const assignedProject = Object.assign(oldProject, newProject);
      triggerRef(projectsData);

      return assignedProject;
    }

    projectsData.value?.push(newProject);
    triggerRef(projectsData);

    return newProject;
  };

  return {
    setNewProject,
    setCurrentProjectPage,
    setProjects,
    getProjects: projectsData,
    getCurrentProjectPage: currentProjectPage,
    getProjectById,
    getProjectByKey,
  };
};
