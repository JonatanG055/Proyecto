<template>
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
    <v-btn type="submit">
      Save
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  props: {
    taskId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const task = ref({
      title: '',
      description: '',
      priority: 'Low',
      completed: false
    });

    const fetchTask = async () => {
      if (props.taskId) {
        try {
          const response = await axios.get(`http://localhost:3000/api/tasks/${props.taskId}`);
          task.value = response.data;
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      }
    };

    const submitForm = async () => {
      try {
        if (props.taskId) {
          await axios.put(`http://localhost:3000/api/tasks/${props.taskId}`, task.value);
        } else {
          await axios.post('http://localhost:3000/api/tasks', task.value);
        }
        // Emitir un evento para informar que la tarea se guardó
        task.value = {
          title: '',
          description: '',
          priority: 'Low',
          completed: false
        };
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    onMounted(() => {
      fetchTask();
    });

    return { task, submitForm };
  }
});
</script>

<style scoped>
/* Agrega aquí los estilos para TaskForm */
</style>
