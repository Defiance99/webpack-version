<script lang="ts">
import {
  defineComponent,
  defineAsyncComponent,
  ref,
  watch,
} from 'vue';
import { Project } from '@/interfaces/Project.interfcace';
import { CreateIssue, Issue } from '@/interfaces/Issue.interface';
import FormControl from '@/components/form/FormControl';
import FormControlActions from '@/components/form/FormControlActions';
import FormControlUsersSelect from '@/components/form/FormControlUsersSelect';
import IssueDetails from '@/components/issue-parts/IssueDetails';
import DialogTitle from '@/components/title/DialogTItle';
import IssueType from '@/components/issue-parts/IssueType';
import useProjectsStore from '@/composables/store/useProjectsStore';
import useIssuesStore from '@/composables/store/useIssuesStore';
import useUserStore from '@/composables/store/useUserStore';
import useFetchIssues from '@/composables/api/useFetchIssues';
import useLoaderUtils from '@/composables/utils/useLoaderUtils';
import useSetGetUtils from '@/composables/utils/useSetGetUtils';
import useProjectBoardStore from '@/composables/store/useProjectBoardStore';

const closeDialogEmitName = 'close:dialog' as string;
const createIssueEmitName = 'create' as string;
const changeAddIssueDialogEmitName = 'update:modelValue' as string;

export default defineComponent({
  name: 'AddIssueDialog',
  components: {
    FormControl,
    FormControlActions,
    FormControlUsersSelect,
    IssueDetails,
    DialogTitle,
    IssueType,
    WEditor: defineAsyncComponent(() => import('wysiwyg/WEditor')),
  },
  emits: [
    closeDialogEmitName,
    createIssueEmitName,
    changeAddIssueDialogEmitName,
  ],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { getProjects } = useProjectsStore();
    const { updateProjectBoardByKey } = useProjectBoardStore();
    const { getIssueTypes, setNewIssue } = useIssuesStore();
    const { getUser } = useUserStore();
    const { createIssue } = useFetchIssues();
    const { isLoad, startLoad, stopLoad } = useLoaderUtils();
    const { setter: setCurrentProject, getter: getCurrentProject } = useSetGetUtils<Project | undefined>(undefined, false);

    const createdIssue = ref<Issue | null>(null);
    const createdIssueDialogModel = ref(false);

    const initialForm: CreateIssue = {
      projectKey: getProjects.value?.[0].key,
      userId: getUser.value?.id,
      issueType: getIssueTypes.value[0],
      reporters: [],
      assignees: [],
      title: '',
      description: '',
    };

    const getInitialIssueForm = (): CreateIssue => {
      return JSON.parse(JSON.stringify(initialForm));
    };

    const createIssueForm = ref<CreateIssue>(getInitialIssueForm());

    const onProjectChange = (selectedProjectId: number[]): void => {
      if (getProjects.value === null) return;

      const firstProject = selectedProjectId[0];
      const selectedProjectIndex = getProjects.value.findIndex((project: Project) => project.id === firstProject);
      setCurrentProject(getProjects.value?.[selectedProjectIndex]);
      createIssueForm.value.projectKey = getCurrentProject.value?.key;
    };

    const onCreateIssue = async (form: CreateIssue): Promise<void> => {
      startLoad();

      if (form.projectKey && form.userId) {
        const createdIssueRes: Issue | null = await createIssue(form);

        if (createdIssueRes) {
          createdIssue.value = createdIssueRes;
          createIssueForm.value = getInitialIssueForm();
          setNewIssue(createdIssueRes);
          emit(changeAddIssueDialogEmitName, false);
          createdIssueDialogModel.value = true;
          stopLoad();

          updateProjectBoardByKey(form.projectKey);

          return;
        }
      }

      stopLoad();
    };

    watch(
      getProjects,
      (newProjects: Project[] | null): void => {
        if (newProjects) {
          setCurrentProject(newProjects[0]);
          createIssueForm.value.projectKey = getCurrentProject.value?.key;
        }
      },
      { immediate: true },
    );

    return {
      isLoad,
      getProjects,
      getCurrentProject,
      createdIssue,
      createIssueForm,
      onProjectChange,
      getIssueTypes,
      onCreateIssue,
      closeDialogEmitName,
      createdIssueDialogModel,
      changeAddIssueDialogEmitName,
    };
  },
});
</script>

