import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import JobList from '../views/JobList.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/jobs', component: JobList },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
