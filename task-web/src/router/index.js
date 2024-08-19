import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../components/TaskList.vue';
import AddTask from '../components/AddTask.vue';
import EditTask from '../components/EditTask.vue';

const routes = [
  { path: '/', component: TaskList },
  { path: '/task/add', component: AddTask },
  { path: '/task/edit/:id', component: EditTask, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
