<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="task.title" label="Title" required />
      <v-textarea v-model="task.description" label="Description" required />
      <v-select v-model="task.priority" :items="['Low', 'Medium', 'High']" label="Priority" />
      <v-btn color="primary" type="submit">Save</v-btn>
      <v-btn color="secondary" @click="goBack">Cancel</v-btn>
    </v-form>
    <v-alert v-if="error" type="error" dismissible>{{ error }}</v-alert>
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
    const error = ref<string | null>(null);

    const fetchTask = async () => {
      const id = route.params.id as string;
      if (id) {
        try {
          const response = await axios.get(`http://localhost:3000/tasks/${id}`);
          task.value = response.data;
        } catch (err) {
          console.error('Error fetching task:', err);
          error.value = 'Failed to fetch task. Please try again.';
        }
      }
    };

    const submitForm = async () => {
      const id = route.params.id as string;
      try {
        if (id) {
          await axios.put(`http://localhost:3000/tasks/${id}`, task.value);
        } else {
          await axios.post('http://localhost:3000/tasks', task.value);
        }
        router.push('/'); // Redirige a la lista de tareas después de guardar
      } catch (err) {
        console.error('Error submitting form:', err);
        error.value = 'Failed to save task. Please try again.';
      }
    };

    const goBack = () => {
      router.push('/'); // Redirige a la lista de tareas
    };

    onMounted(() => {
      if (route.params.id) {
        fetchTask(); // Carga la tarea si hay un ID en la ruta
      }
    });

    return { task, submitForm, goBack, error };
  }
});
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
