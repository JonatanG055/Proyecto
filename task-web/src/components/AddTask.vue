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
    <!-- Mostrar mensaje de error si hay uno -->
    <v-alert
      v-if="error"
      type="error"
      dismissible
    >
      {{ error }}
    </v-alert>
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
    const error = ref<string | null>(null);

    const submitForm = async () => {
      try {
        await axios.post('http://localhost:3000/tasks', task.value);
        router.push('/'); // Redirige a la lista de tareas después de guardar
      } catch (err) {
        console.error('Error submitting form:', err);
        error.value = 'Failed to save task. Please try again.';
      }
    };

    const goBack = () => {
      router.push('/'); // Redirige a la lista de tareas
    };

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

