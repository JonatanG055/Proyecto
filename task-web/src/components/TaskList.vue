<template>
  <v-container>
    <v-list>
      <v-list-item-group v-if="tasks.length">
        <v-list-item v-for="task in tasks" :key="task.id">
          <v-list-item-content>
            <v-list-item-title>{{ task.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
            <v-btn
              color="primary"
              @click="editTask(task.id)"
            >
              Edit
            </v-btn>
            <v-btn
              color="red"
              @click="deleteTask(task.id)"
            >
              Delete
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-btn
        color="primary"
        @click="createTask"
      >
        Add Task
      </v-btn>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

interface Task {
  id: string;
  title: string;
  description: string;
}

export default defineComponent({
  setup() {
    const tasks = ref<Task[]>([]);
    const router = useRouter();

    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        tasks.value = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const deleteTask = async (id: string) => {
      try {
        await axios.delete(`/api/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };

    const editTask = (id: string) => {
      router.push(`/task/edit/${id}`);
    };

    const createTask = () => {
      router.push('/task/add');
    };

    onMounted(() => {
      fetchTasks();
    });

    return { tasks, deleteTask, editTask, createTask };
  }
});
</script>

<style scoped>
/* Estilos opcionales para la lista de tareas */
</style>
