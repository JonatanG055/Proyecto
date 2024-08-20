<template>
  <v-container>
    <v-list>
      <v-list-item-group v-if="tasks.length">
        <v-list-item v-for="task in tasks" :key="task._id">
          <v-list-item-content>
            <v-list-item-title>{{ task.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
            <v-btn color="primary" @click="editTask(task._id)">Edit</v-btn>
            <v-btn color="red" @click="deleteTask(task._id)">Delete</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item-group v-else>
        <v-list-item>No tasks available</v-list-item>
      </v-list-item-group>
      <v-btn color="primary" @click="createTask">Add Task</v-btn>
    </v-list>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const tasks = ref([]);
    const router = useRouter();

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        tasks.value = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const deleteTask = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        fetchTasks(); // Recargar tareas después de eliminar
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };

    const editTask = (id) => {
      router.push(`/task/edit/${id}`); // Redirige a la página de edición
    };

    const createTask = () => {
      router.push('/task/add'); // Redirige a la página de creación
    };

    onMounted(() => {
      fetchTasks();
    });

    return { tasks, deleteTask, editTask, createTask };
  }
}
</script>

<style scoped>
/* Estilos opcionales para la lista de tareas */
</style>
