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
      <v-btn type="submit" color="primary" class="mr-2">
        Save
      </v-btn>
      <v-btn @click="goBack" color="secondary">
        Cancel
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const task = ref({
      title: '',
      description: '',
      priority: 'Low',
      completed: false
    });

    const fetchTask = async () => {
      const id = route.params.id as string;
      if (id) {
        try {
          const response = await axios.get(`http://localhost:3000/api/tasks/${id}`);
          task.value = response.data;
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      }
    };

    const submitForm = async () => {
      const id = route.params.id as string;
      try {
        if (id) {
          await axios.put(`http://localhost:3000/api/tasks/${id}`, task.value);
        } else {
          await axios.post('http://localhost:3000/api/tasks', task.value);
        }
        router.push('/'); // Redirect to task list after saving
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    const goBack = () => {
      router.push('/'); // Redirect to task list
    };

    onMounted(() => {
      fetchTask();
    });

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
