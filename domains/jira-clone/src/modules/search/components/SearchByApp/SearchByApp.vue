<script lang="ts">
import { defineComponent } from 'vue';
import SearchResultNotFound from '@/modules/search/components/SearchResultNotFound';
import ShortInfoIssue from '@/components/task/ShortInfoIssue';
import useSearch from '@/composables/useSearch';

export default defineComponent({
  name: 'SearchByApp',
  components: {
    SearchResultNotFound,
    ShortInfoIssue,
  },
  props: {
    focus: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const {
      onResetValue,
      onValueChange,
      getSearchValue,
      searchResultList,
      isLoadingSearchResult,
    } = useSearch();

    return {
      getSearchValue,
      onValueChange,
      onResetValue,
      searchResultList,
      isLoadingSearchResult,
    };
  },
});
</script>

<template>
  <div class="search-by-app">
    <div class="mb-4">
      <JTextField
        :model-value="getSearchValue"
        :set-focus="focus"
        placeholder="Search"
        name="search"
        @update:modelValue="onValueChange"
        @update:resetValue="onResetValue"
      >
        <template #prepend>
          <JIcon
            icon="search"
            container-size
            icon-wrapper
            size="16px"
            b-radius="0px"
          />
        </template>
      </JTextField>
    </div>

    <div class="search-result-wrapper">
      <template v-if="isLoadingSearchResult === false && searchResultList.length">
        <ShortInfoIssue
          v-for="(issue, index) in searchResultList"
          :key="index"
          :preview-issue="issue"
        />
      </template>
      <SearchResultNotFound
        v-else-if="isLoadingSearchResult === false"
        class="mt-10"
      />
      <div
        v-else
        class="search-loading-wrapper"
      >
        <JSpinner
          width="40px"
          height="40px"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-by-app {
  display: flex;
  flex-direction: column;
  position: relative;
}

.search-result-wrapper {
  min-width: 450px;
}

.search-loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  height: 100px;
  color: var(--j-primary-color);
}
</style>
