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
    <v-btn color="primary" type="submit">
      Save
    </v-btn>
    <v-btn color="secondary" @click="goBack">
      Cancel
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  props: {
    initialTask: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        priority: 'Low',
        completed: false
      })
    }
  },
  setup(props) {
    const task = ref(props.initialTask);
    const router = useRouter();

    const submitForm = async () => {
      try {
        const id = router.currentRoute.value.params.id as string;
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
