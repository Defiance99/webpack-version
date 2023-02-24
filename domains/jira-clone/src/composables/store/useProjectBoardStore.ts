import { useRoute } from 'vue-router';
import { ProjectBoard } from '@/interfaces/Project.interfcace';
import useSetGetUtils from '@/composables/utils/useSetGetUtils';
import useLoaderUtils from '@/composables/utils/useLoaderUtils';
import useFetchProjects from '@/composables/api/useFetchProjects';

const { setter: setProjectBoard, getter: getProjectBoard } = useSetGetUtils<ProjectBoard | null>(null);
const { isLoad, startLoad, stopLoad } = useLoaderUtils();

export default () => {
  const route = useRoute();
  const { fetchProjectBoard } = useFetchProjects();

  const initProjectBoard = async (): Promise<void> => {
    startLoad();

    const projectBoard: ProjectBoard | null = await fetchProjectBoard(route.params.project as string);

    if (projectBoard) {
      setProjectBoard(projectBoard);
    }

    stopLoad();
  };

  const updateProjectBoardByKey = (projectKey: string): void => {
    if (route.params.project === projectKey) {
      initProjectBoard();
    }
  };

  return {
    isLoad,
    setProjectBoard,
    initProjectBoard,
    getProjectBoard,
    updateProjectBoardByKey,
  };
};
