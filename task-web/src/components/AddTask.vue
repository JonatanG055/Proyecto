<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="task.title"
        label="Title"
        required
      />
      <v-textarea
        v-model="task.description"
        label="Description"
        required
      />
      <v-select
        v-model="task.priority"
        :items="['Low', 'Medium', 'High']"
        label="Priority"
      />
      <v-btn color="primary" type="submit">
        Save
      </v-btn>
      <v-btn color="secondary" @click="goBack">
        Cancel
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  setup() {
    const task = ref({
      title: '',
      description: '',
      priority: 'Low',
      completed: false
    });
    const router = useRouter();

    const submitForm = async () => {
      try {
        await axios.post('http://localhost:3000/api/tasks', task.value);
        router.push('/'); // Redirect to task list after saving
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    const goBack = () => {
      router.push('/'); // Redirect to task list
    };

    return { task, submitForm, goBack };
  }
});
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
