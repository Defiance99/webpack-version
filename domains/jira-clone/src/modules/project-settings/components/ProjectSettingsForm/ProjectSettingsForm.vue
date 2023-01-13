<script lang="ts">
import { defineComponent } from 'vue';
import FormControl from '@/components/form/FormControl';
import FormControlActions from '@/components/form/FormControlActions';

export default defineComponent({
  name: 'ProjectSettingsForm',
  components: {
    FormControl,
    FormControlActions,
  },
});
</script>

<template>
  <div class="project-settings-form">
    <FormControl>
      <template #label>
        Short summary
      </template>
      <JTextField
        dense
        outlined
        name="summary"
        :close-icon="false"
      />
    </FormControl>

    <FormControl>
      <template #label>
        URL
      </template>
      <JTextField
        dense
        outlined
        name="url"
        :close-icon="false"
      />
    </FormControl>

    <FormControl>
      <template #label>
        Category
      </template>
      <JTextField
        dense
        outlined
        name="category"
        :close-icon="false"
      />
    </FormControl>

    <FormControl last>
      <template #label>
        Description
      </template>
      <JTextField
        dense
        outlined
        name="Description"
        :close-icon="false"
      />
    </FormControl>

    <FormControlActions>
      <template #cancel>
        Cancel
      </template>
      <template #create>
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
