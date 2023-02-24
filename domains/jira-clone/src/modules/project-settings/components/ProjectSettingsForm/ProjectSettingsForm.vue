<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UpdateProject, Project } from '@/interfaces/Project.interfcace';
import FormControl from '@/components/form/FormControl';
import FormControlActions from '@/components/form/FormControlActions';
import useLoaderUtils from '@/composables/utils/useLoaderUtils';
import useFetchProjects from '@/composables/api/useFetchProjects';
import useProjectsStore from '@/composables/store/useProjectsStore';

export default defineComponent({
  name: 'ProjectSettingsForm',
  components: {
    FormControl,
    FormControlActions,
  },
  props: {
    project: {
      type: Object as PropType<Project>,
      default: () => ({
        name: '',
        category: 'Business',
        description: '',
      }),
    },
  },
  setup(props) {
    const router = useRouter();
    const { isLoad, startLoad, stopLoad } = useLoaderUtils();
    const { updateProject } = useFetchProjects();
    const { getCurrentProjectPage, setCurrentProjectPage, setNewProject } = useProjectsStore();

    const settingsForm = ref<UpdateProject>({
      id: getCurrentProjectPage.value?.id ?? 0,
      name: props.project.name,
      category: props.project.category,
      description: props.project.description,
    });

    const onSaveProjectForm = async (projectForm: UpdateProject): Promise<void> => {
      startLoad();
      const updatedProejct: Project | null = await updateProject(projectForm);

      if (updatedProejct && getCurrentProjectPage.value) {
        setCurrentProjectPage(updatedProejct);
        setNewProject(updatedProejct);
      }

      stopLoad();
    };

    const redirectToProjectBoard = () => {
      router.push({
        path: `/project/${getCurrentProjectPage.value?.key}/board`,
      });
    };

    return {
      isLoad,
      settingsForm,
      onSaveProjectForm,
      redirectToProjectBoard,
    };
  },
});
</script>

<template>
  <div class="project-settings-form">
    <FormControl>
      <template #label>
        Name
      </template>
      <JTextField
        v-model="settingsForm.name"
        dense
        outlined
        name="Project name"
        text-margin
        :close-icon="false"
      />
    </FormControl>

    <FormControl>
      <template #label>
        Category
      </template>
      <JSelect
        :model-value="[settingsForm.category]"
        :attach="false"
        :input="{ dense: true }"
        @update:modelValue="settingsForm.category = $event[0]"
      >
        <!-- TODO: remove project types hardcode -->
        <div
          v-for="(projectType, index) in ['Business', 'Software', 'Marketing']"
          :key="index"
          :value="projectType"
          class="select-item"
        >
          <span class="select-item-label">
            {{ projectType }}
          </span>
        </div>

        <template #result>
          <span class="ml-2">
            {{ settingsForm.category }}
          </span>
        </template>
      </JSelect>
    </FormControl>

    <FormControl last>
      <template #label>
        Description
      </template>
      <JTextField
        v-model="settingsForm.description"
        dense
        outlined
        text-margin
        name="Project description"
        :close-icon="false"
      />
    </FormControl>

    <FormControlActions
      :is-load="isLoad"
      @click:cancel="redirectToProjectBoard"
      @click:confirm="onSaveProjectForm(settingsForm)"
    >
      <template #cancel>
        Cancel
      </template>
      <template #confirm>
        Save
      </template>
    </FormControlActions>
  </div>
</template>

<style lang="scss" scoped>
.project-settings-form {
  max-width: 600px;
}

.issue-form-input {
  margin-bottom: 12px;

  &.issue-form-description {
    margin-bottom: 24px;
  }
}
</style>
