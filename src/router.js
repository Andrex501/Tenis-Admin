import { createRouter, createWebHistory } from 'vue-router';
import Formulario from './components/Formulario.vue'; // Asegúrate de que la ruta sea correcta
import Principal from './components/Principal.vue';
const routes = [
  {
    path: '/', // Página principal (puedes cambiar esto si es necesario)
    name: 'Formulario',
    component: Formulario, // Componente de inicio, si lo tienes
  },
  {
    path: '/Principal', // Ruta para la página del formulario
    name: 'principal',
    component: Principal,
  },
];

const router = createRouter({
  history: createWebHistory(), // Sin base_url si no usas un subdirectorio
  routes,
});

export default router;

