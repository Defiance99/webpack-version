import { computed, ref } from 'vue';
import useDebounce from 'UI/utils/useDebounce';
import { PreviewIssue, Issue } from '@/interfaces/Issue.interface';
import useFetchIssues from '@/composables/api/useFetchIssues';
import useSetGetUtils from '@/composables/utils/useSetGetUtils';
import useLoaderUtils from '@/composables/utils/useLoaderUtils';
import useIssueUtils from '@/composables/utils/useIssueUtils';
import useIssuesStore from '@/composables/store/useIssuesStore';

export default () => {
  const { setter: setSearchValue, getter: getSearchValue } = useSetGetUtils<string>('', false);
  const { transformIssuesToIdsArray } = useIssueUtils();
  const { isLoad, startLoad, stopLoad } = useLoaderUtils();
  const { mergeIssues, getIssues } = useIssuesStore();
  const { fetchPreviewIssues } = useFetchIssues();
  const searchIssuesIds = ref<number[]>([]);

  const onValueChange = async (value: string): Promise<void> => {
    setSearchValue(value);
    if (value === '') {
      return;
    }
    startLoad();

    const previewIssuesList: PreviewIssue[] | null = await fetchPreviewIssues({
      name: value,
    });

    if (previewIssuesList) {
      searchIssuesIds.value = transformIssuesToIdsArray(previewIssuesList);
      mergeIssues(previewIssuesList);
    }

    stopLoad();
  };

  const onResetValue = (): void => {
    setSearchValue('');
  };

  const searchResultList = computed(() => {
    const resultList: PreviewIssue[] = [];

    if (searchIssuesIds.value.length === 0) return resultList;

    getIssues.value.forEach((issue: Issue | PreviewIssue) => {
      if ('isPreview' in issue === false) return;
      if (searchIssuesIds.value.includes(issue.id)) resultList.push(issue as PreviewIssue);
    });

    return resultList;
  });

  return {
    isLoadingSearchResult: isLoad,
    getSearchValue,
    searchResultList,
    onValueChange: useDebounce(onValueChange, 500),
    onResetValue,
  };
};
