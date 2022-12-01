<script lang="ts">
import { defineComponent, ref } from 'vue';
import type IssueInfo from '@/interfaces/IssueInfo.interface';
import ShortInfoIssue from '@/components/task/ShortInfoIssue';
import SearchResultNotFound from '@/modules/search/components/SearchResultNotFound';

const issues: IssueInfo[] = [
  {
    id: 1,
    project: 1,
    name: 'Задача по устранению интеграции с банком',
    type: 'task',
    number: 'MP-104',
  },
  {
    id: 1,
    project: 1,
    name: 'Фоф дылвоа лдыоаылвфоаф',
    type: 'bug',
    number: 'MP-234',
  },
  {
    id: 1,
    project: 1,
    name: 'При регистрации пользователя - передавать язык выбранный на сайте',
    type: 'story',
    number: 'MP-22',
  },
  {
    id: 1,
    project: 1,
    name: 'Отправлять письмо восстановление пароля на нужном языке',
    type: 'task',
    number: 'MP-521',
  },
  {
    id: 1,
    project: 1,
    name: 'Logout (High)',
    type: 'task',
    number: 'MP-35',
  },
  {
    id: 1,
    project: 1,
    name: 'Задача по устранению интеграции с банком',
    type: 'task',
    number: 'MP-104',
  },
  {
    id: 1,
    project: 1,
    name: 'Фоф дылвоа лдыоаылвфоаф',
    type: 'bug',
    number: 'MP-234',
  },
  {
    id: 1,
    project: 1,
    name: 'Фоф дылвоа лдыоаылвфоаф',
    type: 'bug',
    number: 'MP-234',
  },
];

export default defineComponent({
  name: 'SearchByApp',
  components: {
    SearchResultNotFound,
    ShortInfoIssue,
  },
  setup() {
    const showSearchResult = ref<boolean>(false);
    const searchValue = ref('');

    const onFocusChange = (focusValue: boolean): void => {
      showSearchResult.value = focusValue;
    };

    return {
      showSearchResult,
      onFocusChange,
      issues,
      searchValue,
    };
  },
});
</script>

<template>
  <div
    class="search-by-app"
    :class="{ focused: showSearchResult }"
  >
    <div class="mb-4">
      <JTextField
        v-model="searchValue"
        placeholder="Search"
        name="search"
      >
        <template #prepend>
          <span class="search-icon-wrapper">
            <JIcon
              icon="search"
              container-size
            />
          </span>
        </template>
      </JTextField>
    </div>

    <p class="mb-4">
      Recent issues
    </p>

    <ShortInfoIssue
      v-for="(issue, index) in issues"
      :key="index"
      :issue="issue"
    />

    <SearchResultNotFound class="mt-10" />
  </div>
</template>

<style scoped lang="scss">
.search-by-app {
  display: flex;
  flex-direction: column;
  position: relative;
}

.search-icon-wrapper {
  width: 16px;
  height: 16px;
}
</style>