<template>
  <JDialog
    :model-value="modelValue"
    @update:modelValue="$emit(changeAddIssueDialogEmitName, $event)"
  >
    <div v-if="getCurrentProject" class="add-issue-dialog">
      <div class="issue-dialog-header">
        <DialogTitle>
          Create issue
        </DialogTitle>
        <JDialogCloseIcon @click="$emit(changeAddIssueDialogEmitName, false)" />
      </div>

      <FormControl>
        <template #label>
          Project
        </template>
        <JSelect
          :model-value="[getCurrentProject.id]"
          :attach="false"
          :input="{ dense: true }"
          @update:modelValue="onProjectChange"
        >
          <div
            v-for="(project, index) in getProjects"
            :key="index"
            :value="project.id"
            class="select-item"
          >
            <span class="select-item-label">
              {{ project.name }}
            </span>
          </div>

          <template #result>
            <span class="ml-2">
              {{ getCurrentProject.name }}
            </span>
          </template>
        </JSelect>
      </FormControl>

      <FormControl>
        <template #label>
          Issue type
        </template>
        <JSelect
          :model-value="[createIssueForm.issueType]"
          :attach="false"
          :input="{ dense: true }"
          @update:modelValue="createIssueForm.issueType = $event[0]"
        >
          <div
            v-for="(issueType, index) in getIssueTypes"
            :key="index"
            :value="issueType"
            class="select-item"
          >
            <div class="select-item-label">
              <IssueType :type="issueType" :issue-value="issueType" />
            </div>
          </div>

          <template #result>
            <div class="ml-2">
              <IssueType
                :type="createIssueForm.issueType"
                :issue-value="createIssueForm.issueType"
              />
            </div>
          </template>
        </JSelect>
      </FormControl>

      <FormControl>
        <template #label>
          Reporter
        </template>
        <FormControlUsersSelect
          :project="getCurrentProject"
          :attach="false"
          :input="{ dense: true }"
          :selectedUsersIds="createIssueForm.reporters"
          @select="createIssueForm.reporters = $event"
        />
      </FormControl>

      <FormControl>
        <template #label>
          Assignees
        </template>
        <FormControlUsersSelect
          :project="getCurrentProject"
          :selectedUsersIds="createIssueForm.assignees"
          :attach="false"
          :input="{ dense: true }"
          @select="createIssueForm.assignees = $event"
        />
      </FormControl>

      <FormControl>
        <template #label>
          Title issue
        </template>
        <JTextField
          v-model="createIssueForm.title"
          dense
          name="summary"
          text-margin
          outlined
          :close-icon="false"
          class="issue-title-field"
        />
      </FormControl>

      <FormControl class="issue-editor">
        <template #label>
          Description
        </template>
        <WEditor v-model="createIssueForm.description" />
      </FormControl>

      <FormControlActions
        flex-end
        :is-load="isLoad"
        @click:cancel="$emit(changeAddIssueDialogEmitName, false)"
        @click:confirm="onCreateIssue(createIssueForm)"
      >
        <template #cancel>
          Cancel
        </template>
        <template #confirm>
          Create
        </template>
      </FormControlActions>
    </div>
  </JDialog>
  <JDialog v-model="createdIssueDialogModel">
    <IssueDetails
      v-if="createdIssue && getCurrentProject"
      :id="createdIssue.id"
      :project="getCurrentProject"
    />
  </JDialog>
</template>

<style lang="scss" scoped>
.issue-dialog-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.add-issue-dialog {
  width: 600px;
}

.issue-editor {
  margin-bottom: 28px;
}
</style>
