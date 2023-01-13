import { Issue } from '@/interfaces/Issue.interface';
import { ref } from 'vue';
import useDebounce from 'UI/utils/useDebounce';
import useFetchIssues from '@/composables/useFetchIssues';
import useSetGetUtils from '@/composables/useSetGetUtils';
import useLoaderUtils from '@/composables/useLoaderUtils';

export default () => {
  const { setter: setSearchValue, getter: getSearchValue } = useSetGetUtils<string>('', false);
  const { isLoad, startLoad, stopLoad } = useLoaderUtils();
  // TODO: add optimizing: remove ref and add shallowRef, add new global issue store structure
  const searchResultList = ref<Issue[]>([]);
  const { getIssues } = useFetchIssues();

  const onValueChange = async (value: string): Promise<void> => {
    setSearchValue(value);
    if (value === '') {
      return;
    }
    startLoad();

    const issuesList: Issue[] | null = await getIssues({
      name: value,
    });

    if (issuesList) {
      searchResultList.value = issuesList;
    }

    stopLoad();
  };

  const onResetValue = (): void => {
    setSearchValue('');
  };

  return {
    isLoadingSearchResult: isLoad,
    getSearchValue,
    searchResultList,
    onValueChange: useDebounce(onValueChange, 500),
    onResetValue,
  };
};
